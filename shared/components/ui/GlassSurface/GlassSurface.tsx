"use client";

import { type CSSProperties, type ReactNode, useId } from "react";
import styles from "./GlassSurface.module.css";

type GlassSurfaceProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Опционально: инлайн-оверрайд только CSS-переменных (не стилевых свойств) */
  style?: CSSProperties & {
    ["--gs-radius"]?: string;
    ["--gs-padding"]?: string;
    ["--gs-blur"]?: string;
    ["--gs-tint"]?: string;
    ["--gs-shadow"]?: string;
    ["--gs-shine"]?: "0" | "1";
  };
};

export const GlassSurface = ({
  children,
  className,
  contentClassName,
  style,
}: GlassSurfaceProps) => {
  const filterId = useId().replace(/:/g, "-");

  return (
    <div
      className={`${styles.glass} ${className ?? ""}`}
      style={{ ...(style ?? {}), ["--gs-filter" as any]: `url(#${filterId})` }}
      data-shine="1"
    >
      <div className={styles.effect} />
      <div className={styles.tint} />
      <div className={styles.shine} />
      <div className={`${styles.content} ${contentClassName ?? ""}`}>
        {children}
      </div>

      {/* Локальный SVG-фильтр с уникальным id */}
      <svg aria-hidden="true" focusable="false" className={styles.hiddenSvg}>
        <filter
          id={filterId}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
};
