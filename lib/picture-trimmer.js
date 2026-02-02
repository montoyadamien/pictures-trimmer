const sharp = require('sharp');

class PictureTrimmer {
  constructor(filePath, trimColor, outFilePath) {
    this.filePath = filePath;
    this.trimColor = trimColor;
    this.outFilePath = outFilePath;
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
    await sharpData
      .extract({
        left: minX,
        top: minY,
        width: maxX - minX,
        height: maxY - minY,
      })
      .toFormat(
        this.outFilePath.substring(this.outFilePath.lastIndexOf('.') + 1)
      )
      .toFile(this.outFilePath);
  }
}

exports.PictureTrimmer = PictureTrimmer;
