import sharp from "sharp";
import { readdir } from "fs/promises";
import path from "path";

const DIR = "public";
const files = await readdir(DIR);

for (const f of files) {
  // sirf work*.jpeg — inke card 280px ke hain, 1200px bekaar hai.
  // retina ke liye 2x rakha: 560px.
  if (!/^work\d+\.jpe?g$/i.test(f)) continue;

  const out = path.join(DIR, f.replace(/\.jpe?g$/i, ".webp"));

  await sharp(path.join(DIR, f))
    .resize({ width: 560, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(out);

  console.log("banaya:", out);
}