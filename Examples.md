
# Examples

**Obs:The result expected is the same as Python**
---
All examples tested
---


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


    - overflow_srt_length_right:
```javascript

    "{:>3}".format("Gustavo")

    "Gustavo"
```

    - overflow_srt_length_left:
```javascript

    "{:<3}".format("Gustavo")

    "Gustavo"
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

    - align_center_incomplete:
```javascript

    "{:^6}".format("oii")

    " oii  "
```

    - align_center_complete:
```javascript

    "{:^7}".format("oii")

    "  oii  "
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

    - char_append_left:
```javascript

    "{:_<7}".format("Jhon")

    "Jhon___"
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

    - overflow_atrib:
```javascript

    "{:>5} {:<8}".format("Jhon", "Mart", "Lenss")

    " Jhon Mart    "
```

    - overflow_srt_length_multiple_params:
```javascript

    "{:_<6} {:<28} {:>1} {:^9}".format("a22hhfdf123g4", "x  1 teste", "x2", "x3")

    "a22hhfdf123g4 x  1 teste                   x2    x3    "
```


    - overflow_params:
```javascript

    "{:>5} {:<8}".format("Jhon")

    "Overflow of parameters greater than amount of values"
```

    - string_and_param_left_align:
```javascript

    "Olá {:<8}".format("Jhon")

    "Olá Jhon    "
```

    - string_and_param_right_align:
```javascript

    "Olá {:>8}".format("Jhon")

    "Olá     Jhon"
```

    - string_and_param_center_align:
```javascript

    "Olá {:^8}".format("Jhon")

    "Olá   Jhon  "
```

    - string_and_param_combine:
```javascript

    "Olá {:_>5}, sua idade é {}".format("Jhon", '21')

    "Olá _Jhon, sua idade é 21"
```

    - param_and_string_combin:
```javascript

    "Olá {}, sua idade é {:_>5}".format("Jhon", '21')

    "Olá Jhon, sua idade é ___21"
```

    - param_set_str:
```javascript

    "Minha idade é {1} e meu nome é {0}".format("Jhon", '21')

    "Minha idade é 21 e meu nome é Jhon"
```

    - combine_param_set_str_and_param:
```javascript

    "Minha idade é {1} e meu nome é {0}, tenho algo mais que {1}".format("Jhon",'21')

    "Minha idade é 21 e meu nome é Jhon, tenho algo mais que 21"
```

    - test_ref_fail:
```javascript

    "{:>2} {2}".format("x2", "x3")

    "Fail ref"
```

    - sintax_fail:
```javascript

    "{:+d} {:<4}".format(32, "x3")

    ":+d 32  "
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


