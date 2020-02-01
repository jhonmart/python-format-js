# Overview

[![NPM](https://nodei.co/npm/python-format-js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/python-format-js/)

[![Build Status](https://travis-ci.org/jhonmart/python-format-js.svg?branch=master)](https://travis-ci.org/jhonmart/python-format-js) [![Coverage Status](https://coveralls.io/repos/github/jhonmart/python-format-js/badge.svg)](https://coveralls.io/github/jhonmart/python-format-js) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/python-format-js.svg)](https://badge.fury.io/js/python-format-js)

String formatting like Python's .format()

**Obs:The result expected is the same as Python**

## Install

#### Node

1.  Install:


    ```console
    $ npm install python-format-js
    ```

    or

    ```console
    $ yarn add python-format-js
    ```

2.  Require:

    ```javascript
    const format = require("python-format-js");
    ```

## Tests

    ```console
    $ npm test
    ```

    or

    ```console
    $ yarn test
    ```

## You Can Do

    -  Basic formatting
    -  Padding and aligning strings
    -  Truncating long strings
    -  Combining truncating and padding
    -  Signed numbers
    -  Named placeholders

[See Documention in Python](https://pyformat.info/)

## Supported Parameter Values

- [x] '<' - Left aligns the result (within the available space)
- [x] '>' - Right aligns the result (within the available space)
- [x] '^' - Center aligns the result (within the available space)
- [x] '=' - Places the sign to the left most position
- [x] '+' - Use a plus sign to indicate if the result is positive or negative
- [x] '-' - Use a minus sign for negative values only
- [x] ' ' - Use a leading space for positive numbers
- [x] ',' - Use a comma as a thousand separator
- [x] '\_' - Use a underscore as a thousand separator
- [x] 'b' - Binary format
- [x] 'c' - Converts the value into the corresponding unicode character
- [x] 'd' - Decimal format
- [x] 'e' - Scientific format, with a lower case e
- [x] 'E' - Scientific format, with an upper case E
- [x] 'f' - Fix point number format
- [x] 'F' - Fix point number format, upper case
- [x] 'g' - General format
- [x] 'G' - General format (using a upper case E for scientific notations)
- [x] 'o' - Octal format
- [x] 'x' - Hex format, lower case
- [x] 'X' - Hex format, upper case
- [x] 'n' - Number format
- [x] '%' - Percentage format
- [x] '#' - Makes the format include the 0b prefix in (Octal,Hex,Binary)

## Examples

## **Obs:The result expected is the same as Python**

- Please report any bug

[More Examples](./Examples.md)

    - Simples Change:

```javascript
"{} {}".format("Jhon", "Mart");

("Jhon Mart");
```

    - Advance Change Array:

```javascript
"My name is {0} and i have {1} years old!".format(["Jônatas", 21]);

("My name is Jônatas and i have 21 years old!");
```

    - Advance Change Object:

```javascript
"Your name is {name} and you have {age} years old!".format({name: "Jônatas", age: 21});

("My name is Jônatas and i have 21 years old!");
```

    - One Argument type Number:

```javascript
"{} ".format(2);

("2 ");
```

    - One Argument type Float:

```javascript

 "{} ".format(3.14))

 ("3.14 ");
```

    - One Argument type Boolean:

```javascript
 "{} ".format(true))

 ("true ")
```

    - Multiple type Argument:

```javascript
"{} {} {}".format(2, 3.14, true);

("2 3.14 true");
```

    - Overflow String Align Right:

```javascript
"{:^3}".format("Gustavo");

("Gustavo");
```
	
    - Overflow String Align Center:

```javascript
"{:^3}".format("Gustavo");

("Gustavo");
```
	
    - Align Left:

```javascript
"{:<6}".format("oii");

("oii   ");
```
	
    - Align Right:

```javascript
"{:>6}".format("oii");

("   oii");
```
	
    - Align Center Incomplete:

```javascript
"{:^6}".format("oii");

(" oii  ");
```
	
    - Align Center Complete:

```javascript
"{:^7}".format("oii");

("  oii  ");
```
	
    - Crop:

```javascript
"{:.7}".format("Jonatas Martins");

("Jonatas");
```
	
    - Size String:

```javascript
"{:10}".format("test");

("test      ");
```
	
    - Char Append Left:

```javascript
"{:_<7}".format("Jhon");

("Jhon___");
```
	
    - Char Append Right:

```javascript
"{:_>7}".format("Jhon");

("___Jhon");
```
	
    - Char Append Center Incomplete:

```javascript
"{:_^7}".format("Jhon");

("_Jhon__");
```
	
    - String and param left align:

```javascript
"Olá {:<8}".format("Jhon");

("Olá Jhon    ");
```
	
    - String and param right align:

```javascript
"Olá {:>8}".format("Jhon");

("Olá     Jhon");
```
	
    - String and param center align:

```javascript
"Olá {:^8}".format("Jhon");

("Olá   Jhon  ");
```
	
    - Float:

```javascript
"{:f}; {:f}".format(3.14, -3.14);

("3.140000; -3.140000");
```
	
    - Float Space:

```javascript
"{: f}; {: f}".format(3.14, -3.14);

(" 3.140000; -3.140000");
```
	
    - Float Align:

```javascript
"{:<15f}; {: f}".format(3.14, -3.14);

("3.140000       ; -3.140000");
```
	
    - Float Plus:

```javascript
"{:+f}; {:+f}".format(3.14, -3.14);

("+3.140000; -3.140000");
```
	
    - Float Less:

```javascript
"{:-f}; {:-f}".format(3.14, -3.14);

("3.140000; -3.140000");
```
	
    - Number Simple:

```javascript
"{:n} é maior que {:n} ".format(3.14, 21);

("3.14 é maior que 21 ");
```
	
    - Binary:

```javascript
"{:b}".format(42);

("101010");
```
	
    - Binary Align:

```javascript
"{:>4b}".format(5);

(" 101");
```
	
    - Binary Mask:

```javascript
"{:#b}".format(42);

("0b101010");
```
	
    - Octal:

```javascript
"{:o}".format(42);

("52");
```
	
    - Octal Mask:

```javascript
"{:#o}".format(42);

("0o52");
```
	
    - Octal Mask Sign:

```javascript
"{:-o}".format(42);

("+52");
```
	
    - Octal Mask Space:

```javascript
"{: o}".format(42);

(" 52");
```
	
    - Number Octal Positive:

```javascript
"{:+#o}".format(4233);

("+0o10211");
```
	
    - Number Octal Negative:

```javascript
"{:-#o}".format(-4233);

("-0o10211");
```
	
    - Hexadecimal:

```javascript
"{:x}".format(42);

("2a");
```
	
    - Hexadecimal Mask:

```javascript
"{:#x}".format(42);

("0x2a");
```
	
    - Hexadecimal Mask Upper Case:

```javascript
"{:#X}".format(42);

("0X2A");
```
	
    - Decimal Number:

```javascript
"{:d}".format(42);

("42");
```
	
    - Exp:

```javascript
"{:e}".format(4233);

("4.233e+3");
```
	
    - Exp Upper Case:

```javascript
"{:E}".format(4233);

("4.233E+3");
```
	
    - Exp Size Over:

```javascript
"{:<15e}".format(4233);

("4.233e+3       ");
```
	
    - Percent:

```javascript
"{:%}".format(0.065);

("6.500000%");
```
	
    - All data:

```javascript
"{:g}".format('Hello World');

("Hello World");
```
	
    - Align All:

```javascript
"{:<5g}".format('T');

("T    ");
```
	
    - All Upper Case:

```javascript
"{:G}".format("Hello World");

("HELLO WORLD");
```
	
    - Thousands Separator:

```javascript
"{:,}".format(1234567890);

("1,234,567,890");
```

### Help us

[CONTRIBUTING](./CONTRIBUTING.md)
