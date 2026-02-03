# pictures-trimmer
Node.js image trimmer by color (JPEG, PNG, BMP, TIFF, GIF, WebP, AVIF)

[![Validation workflow](https://github.com/montoyadamien/pictures-trimmer/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/montoyadamien/pictures-trimmer/actions)
[![Coverage Status](https://coveralls.io/repos/github/montoyadamien/pictures-trimmer/badge.svg?branch=main)](https://coveralls.io/github/montoyadamien/pictures-trimmer?branch=main)
[![NPM Version](https://img.shields.io/npm/v/pictures-trimmer?style=flat&logo=npm&logoColor=rgb(149%2C%20157%2C%20165))](https://www.npmjs.com/package/pictures-trimmer)
[![NPM Downloads](https://img.shields.io/npm/dw/pictures-trimmer?logo=npm&color=%23007ec6&logoColor=rgb(149%2C%20157%2C%20165))](https://www.npmjs.com/package/pictures-trimmer)
[![NPM License](https://img.shields.io/npm/l/pictures-trimmer?logoColor=rgb(149%2C%20157%2C%20165))](https://github.com/montoyadamien/pictures-trimmer/blob/main/LICENSE)

## Installation:
This is a Node.js module, that can be run with the command line. First ensure you have npm installed, and then install as follows:
```bash
npm install -g pictures-trimmer
```
## Usage:
```text
pictures-trimmer -c #ffffff [options]

Options:
  --input, -i       Input pictures extention to trim in case of directory path      [string][default="jpeg,jpg,png,bmp,tiff,gif"]
  --path, -p        Path to the input file / directory                              [string][default="./"]
  --verbose, -v     Increase verbosity                                              [boolean][default=false]
  --saveas, -s      true to overwrite current file, false to save as a copy         [boolean][default=true]
```

## Examples:
### Trim a picture that has white background around subject
```text
Use hexa color:
pictures-trimmer -p mypicture.png -i #ffffff
Use rgb color:
pictures-trimmer -p mypicture.png -i 255,255,255
```
### Trim every pictures in a directory
```text
pictures-trimmer -p pictures/ -i #ffffff
```
### Trim every JPEG or PNG pictures in a directory
```text
pictures-trimmer -p pictures/ -i jpeg,jpg,png -i #ffffff
```
