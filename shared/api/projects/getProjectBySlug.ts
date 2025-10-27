import type { Locale } from "next-intl";

const exts = ["webp", "png", "jpg", "jpeg"] as const;

async function headOk(url: string) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      next: { revalidate: 3600 },
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function firstExisting(base: string, name: string) {
  for (const ext of exts) {
    const url = `${base}/${name}.${ext}`;
    if (await headOk(url)) return url;
  }
  return null;
}

export const getProjectBySlug = async (slug: string, locale: Locale) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}?locale=${locale}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error("Project not found");
  const project = await res.json();

  // 2) Картинки из публичного Blob без токена
  const base = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
  const dir = `${base}/Projects/${slug}`;

  // cover.(webp|png|jpg|jpeg)
  const cover = await firstExisting(dir, "cover");

  // screen-1..screen-8 (можешь изменить диапазон)
  const screens: string[] = [];
  for (let i = 1; i <= 8; i++) {
    const found = await firstExisting(dir, `screen-${i}`);
    if (found) screens.push(found);
  }

  return {
    ...project,
    cover, // 👈 теперь есть cover
    screens, // 👈 и массив скринов
  };
};
