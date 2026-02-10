import { cache } from "react";

const OWNER = "igorator";
const REPO = "portfolio-assets";
const DEFAULT_REF = "main";
const CDN_ROOT = `https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}`;
const GITHUB_COMMITS_API = `https://api.github.com/repos/${OWNER}/${REPO}/commits/${DEFAULT_REF}`;

const IMAGE_EXTS = new Set(["webp", "png", "jpg", "jpeg"]);

type JsDelivrNode = {
  name: string;
  type: "file" | "directory";
  files?: JsDelivrNode[];
};

type JsDelivrTree = JsDelivrNode & { version?: string; hash?: string };

async function fetchTree(ref: string): Promise<JsDelivrTree> {
  const dataUrl = `https://data.jsdelivr.com/v1/package/gh/${OWNER}/${REPO}@${ref}`;
  const res = await fetch(dataUrl, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Failed to load jsDelivr package tree");
  return res.json();
}

async function resolveRef(): Promise<string> {
  const headers: Record<string, string> = {};
  const token =
    process.env.GITHUB_TOKEN ??
    process.env.GH_TOKEN ??
    process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(GITHUB_COMMITS_API, {
      headers,
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to resolve ref");
    const data = await res.json();
    return typeof data?.sha === "string" ? data.sha : DEFAULT_REF;
  } catch {
    return DEFAULT_REF;
  }
}

function findDir(root: JsDelivrNode, path: string[]): JsDelivrNode | null {
  let node: JsDelivrNode | undefined = root;
  for (const seg of path) {
    node = node?.files?.find((n) => n.type === "directory" && n.name === seg);
    if (!node) return null;
  }
  return node ?? null;
}

function hasImageExt(name: string): boolean {
  const dot = name.lastIndexOf(".");
  if (dot === -1) return false;
  return IMAGE_EXTS.has(name.slice(dot + 1).toLowerCase());
}

async function fetchProjectImages(slug: string) {
  const ref = await resolveRef();
  const tree = await fetchTree(ref);
  const cdn = (file: string) => `${CDN_ROOT}@${ref}/Projects/${slug}/${file}`;

  const dir = findDir(tree, ["Projects", slug]);
  if (!dir || !dir.files)
    return { cover: null as string | null, screens: [] as string[] };

  const files = dir.files.filter((f) => f.type === "file");

  const coverFile =
    files.find(
      (f) => f.name.toLowerCase().startsWith("cover.") && hasImageExt(f.name),
    ) ?? null;
  const cover = coverFile ? cdn(coverFile.name) : null;

  const screenFiles = files
    .filter((f) => /^screen-\d+\./i.test(f.name) && hasImageExt(f.name))
    .sort((a, b) => {
      const na = parseInt(a.name.match(/\d+/)?.[0] ?? "0", 10);
      const nb = parseInt(b.name.match(/\d+/)?.[0] ?? "0", 10);
      return na - nb;
    });

  const screens = screenFiles.map((f) => cdn(f.name));

  return { cover, screens };
}

export const listProjectImages = cache(fetchProjectImages);
