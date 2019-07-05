require("./index");

test("simples_change", () => {
    expect("{} {}".format("Jhon", "Mart")).toEqual("Jhon Mart");
});

test("one_arg_int", () => {
    expect("{} ".format(2)).toEqual("2 ");
});

test("one_arg_float", () => {
    expect("{} ".format(3.14)).toEqual("3.14 ");
});

test("one_arg_bool", () => {
    expect("{} ".format(true)).toEqual("true ");
});

test("multiple_type_arg", () => {
    expect("{} {} {}".format(2, 3.14, true)).toEqual("2 3.14 true");
});

test("overflow_srt_length_right", () => {
    expect("{:>3}".format("Gustavo")).toEqual("Gustavo");
});

test("overflow_srt_length_left", () => {
    expect("{:<3}".format("Gustavo")).toEqual("Gustavo");
});

test("overflow_srt_length_center", () => {
    expect("{:^3}".format("Gustavo")).toEqual("Gustavo");
});

test("align_left", () => {
    expect("{:<6}".format("oii")).toEqual("oii   ");
});

test("align_right", () => {
    expect("{:>6}".format("oii")).toEqual("   oii");
});

test("align_center_incomplete", () => {
    expect("{:^6}".format("oii")).toEqual(" oii  ");
});

test("align_center_complete", () => {
    expect("{:^7}".format("oii")).toEqual("  oii  ");
});

test("crop", () => {
    expect("{:.7}".format("Jonatas Martins")).toEqual("Jonatas");
});

test("size_string", () => {
    expect("{:10}".format("test")).toEqual("test      ");
});

test("char_append_left", () => {
    expect("{:_<7}".format("Jhon")).toEqual("Jhon___");
});

test("char_append_right", () => {
    expect("{:_>7}".format("Jhon")).toEqual("___Jhon");
});

test("char_append_center_incomplete", () => {
    expect("{:_^7}".format("Jhon")).toEqual("_Jhon__");
});

test("multiple_params_stretch", () => {
    expect("{:<5} {:>8}".format("Jhon", "Mart")).toEqual("Jhon      Mart");
});

test("multiple_params_join", () => {
    expect("{:>5} {:<8}".format("Jhon", "Mart")).toEqual(" Jhon Mart    ");
});

test("overflow_atrib", () => {
    expect("{:>5} {:<8}".format("Jhon", "Mart", "Lenss")).toEqual(
        " Jhon Mart    "
    );
});

test("overflow_srt_length_multiple_params", () => {
    expect(
        "{:_<6} {:<28} {:>1} {:^9}".format(
            "a22hhfdf123g4",
            "x  1 teste",
            "x2",
            "x3"
        )
    ).toEqual("a22hhfdf123g4 x  1 teste                   x2    x3    ");
});

test("overflow_params", () => {
    var captured = null;
    try {
        expect("{:>5} {:<8}".format("Jhon")).toEqual(null);
    } catch (e) {
        captured = 'Fail';
    }
    expect(captured).toBe(`Fail`);
});

test("string_and_param_left_align", () => {
    expect("Olá {:<8}".format("Jhon")).toEqual("Olá Jhon    ");
});

test("string_and_param_right_align", () => {
    expect("Olá {:>8}".format("Jhon")).toEqual("Olá     Jhon");
});

test("string_and_param_center_align", () => {
    expect("Olá {:^8}".format("Jhon")).toEqual("Olá   Jhon  ");
});

test("string_and_param_combine", () => {
    expect("Olá {:_>5}, sua idade é {}".format("Jhon", "21")).toEqual(
        "Olá _Jhon, sua idade é 21"
    );
});
test("param_and_string_combine", () => {
    expect("Olá {}, sua idade é {:_>5}".format("Jhon", "21")).toEqual(
        "Olá Jhon, sua idade é ___21"
    );
});
test("param_set_str", () => {
    expect("Minha idade é {1} e meu nome é {0}".format("Jhon", "21")).toEqual(
        "Minha idade é 21 e meu nome é Jhon"
    );
});
test("combine_param_set_str_and_param", () => {
    expect(
        "Minha idade é {1} e meu nome é {0}, tenho algo mais que {1}".format(
            "Jhon",
            "21"
        )
    ).toEqual("Minha idade é 21 e meu nome é Jhon, tenho algo mais que 21");
});

test("test_ref_fail", () => {
    var captured = null;
    try {
        expect("{:>2} {2}".format("x2", "x3")).toEqual(null);
    } catch (e) {
        captured = 'Fail';
    }
    expect(captured).toBe(`Fail`);
});

test("sintax_fail", () => {
    expect("{:+d} {:<4}".format(32, "x3")).toEqual(
        "x3                              x3  "
    );
});

test("center_ast", () => {
    expect("{:*^30}".format("centered")).toEqual(
        "***********centered***********"
    );
});

test("float", () => {
    expect("{:f}; {:f}".format(3.14, -3.14)).toEqual("3.140000; -3.140000");
});

test("float_space", () => {
    expect("{: f}; {: f}".format(3.14, -3.14)).toEqual(" 3.140000; -3.140000");
});
test("float_align", () => {
    expect("{:<15f}; {: f}".format(3.14, -3.14)).toEqual("3.140000       ; -3.140000");
});

test("float_plus", () => {
    expect("{:+f}; {:+f}".format(3.14, -3.14)).toEqual("+3.140000; -3.140000");
});

test("float_less", () => {
    expect("{:-f}; {:-f}".format(3.14, -3.14)).toEqual("3.140000; -3.140000");
});

test("binary", () => {
    expect("{:b}".format(42)).toEqual("101010");
});
test("binary_align", () => {
    expect("{:>4b}".format(5)).toEqual(" 101");
});

test("binary_mask", () => {
    expect("{:#b}".format(42)).toEqual("0b101010");
});

test("octal", () => {
    expect("{:o}".format(42)).toEqual("52");
});

test("octal_mask", () => {
    expect("{:#o}".format(42)).toEqual("0o52");
});

test("octal_mask_sign", () => {
    expect("{:-o}".format(42)).toEqual("+52");
});

test("octal_mask_space", () => {
    expect("{: o}".format(42)).toEqual(" 52");
});

test("number_octal_positive", () => {
    expect("{:+#o}".format(4233)).toEqual("+0o10211");
});

test("number_octal_negative", () => {
    expect("{:-#o}".format(-4233)).toEqual("-0o10211");
});

test("hexadecimal", () => {
    expect("{:x}".format(42)).toEqual("2a");
});

test("hexadecimal_mask", () => {
    expect("{:#x}".format(42)).toEqual("0x2a");
});

test("hexadecimal_mask_upper_case", () => {
    expect("{:#X}".format(42)).toEqual("0X2A");
});

test("decimal", () => {
    expect("{:d}".format(42)).toEqual("42");
});

test("exp", () => {
    expect("{:e}".format(4233)).toEqual("4.233e+3");
});

test("exp_upper_case", () => {
    expect("{:E}".format(4233)).toEqual("4.233E+3");
});

test("exp_size_over", () => {
    expect("{:<15e}".format(4233)).toEqual("4.233e+3       ");
});


test("percent", () => {
    expect("{:%}".format(0.065)).toEqual("6.500000%");
});

test("geral", () => {
    expect("{:g}".format('Hello World')).toEqual("Hello World");
});

test("geral_align", () => {
    expect("{:<5g}".format('T')).toEqual("T    ");
});

test("geral_upper_case", () => {
    expect("{:G}".format("Hello World")).toEqual("HELLO WORLD");
});

test("thousands_separator", () => {
    expect("{:,}".format(1234567890)).toEqual("1,234,567,890");
});

test("fail_lett", () => {
    var captured = null;
    try {
        expect("{:a}".format(12345)).toEqual(null);
    } catch (e) {
        captured = 'Fail';
    }
    expect(captured).toBe(`Fail`);
});

test("fail_lett_text", () => {
    var captured = null;
    try {
        expect("{:j}".format('less')).toEqual(null);
    } catch (e) {
        captured = 'Fail';
    }
    expect(captured).toBe(`Fail`);
});

//more tests

test("thousands_separator and other", () => {
    expect("{:.6} {}".format("sd", "alto")).toEqual("sd alto");
});
