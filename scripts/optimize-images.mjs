import sharp from "sharp";
import { readdir } from "fs/promises";
import path from "path";

const DIR = "public";
const files = await readdir(DIR);

for (const f of files) {
  // sirf jpeg/jpg par kaam — png chhote hain, unhe haath nahi lagana
  if (!/\.(jpe?g)$/i.test(f)) continue;

  const out = path.join(DIR, f.replace(/\.jpe?g$/i, ".webp"));

  await sharp(path.join(DIR, f))
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);

  console.log("banaya:", out);
}