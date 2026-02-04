const {
  availableExtentions,
} = require('../lib/constants/available-extentions');
const { Color } = require('../lib/color');

class ArgsParser {
  constructor() {}

  /* istanbul ignore next */
  static displayAndExit(message) {
    console.log(message);
    process.exit(1);
  }

  static parseColor(color) {
    const hexRegex = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
    const rgbRegex = /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/;
    let internalColor;
    if (color.match(hexRegex)) {
      const parsed = hexRegex.exec(color);
      internalColor = new Color(
        parseInt(parsed[1], 16),
        parseInt(parsed[2], 16),
        parseInt(parsed[3], 16)
      );
    } else if (color.match(rgbRegex)) {
      const parsed = rgbRegex.exec(color);
      internalColor = new Color(
        parseInt(parsed[1], 10),
        parseInt(parsed[2], 10),
        parseInt(parsed[3], 10)
      );
    } else {
      /* istanbul ignore next */
      this.displayAndExit(`color must have format: #xxxxxx or r,g,b`);
    }

    return internalColor;
  }

  static parseInput(input) {
    let parsedInput = input;
    if (!Array.isArray(input)) {
      parsedInput = input.split(',');
    }
    parsedInput = parsedInput.map((i) => i.toLowerCase());
    if (!parsedInput.every((i) => availableExtentions.includes(i))) {
      /* istanbul ignore next */
      this.displayAndExit(`input must be one of: [${availableExtentions}]`);
    }

    return parsedInput;
  }

  static parsePath(path) {
    if (path) {
      const res = /\.([0-9a-z]+)$/i.exec(path);
      if (res && !availableExtentions.includes(res[1])) {
        /* istanbul ignore next */
        this.displayAndExit(
          `path must point to a directory or a picture with the following extention: [${availableExtentions}]`
        );
      }
    }
  }

  static parseRange(range) {
    const res = Number.parseInt(range, 0);
    if (Number.isNaN(res)) {
      /* istanbul ignore next */
      this.displayAndExit(`range must be an integer`);
    }

    return res;
  }
}

exports.ArgsParser = ArgsParser;
