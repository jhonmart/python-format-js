## Overview

String formatting like Python's .format()

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

### Browser

1.  Define `window.format`:

    ```html
    <script src="path/to/python-format-js"></script>
    ```

## Supported Parameter Values

- [x] '<' - Left aligns the result (within the available space)
- [x] '>' - Right aligns the result (within the available space)
- [x] '^' - Center aligns the result (within the available space)
- [ ] '=' - Places the sign to the left most position
- [ ] '+' - Use a plus sign to indicate if the result is positive or negative
- [ ] '-' - Use a minus sign for negative values only
- [ ] ' ' - Use a leading space for positive numbers
- [ ] ',' - Use a comma as a thousand separator
- [x] '_' - Use a underscore as a thousand separator
- [ ] 'b' - Binary format
- [ ] 'c' - Converts the value into the corresponding unicode character
- [ ] 'd' - Decimal format
- [ ] 'e' - Scientific format, with a lower case e
- [ ] 'E' - Scientific format, with an upper case E
- [ ] 'f' - Fix point number format
- [ ] 'F' - Fix point number format, upper case
- [ ] 'g' - General format
- [ ] 'G' - General format (using a upper case E for scientific notations)
- [ ] 'o' - Octal format
- [ ] 'x' - Hex format, lower case
- [ ] 'X' - Hex format, upper case
- [ ] 'n' - Number format
- [ ] '%' - Percentage format

## Examples

    ```
    $ '{:<6} {:<28} {:>5} {:^9}'.format('aba','x  1 teste','x2','x3')
    $ 'aba    x  1 teste                      x2    x3    '
    ```
