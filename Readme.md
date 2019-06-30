# Overview

[![Build Status](https://travis-ci.org/jhonmart/python-format-js.svg?branch=master)](https://travis-ci.org/jhonmart/python-format-js)

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

## Tests

    ```console
    $ npm test
    ```

    or

    ```console
    $ yarn test
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
- [x] ',' - Use a comma as a thousand separator
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

**Obs:The result expected is the same as Python**
---

- Please report any bug

[More Examples](./Examples.md)

    - simples_change:
   ```javascript 
    "{} {}".format("Jhon", "Mart")

    "Jhon Mart"
```

    - one_arg_int:
   ```javascript
    "{} ".format(2)
    
    "2 "
```

    - one_arg_float:
   ```javascript

    "{} ".format(3.14))

    "3.14 "
```

    - one_arg_bool:
   ```javascript
    "{} ".format(true))
    
    "true "
```

    - multiple_type_arg:
   ```javascript

    "{} {} {}".format(2, 3.14, true)

    "2 3.14 true"
```

    - overflow_srt_length_center:
```javascript

    "{:^3}".format("Gustavo")
    
    "Gustavo"
```

    - align_left:
```javascript

    "{:<6}".format("oii")
    
    "oii   "
```

    - align_right:
```javascript

    "{:>6}".format("oii")

    "   oii"
```

    - crop:
```javascript

    "{:.7}".format("Jonatas Martins")

    "Jonatas"
```

    - size_string:
```javascript

    "{:10}".format("test")

    "test      "
```


    - char_append_right:
```javascript

    "{:_>7}".format("Jhon")
    
    "___Jhon"
```

    - char_append_center_incomplete:
```javascript

    "{:_^7}".format("Jhon")
    
    "_Jhon__"
```

    - multiple_params_stretch:
```javascript

    "{:<5} {:>8}".format("Jhon", "Mart")
    
    "Jhon      Mart"
```

    - multiple_params_join:
```javascript

    "{:>5} {:<8}".format("Jhon", "Mart")
    
    " Jhon Mart    "
```

    - overflow_srt_length_multiple_params:
```javascript

    "{:_<6} {:<28} {:>1} {:^9}".format("a22hhfdf123g4", "x  1 teste", "x2", "x3")
    
    "a22hhfdf123g4 x  1 teste                   x2    x3    "
```

    - param_and_string_combin:
```javascript

    "Olá {}, sua idade é {:_>5}".format("Jhon", '21')

    "Olá Jhon, sua idade é ___21"
```

    - center_ast:
```javascript

    "{:*^30}".format("centered")

    "***********centered***********"
```

    - thousands_separator:
```javascript

    "{:,}".format(1234567890)

    "1,234,567,890"
```

### Help us

[CONTRIBUTING](./CONTRIBUTING.md)
