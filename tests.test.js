require('./index')


test('simples_change', () => {
  expect("{} {}"
    .format("Jhon", "Mart"))
    .toEqual("Jhon Mart")
})
test('one_arg_int', () => {
  expect("{} "
    .format(2))
    .toEqual("2 ")
})
test("one_arg_float", () => {
  expect("{} "
    .format(3.14))
    .toEqual("3.14 ")
})
test("one_arg_bool", () => {
  expect("{} "
    .format(true))
    .toEqual("true ")
})
test("multiple_type_arg", () => {
  expect("{} {} {}"
    .format(2, 3.14, true))
    .toEqual("2 3.14 true")
})
test("overflow_srt_length_right", () => {
  expect("{:>3}"
    .format("Gustavo"))
    .toEqual("Gustavo")
})
test("overflow_srt_length_left", () => {
  expect("{:<3}"
    .format("Gustavo"))
    .toEqual("Gustavo")
})
test("overflow_srt_length_center", () => {
  expect("{:^3}"
    .format("Gustavo"))
    .toEqual("Gustavo")
})
test("align_left", () => {
  expect("{:<6}"
    .format("oii"))
    .toEqual("oii   ")
})
test("align_right", () => {
  expect("{:>6}"
    .format("oii"))
    .toEqual("   oii")
})
test("align_center_incomplete", () => {
  expect("{:^6}"
    .format("oii"))
    .toEqual(" oii  ")
})
test("align_center_complete", () => {
  expect("{:^7}"
    .format("oii"))
    .toEqual("  oii  ")
})
test("crop", () => {
  expect("{:.7}"
    .format("Jonatas Martins"))
    .toEqual("Jonatas")
})
test("size_string", () => {
  expect("{:10}"
    .format("test"))
    .toEqual("test      ")
})
test("char_append_left", () => {
  expect("{:_<7}"
    .format("Jhon"))
    .toEqual("Jhon___")
})
test("char_append_right", () => {
  expect("{:_>7}"
    .format("Jhon"))
    .toEqual("___Jhon")
})
test("char_append_center_incomplete", () => {
  expect("{:_^7}"
    .format("Jhon"))
    .toEqual("_Jhon__")
})
test("multiple_params_stretch", () => {
  expect("{:<5} {:>8}"
    .format("Jhon", "Mart"))
    .toEqual("Jhon      Mart")
})
test("multiple_params_join", () => {
  expect("{:>5} {:<8}"
    .format("Jhon", "Mart"))
    .toEqual(" Jhon Mart    ")
})
test("overflow_atrib", () => {
  expect("{:>5} {:<8}"
    .format("Jhon", "Mart", "Lenss"))
    .toEqual(" Jhon Mart    ")
})
test("overflow_srt_length_multiple_params", () => {
  expect("{:_<6} {:<28} {:>1} {:^9}"
    .format("a22hhfdf123g4", "x  1 teste", "x2", "x3"))
    .toEqual("a22hhfdf123g4 x  1 teste                   x2    x3    ")
})
test("overflow_params", () => {
  expect("{:>5} {:<8}"
    .format("Jhon"))
    .toEqual("Overflow of parameters greater than amount of values")
})
test("string_and_param_left_align", () => {
  expect("Olá {:<8}"
    .format("Jhon"))
    .toEqual("Olá Jhon    ")
})
test("string_and_param_right_align", () => {
  expect("Olá {:>8}"
    .format("Jhon"))
    .toEqual("Olá     Jhon")
})
test("string_and_param_center_align", () => {
  expect("Olá {:^8}"
    .format("Jhon"))
    .toEqual("Olá   Jhon  ")
})
test("string_and_param_combine", () => {
  expect("Olá {:_>5}, sua idade é {}"
    .format("Jhon", '21'))
    .toEqual("Olá _Jhon, sua idade é 21")
})
test("param_and_string_combine", () => {
  expect("Olá {}, sua idade é {:_>5}"
    .format("Jhon", '21'))
    .toEqual("Olá Jhon, sua idade é ___21")
})
test("param_set_str", () => {
  expect("Minha idade é {1} e meu nome é {0}"
    .format("Jhon", '21'))
    .toEqual("Minha idade é 21 e meu nome é Jhon")
})
test("combine_param_set_str_and_param", () => {
  expect("Minha idade é {1} e meu nome é {0}, tenho algo mais que {1}"
    .format("Jhon", '21'))
    .toEqual("Minha idade é 21 e meu nome é Jhon, tenho algo mais que 21")
})
test("test_ref_fail", () => {
  expect("{:>2} {2}"
    .format("x2", "x3"))
    .toEqual("Fail ref")
})
test("sintax_fail", () => {
  expect("{:+d} {:<4}"
    .format(32, "x3"))
    .toEqual(":+d x3  ")
})
test("center_ast", () => {
  expect("{:*^30}"
    .format("centered"))
    .toEqual("***********centered***********")
})
test("thousands_separator", () => {
  expect("{:,}"
    .format(1234567890))
    .toEqual("1,234,567,890")
})
