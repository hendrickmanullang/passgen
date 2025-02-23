# TL;DR

Simple CLI to generate a 12-char password

- run the `passgen` command in your terminal
- Password is copied to your clipboard -> `CTRL + V` when you're ready

# Installation

Copy the repo to your machine

```
gh repo clone hendrickmanullang/passgen
```

Nagivate to directory

```
cd passgen
```

Install globally

```
npm install -g passgen
```

# Usage

Run the command

```
passgen
```

A random 12 char alpha/numeric/symbol password will be copied to your clipboard.

- `ctrl + v` to reveal the password/paste into your web form.
- Run the `passgen` command again if you need to re-generate a password until it satisfies the site's requirement.

### Flags:

- `-l` for custom length password
- `-c` to exclude capital letters
- `-lo` to exclude lowercase letters
- `-s` to exclude symbols
- `-n` to exclude numbers

e.g.
```
passgen -l 16 -c -n
```

Generates a 16 char pass with no capital letters or numbers
