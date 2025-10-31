// shared/lib/assets.ts
const OWNER = "igorator";
const REPO = "protfolio-assets";
const REF = "main";
const CDN = `https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}@${REF}`;
const DATA = `https://data.jsdelivr.com/v1/package/gh/${OWNER}/${REPO}@${REF}`;

const exts = new Set(["webp", "png", "jpg", "jpeg"]);

type JsDelivrNode = {
  name: string;
  type: "file" | "directory";
  files?: JsDelivrNode[];
};

async function fetchTree(): Promise<JsDelivrNode> {
  const res = await fetch(DATA, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to load jsDelivr package tree");
  return res.json();
}

function findDir(root: JsDelivrNode, path: string[]): JsDelivrNode | null {
  let node: JsDelivrNode | undefined = root;
  for (const seg of path) {
    node = node?.files?.find((n) => n.type === "directory" && n.name === seg);
    if (!node) return null;
  }
  return node ?? null;
}

export async function listProjectImages(slug: string) {
  const tree = await fetchTree();

  const dir = findDir(tree, ["Projects", slug]);
  if (!dir || !dir.files)
    return { cover: null as string | null, screens: [] as string[] };

  const files = dir.files.filter((f) => f.type === "file");

  const withExt = (name: string) => {
    const dot = name.lastIndexOf(".");
    if (dot === -1) return false;
    const ext = name.slice(dot + 1).toLowerCase();
    return exts.has(ext);
  };

  const coverFile =
    files.find(
      (f) => f.name.toLowerCase().startsWith("cover.") && withExt(f.name),
    ) ?? null;
  const cover = coverFile ? `${CDN}/Projects/${slug}/${coverFile.name}` : null;

  const screenFiles = files
    .filter((f) => /^screen-\d+\./i.test(f.name) && withExt(f.name))
    .sort((a, b) => {
      const na = parseInt(a.name.match(/\d+/)?.[0] ?? "0", 10);
      const nb = parseInt(b.name.match(/\d+/)?.[0] ?? "0", 10);
      return na - nb;
    });

  const screens = screenFiles.map((f) => `${CDN}/Projects/${slug}/${f.name}`);

  return { cover, screens };
}
