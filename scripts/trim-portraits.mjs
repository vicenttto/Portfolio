import sharp from "sharp";
import path from "node:path";

const dir = path.resolve(import.meta.dirname, "../src/assets/media");
const files = [
  "feliz-removebg-preview.png",
  "sorpresa-removebg-preview.png",
  "enfado-removebg-preview.png",
];

const boxes = [];
for (const file of files) {
  const input = path.join(dir, file);
  const { info } = await sharp(input)
    .trim({ threshold: 10 })
    .toBuffer({ resolveWithObject: true });
  console.log(file, JSON.stringify(info));
  boxes.push({
    file,
    left: -(info.trimOffsetLeft ?? 0),
    top: -(info.trimOffsetTop ?? 0),
    width: info.width,
    height: info.height,
  });
}

const left = Math.max(0, Math.min(...boxes.map((b) => b.left)));
const top = Math.max(0, Math.min(...boxes.map((b) => b.top)));
const right = Math.max(...boxes.map((b) => b.left + b.width));
const bottom = Math.max(...boxes.map((b) => b.top + b.height));
const width = right - left;
const height = bottom - top;

console.log("Encuadre compartido:", { left, top, width, height });

for (const file of files) {
  const input = path.join(dir, file);
  const output = path.join(
    dir,
    file.replace("-removebg-preview.png", "-crop.png")
  );
  await sharp(input).extract({ left, top, width, height }).toFile(output);
  console.log(file, "->", path.basename(output));
}
