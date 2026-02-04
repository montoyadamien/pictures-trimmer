const sharp = require('sharp');

sharp.cache(false);

class PictureTrimmer {
  constructor(filePath, trimColor, outFilePath, verbose, range) {
    this.filePath = filePath;
    this.trimColor = trimColor;
    this.outFilePath = outFilePath;
    this.verbose = verbose;
    this.range = range;
  }

  computeBorder(isMin, current, border) {
    if (border === undefined) {
      return current;
    }
    return isMin ? Math.min(border, current) : Math.max(border, current);
  }

  trimColorInRange(colorValue, trimColorValue) {
    return (
      colorValue >= Math.max(trimColorValue - this.range, 0) &&
      colorValue <= Math.min(trimColorValue + this.range, 255)
    );
  }

  async trimPicture() {
    if (this.verbose) {
      console.log(
        `Trimming file ${this.filePath} with ${this.trimColor} color`
      );
    }
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
          !this.trimColorInRange(r, this.trimColor.r) ||
          !this.trimColorInRange(g, this.trimColor.g) ||
          !this.trimColorInRange(b, this.trimColor.b)
        ) {
          minX = this.computeBorder(true, x, minX);
          minY = this.computeBorder(true, y, minY);
          maxX = this.computeBorder(false, x, maxX);
          maxY = this.computeBorder(false, y, maxY);
        }
      }
    }
    if (
      minX === undefined ||
      maxX === undefined ||
      minY === undefined ||
      maxY === undefined
    ) {
      if (this.verbose) {
        console.log(`Picture ${this.filePath} do not need to be trimmed`);
      }
      return;
    }
    if (minX === 0 && minY === 0 && maxX === width - 1 && maxY === height - 1) {
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
    if (this.verbose) {
      console.log(`Success to trim ${this.filePath}`);
    }
  }
}

exports.PictureTrimmer = PictureTrimmer;
