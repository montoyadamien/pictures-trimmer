const sharp = require('sharp');

sharp.cache(false);

class PictureTrimmer {
  constructor(filePath, trimColor, outFilePath, verbose) {
    this.filePath = filePath;
    this.trimColor = trimColor;
    this.outFilePath = outFilePath;
    this.verbose = verbose;
  }

  checkPixel(isMin, current, border) {
    if (border === undefined) {
      return current;
    }
    return isMin ? Math.min(border, current) : Math.max(border, current);
  }

  async trimPicture() {
    const sharpData = sharp(this.filePath);
    const metadata = await sharpData.metadata();
    const { channels, width, height } = metadata;
    const picture = await sharpData.raw().toBuffer();

    let minX;
    let minY;
    let maxX;
    let maxY;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const offset = channels * (width * y + x);
        const r = picture[offset];
        const g = picture[offset + 1];
        const b = picture[offset + 2];
        if (
          r !== this.trimColor.r ||
          g !== this.trimColor.g ||
          b !== this.trimColor.b
        ) {
          minX = this.checkPixel(true, x, minX);
          minY = this.checkPixel(true, y, minY);
          maxX = this.checkPixel(false, x, maxX);
          maxY = this.checkPixel(false, y, maxY);
        }
      }
    }
    if (minX === 0 && minY === 0 && maxX === width && maxY === height) {
      if (this.verbose) {
        console.log(`Picture ${this.filePath} do not need to be trimmed`);
      }
      return;
    }
    const buffer = await sharpData
      .extract({
        left: minX,
        top: minY,
        width: maxX - minX,
        height: maxY - minY,
      })
      .toFormat(
        this.outFilePath.substring(this.outFilePath.lastIndexOf('.') + 1)
      )
      .toBuffer();

    // do in two times to prevent sharp writing with same file for input and output
    await sharp(buffer).toFile(this.outFilePath);
  }
}

exports.PictureTrimmer = PictureTrimmer;
