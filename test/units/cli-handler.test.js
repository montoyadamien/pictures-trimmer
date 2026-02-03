const assert = require('assert');
const fs = require('fs');
const { CLIHandler } = require('../../lib/cli-handler');
const { Color } = require('../../lib/color');

describe('cli-handler.js tests', function () {
  describe('trimPictures', function () {
    it('should trim a png file', async function () {
      const inPath = 'test/data/1_test.png';
      const outPath = 'test/data/1_test_trimmed.png';

      const cliHandler = new CLIHandler(
        new Color(10, 134, 139),
        '',
        inPath,
        false,
        true
      );
      await cliHandler.trimPictures();
      assert.equal(fs.lstatSync(outPath).isFile(), true);
      fs.rmSync(outPath);
    });

    it('should not trim a png file if color is not in file', async function () {
      const inPath = 'test/data/1_test.png';
      const outPath = 'test/data/1_test_trimmed.png';

      const cliHandler = new CLIHandler(
        new Color(255, 0, 255),
        '',
        inPath,
        true,
        true
      );
      await cliHandler.trimPictures();
      assert.equal(fs.existsSync(outPath), false);
    });

    it('should trim a png file and keep same name', async function () {
      const inPath = 'test/data/8_test.png';
      const outPath = 'test/data/8_test.png';

      const cliHandler = new CLIHandler(
        new Color(10, 134, 139),
        '',
        inPath,
        true,
        false
      );
      await cliHandler.trimPictures();
      assert.equal(fs.lstatSync(outPath).isFile(), true);
    });

    it('should trim a webp file', async function () {
      const inPath = 'test/data/2_test.webp';
      const outPath = 'test/data/2_test_trimmed.webp';

      const cliHandler = new CLIHandler(
        new Color(10, 134, 139),
        '',
        inPath,
        false,
        true
      );
      await cliHandler.trimPictures();
      assert.equal(fs.lstatSync(outPath).isFile(), true);
      // fs.rmSync(outPath);
    });

    it('should trim a webp file with verbose activated', async function () {
      const inPath = 'test/data/2_test.webp';
      const outPath = 'test/data/2_test_trimmed.webp';

      const cliHandler = new CLIHandler(
        new Color(10, 134, 139),
        '',
        inPath,
        true,
        true
      );
      await cliHandler.trimPictures();
      assert.equal(fs.lstatSync(outPath).isFile(), true);
      fs.rmSync(outPath);
    });

    // coverage test
    // this case should not occur since the CLI can not be run on files that are not pictures
    it('should throw an error if file can not be trimmed', async function () {
      const inPath = 'mywrongpath';
      const cliHandler = new CLIHandler('png', [], inPath, false);
      try {
        await cliHandler.trimPictures(inPath);
        assert.equal(false, true);
      } catch {
        assert.equal(true, true);
      }
    });
  });
});
