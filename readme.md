# Advent of Code

## Note

I read from somewhere that the author of Advent of Code would prefer if the input files are not shared. This is why I have not included them in this repository as plaintext. `input.enc` contains the input files encrypted with AES-256-CBC. `npm run input:encrypt` is a script to encrypt the input files and `npm run input:decrypt` is a script to decrypt the input files. The key is stored in an `.env` file. The `.env.example` is an example of how the `.env` file should look like.

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
