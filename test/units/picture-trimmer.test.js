/* eslint mocha/no-async-suite: 0 */
/* eslint mocha/no-setup-in-describe: 0 */

const assert = require('assert');
const fs = require('fs');
const { PictureTrimmer } = require('../../lib/picture-trimmer');
const { Color } = require('../../lib/color');

describe('picture-trimmer.js tests', function () {
  describe('trimPicture', async function () {
    await Promise.all(
      [
        {
          path: 'test/data/1_test',
          in: 'png',
          color: new Color(10, 134, 139),
        },
        {
          path: 'test/data/2_test',
          in: 'webp',
          color: new Color(10, 134, 139),
        },
        {
          path: 'test/data/3_test',
          in: 'gif',
          color: new Color(10, 134, 139),
        },
        {
          path: 'test/data/4_test',
          in: 'jpg',
          color: new Color(10, 133, 138),
        },
        {
          path: 'test/data/5_test',
          in: 'avif',
          color: new Color(10, 133, 138),
        },
        {
          path: 'test/data/6_test',
          in: 'tiff',
          color: new Color(10, 133, 138),
        },
        {
          path: 'test/data/7_test',
          in: 'JPG',
          color: new Color(10, 133, 138),
        },
      ].map(async (testData) => {
        it(`should trim a ${testData.in} file`, async function () {
          const inPath = `${testData.path}.${testData.in}`;
          const outPath = `${testData.path}_trimmed.${testData.in}`;

          await new PictureTrimmer(
            inPath,
            testData.color,
            outPath
          ).trimPicture();

          assert.equal(fs.lstatSync(outPath).isFile(), true);
          fs.rmSync(outPath);
        });
      })
    );
  });
});
