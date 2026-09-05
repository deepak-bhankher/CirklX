import sharp from "sharp";
import { readdir } from "fs/promises";
import path from "path";

const DIR = "public";
const files = await readdir(DIR);

// Blog images — 1200px kaafi hai. Original 1600px+ sirf weight badha raha
// tha, dikhti wo 800px par hai.
const BLOG = /^(social-|ai-|community-)/i;

for (const f of files) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  if (!BLOG.test(f)) continue;

  const out = path.join(DIR, f.replace(/\.(jpe?g|png)$/i, ".webp"));

  await sharp(path.join(DIR, f))
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);

  console.log("banaya:", out);
}