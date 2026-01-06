# Overview

[![NPM](https://nodei.co/npm/python-format-js.png?downloads=true\&downloadRank=true\&stars=true)](https://nodei.co/npm/python-format-js/)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/python-format-js.svg)](https://badge.fury.io/js/python-format-js)

[![Functions](https://raw.githubusercontent.com/jhonmart/python-format-js/master/badges/badge-functions.svg)](https://github.com/jhonmart/python-format-js/commits)
[![Lines](https://raw.githubusercontent.com/jhonmart/python-format-js/master/badges/badge-lines.svg)](https://github.com/jhonmart/python-format-js/commits)
[![Branches](https://raw.githubusercontent.com/jhonmart/python-format-js/master/badges/badge-branches.svg)](https://github.com/jhonmart/python-format-js/commits)

**Python-style string formatting for JavaScript.**

This library brings Python’s powerful `str.format()` syntax to JavaScript, keeping the behavior **as close as possible to Python**.

> ⚠️ **Note:**
> The expected output is intentionally the same as Python’s `str.format`.

---

## Installation

### Node.js

```bash
npm install python-format-js
```

or

```bash
yarn add python-format-js
```

### Usage

```js
// Import module + prototype
const format = require("python-format-js");
```

or (prototype only):

```js
require("python-format-js");
```

---

## Tests

```bash
npm test
```

or

```bash
yarn test
```

---

## Features

You can:

* Basic positional formatting
* Named placeholders (objects)
* Padding and alignment
* String truncation
* Truncation + padding combined
* Signed and formatted numbers
* Numeric bases (binary, octal, hex)
* Scientific notation
* Percent and thousand separators

📘 Python reference:
[https://pyformat.info/](https://pyformat.info/)

---

## Supported Format Options

### Alignment & Fill

* `<` Left align
* `>` Right align
* `^` Center align
* `=` Sign-aware padding

### Sign

* `+` Always show sign
* `-` Only negative sign
* ` ` Leading space for positive numbers

### Numeric Formatting

* `,` Thousand separator (comma)
* `_` Thousand separator (underscore)
* `b` Binary
* `o` Octal
* `x` Hex (lowercase)
* `X` Hex (uppercase)
* `d` Decimal
* `n` Number
* `e` Scientific (lowercase)
* `E` Scientific (uppercase)
* `f` Fixed-point
* `g` General
* `%` Percentage
* `#` Prefix for binary, octal and hex (`0b`, `0o`, `0x`)

---

## Examples

> ⚠️ **Reminder:** Output matches Python behavior.

---

### Basic formatting

```js
"{} {}".format("Jhon", "Mart");
// → "Jhon Mart"
```

---

### Positional arguments (array)

```js
"My name is {0} and I am {1} years old.".format(["Jônatas", 21]);
// → "My name is Jônatas and I am 21 years old."
```

---

### Named arguments (object)

```js
"My name is {name} and I am {age} years old.".format({
  name: "Jônatas",
  age: 21,
});
// → "My name is Jônatas and I am 21 years old."
```

---

### Single argument

```js
"{}".format(2);        // "2"
"{}".format(3.14);     // "3.14"
"{}".format(true);     // "true"
```

---

### Multiple argument types

```js
"{} {} {}".format(2, 3.14, true);
// → "2 3.14 true"
```

---

## String Alignment & Padding

### Left, Right and Center

```js
"{:<6}".format("oii"); // "oii   "
"{:>6}".format("oii"); // "   oii"
"{:^6}".format("oii"); // " oii  "
"{:^7}".format("oii"); // "  oii  "
```

---

### Custom fill character

```js
"{:_<7}".format("Jhon"); // "Jhon___"
"{:_>7}".format("Jhon"); // "___Jhon"
"{:_^7}".format("Jhon"); // "_Jhon__"
```

---

### Overflow (no truncation by default)

```js
"{:^3}".format("Gustavo");
// → "Gustavo"
```

---

## String Truncation

```js
"{:.7}".format("Jonatas Martins");
// → "Jonatas"
```

---

### Fixed size (padding only)

```js
"{:10}".format("test");
// → "test      "
```

---

## Numbers & Floats

### Fixed-point

```js
"{:f}; {:f}".format(3.14, -3.14);
// → "3.140000; -3.140000"
```

---

### Sign handling

```js
"{:+f}; {:+f}".format(3.14, -3.14);
// → "+3.140000; -3.140000"

"{: f}; {: f}".format(3.14, -3.14);
// → " 3.140000; -3.140000"
```

---

### Alignment with numbers

```js
"{:<15f}; {: f}".format(3.14, -3.14);
// → "3.140000       ; -3.140000"
```

---

## Numeric Bases

### Binary

```js
"{:b}".format(42);     // "101010"
"{:#b}".format(42);    // "0b101010"
"{:>4b}".format(5);    // " 101"
```

---

### Octal

```js
"{:o}".format(42);     // "52"
"{:#o}".format(42);    // "0o52"
"{:+#o}".format(4233); // "+0o10211"
"{:-#o}".format(-4233);// "-0o10211"
```

---

### Hexadecimal

```js
"{:x}".format(42);     // "2a"
"{:#x}".format(42);    // "0x2a"
"{:#X}".format(42);    // "0X2A"
```

---

## Scientific & Percentage

```js
"{:e}".format(4233);   // "4.233e+3"
"{:E}".format(4233);   // "4.233E+3"
"{:%}".format(0.065);  // "6.500000%"
```

---

## Thousand Separator

```js
"{:,}".format(1234567890);
// → "1,234,567,890"
```

---

## 🔹 Direct Array Index Access (`{[n]}`)

```js
"{[1]}".format([1, 2, 3]);
// → "2"
```

---

## 🔹 Zero Padding (`0`)

```js
"{:03d}".format(7);
// → "007"

"{:04}".format(8);
// → "0008"
```

---

## 🔹 Numeric Padding Applied to Strings (Issue #50)

```js
"{:04},{:010},{:010},{:5}".format(8, 9, 6.4, "Test");
// → "0008,0000000009,00000006.4,Test "
```

---

## 🔹 Sign-Aware Alignment (`=`) — Issue #53

```js
"{:+10d}".format(-14);
// → "       -14"

"{:=10d}".format(-14);
// → "-       14"

"{:=+10d}".format(14);
// → "+       14"

"{:=+7d}".format(145678);
// → "+145678"
```

---

## 🔹 Float Precision (`.Nf`)

```js
"This is PI: {:.4f}".format(Math.PI);
// → "This is PI: 3.1416"

"This is PI: {:.8f}".format(Math.PI);
// → "This is PI: 3.14159265"
```

---

## 🔹 Thousand Separator with Underscore (`_`)

```js
"{:_}".format(1234567890);
// → "1_234_567_890"
```

---

## 🔹 Full Python Numeric Format (Complex Specifier)

```js
"{num:_^+#20,.4f}".format({ num: 12345.67890123 });
// → "____+12,345.6789____"
```

---

## 🔹 Function-Only Import (No Prototype)

```js
const Format = require("python-format-js");

Format("{:E}", 4233);
// → "4.233000E+3"
```

## 🔹 Strict Mode (`strict: false`) — Issue #54

### Default Behavior (strict = true → throws)

```js
"My name is {name} {something}".format({
  name: "Jônatas",
  age: 21,
});
// ❌ Throws error
```

### Non-Strict Mode (ignores missing placeholders)

```js
"My name is {name} {something}".format(
  { name: "Jônatas", age: 21 },
  { strict: false }
);
// → "My name is Jônatas "
```

---

## 🔹 Documented Error Cases

```js
"{}".format();          // ❌ index out of range
"{:a}".format(123);     // ❌ invalid format specifier
"{2}".format("a", "b"); // ❌ index out of range
```

---

## Help Us

* Found a bug? Please report it 🙏
* Contributions are welcome!

📄 [CONTRIBUTING](./CONTRIBUTING.md)
