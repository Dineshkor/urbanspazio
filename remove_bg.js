const sharp = require('sharp');
const path = require('path');

const INPUT = path.resolve('d:/nextjs/urbanspazio/public/images/logo.png');
const OUTPUT = path.resolve('d:/nextjs/urbanspazio/public/images/logo-transparent.png');

async function run() {
  // Flatten onto white to get true pixel colors, then re-add alpha
  var result = await sharp(INPUT)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  var pixels = Buffer.from(result.data);
  var w = result.info.width;
  var h = result.info.height;

  for (var i = 0; i < pixels.length; i += 4) {
    var r = pixels[i], g = pixels[i+1], b = pixels[i+2];
    var dist = Math.sqrt((r-255)*(r-255) + (g-255)*(g-255) + (b-255)*(b-255));
    if (dist < 20) { pixels[i+3] = 0; }
    else if (dist < 50) { pixels[i+3] = Math.min(255, Math.round(255*(dist-20)/30)); }
    else { pixels[i+3] = 255; }
  }

  await sharp(pixels, { raw: { width: w, height: h, channels: 4 } })
    .trim().png().toFile(OUTPUT);

  var m = await sharp(OUTPUT).metadata();
  console.log('Done: ' + m.width + 'x' + m.height);
}
run().catch(function(e) { console.error(e); process.exit(1); });
