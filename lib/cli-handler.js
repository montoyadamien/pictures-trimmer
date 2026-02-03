const { FilesFinder } = require('./files-finder');
const { FileWriter } = require('./file-writer');
const { PictureTrimmer } = require('./picture-trimmer');

class CLIHandler {
  constructor(trimColor, input, path, verbose, addIndicator) {
    this.trimColor = trimColor;
    this.input = input;
    this.path = path;
    this.verbose = verbose;
    this.addIndicator = addIndicator;
  }

  async trimPictures() {
    const files = new FilesFinder(this.input, this.path).getFilesPathToTrim();

    await Promise.all(
      files.map(async (inputPath) => {
        await this.trimPicture(inputPath);
      })
    );
  }

  async trimPicture(inputPath) {
    const outFilePath = this.addIndicator
      ? FileWriter.computeNewFilePath(inputPath)
      : inputPath;

    try {
      await new PictureTrimmer(
        inputPath,
        this.trimColor,
        outFilePath,
        this.verbose
      ).trimPicture();
    } catch (error) {
      console.error(`Failed to trim ${inputPath}: ${error.message}`);
    }
  }
}

exports.CLIHandler = CLIHandler;
