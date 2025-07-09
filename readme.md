# Advent of Code

My solutions to Advent of Code puzzles.

## Input files

Per [Advent of Code about page](https://adventofcode.com/about), input files are not shared publicly. This repository contains AES-256-CBC encrypted puzzle inputs in the `input.enc` file.

### Managing input files

Set the `AOC_INPUT_ENCRYPTION_KEY` environment variable.

- **Decrypt**: `pnpm run input:decrypt`
- **Encrypt**: `pnpm run input:encrypt`

### Input directory structure

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
