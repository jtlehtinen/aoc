# Advent of Code

My solutions to AoC puzzles.

## Note

Advent of Code [About page](https://adventofcode.com/2023/about) instructs to not share the input files. This is why I have not included them in this repository as plaintext. `input.enc` contains my input files encrypted with AES-256-CBC.

The encrypted input file archive is created by running `npm run input:encrypt`. To decrypt it run `npm run input:decrypt`. Both operations require a key. The key is taken from the `AOC_INPUT_ENCRYPTION_KEY` environment variable.

The input files are assumed to exist in the `/input` directory with the following directory structure:

```txt
📦 <project root>
└ 📂 input
   ├ 📂 2015
   │  ├ 📜 01.txt
   │  ├ 📜 02.txt
   │  ⋮
   │  └ 📜 25.txt
   ├ 📂 2016
   │  ├ 📜 01.txt
   │  ├ 📜 02.txt
   │  ⋮
   │  └ 📜 25.txt
   ⋮
```
