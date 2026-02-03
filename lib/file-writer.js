class FileWriter {
  static computeNewFilePath(inputPath) {
    const index = inputPath.lastIndexOf('.');

    return `${inputPath.substring(0, index)}_trimmed${inputPath.substring(index)}`;
  }
}

exports.FileWriter = FileWriter;
