const A = require('./index.js');

let tests =
    {
        simples_change: {
            test:   "{} {}"
                    .format("Jhon", "Mart"),
            ask: "Jhon Mart"
        },
        one_arg_int: {
            test:   "{} "
                    .format(2),
            ask: "2 "
        },
        one_arg_float: {
            test:   "{} "
                    .format(3.14),
            ask: "3.14 "
        },
        one_arg_bool: {
            test:   "{} "
                    .format(true),
            ask: "true "
        },
        multiple_type_arg: {
            test:   "{} {} {}"
                    .format(2, 3.14, true),
            ask: "2 3.14 true"
        },
        overflow_srt_length_right: {
            test:   "{:>3}"
                    .format("Gustavo"),
            ask: "Gustavo"
        },
        overflow_srt_length_left: {
            test:   "{:<3}"
                    .format("Gustavo"),
            ask: "Gustavo"
        },
        overflow_srt_length_center: {
            test:   "{:^3}"
                    .format("Gustavo"),
            ask: "Gustavo"
        },
        align_left: {
            test:   "{:<6}"
                    .format("oii"),
            ask: "oii   "
        },
        align_right: {
            test:   "{:>6}"
                    .format("oii"),
            ask: "   oii"
        },
        align_center_incomplete: {
            test:   "{:^6}"
                    .format("oii"),
            ask: " oii  "
        },
        align_center_complete: {
            test:   "{:^7}"
                    .format("oii"),
            ask: "  oii  "
        },
        crop: {
            test:   "{:.7}"
                    .format("Jonatas Martins"),
            ask: "Jonatas"
        },
        size_string: {
            test:   "{:10}"
                    .format("test"),
            ask: "test      "
        },
        char_append_left: {
            test:   "{:_<7}"
                    .format("Jhon"),
            ask: "Jhon___"
        },
        char_append_right: {
            test:   "{:_>7}"
                    .format("Jhon"),
            ask: "___Jhon"
        },
        char_append_center_incomplete: {
            test:   "{:_^7}"
                    .format("Jhon"),
            ask: "_Jhon__"
        },
        char_append_center_complete: {
            test:   "{:_^8}"
                    .format("Jhon"),
            ask: "__Jhon__"
        },
        multiple_params_stretch: {
            test:   "{:<5} {:>8}"
                    .format("Jhon", "Mart"),
            ask: "Jhon      Mart"
        },
        multiple_params_join: {
            test:   "{:>5} {:<8}"
                    .format("Jhon", "Mart"),
            ask: " Jhon Mart    "
        },
        overflow_atrib: {
            test:   "{:>5} {:<8}"
                    .format("Jhon", "Mart","Lenss"),
            ask: " Jhon Mart    "
        },
        overflow_srt_length_multiple_params: {
            test:   "{:_<6} {:<28} {:>1} {:^9}"
                    .format("a22hhfdf123g4", "x  1 teste", "x2", "x3"),
            ask: "a22hhfdf123g4 x  1 teste                   x2    x3    "
        },
        overflow_params: {
            test:   "{:>5} {:<8}"
                    .format("Jhon"),
            ask: "Overflow of parameters greater than amount of values"
        },
        string_and_param_left_align: {
            test:   "Olá {:<8}"
                    .format("Jhon"),
            ask: "Olá Jhon    "
        },
        string_and_param_right_align: {
            test:   "Olá {:>8}"
                    .format("Jhon"),
            ask: "Olá     Jhon"
        },
        string_and_param_center_align: {
            test:   "Olá {:^8}"
                    .format("Jhon"),
            ask: "Olá   Jhon  "
        },
        string_and_param_combine: {
            test:   "Olá {:_>5}, sua idade é {}"
                    .format("Jhon", '21'),
            ask: "Olá _Jhon, sua idade é 21"
        },
        param_and_string_combine: {
            test:   "Olá {}, sua idade é {:_>5}"
                    .format("Jhon", '21'),
            ask: "Olá Jhon, sua idade é ___21"
        },
        param_set_str: {
            test:   "Minha idade é {1} e meu nome é {0}"
                    .format("Jhon", '21'),
            ask: "Minha idade é 21 e meu nome é Jhon"
        },
        combine_param_set_str_and_param: {
            test:   "Minha idade é {1} e meu nome é {0}, tenho algo mais que {1}"
                    .format("Jhon", '21'),
            ask: "Minha idade é 21 e meu nome é Jhon, tenho algo mais que 21"
        },
        test_ref_fail: {
            test:   "{:>2} {2}"
                    .format("x2", "x3"),
            ask: "Fail ref"
        },
        sintax_fail: {
            test:   "{:+d} {:<4}"
                    .format(32, "x3"),
            ask: "x3                              x3  "
        },
        center_ast: {
            test:   "{:*^30}"
                    .format("centered"),
            ask: "***********centered***********"
        },
        float: {
            test:   "{:f}; {:f}"
                    .format(3.14, -3.14),
            ask: "3.140000; -3.140000"
        },
        float_space: {
            test:   "{: f}; {: f}"
                    .format(3.14, -3.14),
            ask: " 3.140000; -3.140000"
        },
        float_plus: {
            test:   "{:+f}; {:+f}"
                    .format(3.14, -3.14),
            ask: "+3.140000; -3.140000"
        },
        float_less: {
            test:   "{:-f}; {:-f}"
                    .format(3.14, -3.14),
            ask: "3.140000; -3.140000"
        },
        binary: {
            test:   "{:b}"
                    .format(42),
            ask: "101010"
        },
        binary_mask: {
            test:   "{:#b}"
                    .format(42),
            ask: "0b101010"
        },
        octal: {
            test:   "{:o}"
                    .format(42),
            ask: "52"
        },
        octal_mask: {
            test:   "{:#o}"
                    .format(42),
            ask: "0o52"
        },
        hexadecimal: {
            test:   "{:x}"
                    .format(42),
            ask: "2a"
        },
        hexadecimal_mask: {
            test:   "{:#x}"
                    .format(42),
            ask: "0x2a"
        },
        hexadecimal_mask_upper_case: {
            test:   "{:#X}"
                    .format(42),
            ask: "0X2A"
        },
        decimal: {
            test:   "{:d}"
                    .format(42),
            ask: "42"
        },
        exp: {
            test:   "{:e}"
                    .format(4233),
            ask: "4.233e+3"
        },
        exp_size_over: {
            test:   "{:<15e}"
                    .format(4233),
            ask: "4.233e+3       "
        },
        exp_upper_case: {
            test:   "{:E}"
                    .format(4233),
            ask: "4.233E+3"
        },
        percent: {
            test:   "{:%}"
                    .format(.065),
            ask: "6.500000%"
        },
        number_octal_positive: {
            test:   "{:+#o}"
                    .format(4233),
            ask: "+0o10211"
        },
        number_octal_negative: {
            test:   "{:+#o}"
                    .format(-4233),
            ask: "-0o10211"
        },
        thousands_separator: {
            test:   "{:,}"
                    .format(1234567890),
            ask: "1,234,567,890"
        },
    }, close = {
        success:0,
        fail:0
    };


for(let tp in tests){
    let result = tests[tp].test==tests[tp].ask;
    !result? console.log("Valid: ",result, "-".repeat(result? 1 : 10),"Test: ", tp) : '';
    if(!result) console.log(`
        Resposta: ${tests[tp].test}
        `)
    result? close.success++ : close.fail++;
}

let all = close.success+close.fail;

console.log(`
    ${close.success} sucessos
    ${close.fail} falhas

    ${all} testes realizados.
`);
