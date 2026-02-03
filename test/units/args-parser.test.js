const assert = require('assert');
const { ArgsParser } = require('../../bin/args-parser');

describe('args-parser.js tests', function () {
  describe('parseColor', function () {
    it('should parse a valid rgb color', async function () {
      const color = ArgsParser.parseColor('255,200,100');
      assert.equal(color.r, 255);
      assert.equal(color.g, 200);
      assert.equal(color.b, 100);
    });

    it('should parse a valid hexa color', async function () {
      const color = ArgsParser.parseColor('#ffc864');
      assert.equal(color.r, 255);
      assert.equal(color.g, 200);
      assert.equal(color.b, 100);
    });

    it('should parse a valid hexa color bis', async function () {
      const color = ArgsParser.parseColor('#FFC864');
      assert.equal(color.r, 255);
      assert.equal(color.g, 200);
      assert.equal(color.b, 100);
    });
  });

  describe('parseInput', function () {
    it('should parse a valid input', async function () {
      assert.deepEqual(ArgsParser.parseInput('WEBP,PNG'), ['webp', 'png']);
    });
  });

  describe('parsePath', function () {
    it('should parse a valid path', async function () {
      ArgsParser.parsePath('./test/data/');
      ArgsParser.parsePath('./test/data/1_test.png');
    });
  });
});
