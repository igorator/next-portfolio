"use client";

import { useEffect, useRef, useState } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

import { useTheme } from "../../widgets/ThemeSwitcher/hooks/useTheme";
import styles from "./ThemedMotionBackground.module.css";

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;
uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;

varying vec2 vUv;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);
  float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp(
    (iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance),
    0.5, 1.0
  );
  float baseStrength = clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3  + 0.2  * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0
  );
  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,  1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`;

export function ThemedMotionBackground() {
  const { isDark } = useTheme();
  const raysColor = isDark ? "#ffffff" : "#1d1d1f";

  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<string, { value: unknown }> | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    cleanupRef.current?.();
    cleanupRef.current = null;

    const container = containerRef.current;

    const init = async () => {
      if (!containerRef.current) return;
      await new Promise((resolve) => setTimeout(resolve, 10));
      if (!containerRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
      });
      rendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";

      while (container.firstChild) container.removeChild(container.firstChild);
      container.appendChild(gl.canvas);

      const uniforms: Record<string, { value: unknown }> = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: 1 },
        lightSpread: { value: 1 },
        rayLength: { value: 2 },
        fadeDistance: { value: 1.0 },
        saturation: { value: 1.0 },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: 0.1 },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms,
      });
      const mesh = new Mesh(gl, { geometry, program });

      const updatePlacement = () => {
        if (!containerRef.current || !rendererRef.current) return;
        const { clientWidth: w, clientHeight: h } = containerRef.current;
        renderer.setSize(w, h);
        const dpr = renderer.dpr;
        uniforms.iResolution.value = [w * dpr, h * dpr];
        uniforms.rayPos.value = [0.5 * w * dpr, -0.2 * h * dpr];
        uniforms.rayDir.value = [0, 1];
      };

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current) return;
        uniforms.iTime.value = t * 0.001;
        const s = 0.92;
        smoothMouseRef.current.x =
          smoothMouseRef.current.x * s + mouseRef.current.x * (1 - s);
        smoothMouseRef.current.y =
          smoothMouseRef.current.y * s + mouseRef.current.y * (1 - s);
        uniforms.mousePos.value = [
          smoothMouseRef.current.x,
          smoothMouseRef.current.y,
        ];
        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch {
          /* context lost */
        }
      };

      window.addEventListener("resize", updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupRef.current = () => {
        if (animationIdRef.current)
          cancelAnimationFrame(animationIdRef.current);
        window.removeEventListener("resize", updatePlacement);
        try {
          const canvas = gl.canvas;
          gl.getExtension("WEBGL_lose_context")?.loseContext();
          canvas.parentNode?.removeChild(canvas);
        } catch {
          /* ignore */
        }
        rendererRef.current = null;
        uniformsRef.current = null;
      };
    };

    init();

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!uniformsRef.current) return;
    uniformsRef.current.raysColor.value = hexToRgb(raysColor);
  }, [raysColor]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}
