require("./index");

test("Simples Change", () => {
  expect("My fisrt name is {} and last {}"
    .format("Jhon", "Mart"))
  .toEqual("My fisrt name is Jhon and last Mart");
});

test("Advance Change Array", () => {
  expect("My name is {0} and i have {1} years old!"
    .format(["Jônatas", 21]))
  .toEqual("My name is Jônatas and i have 21 years old!");
});

test("Advance Change Object", () => {
  expect("Your name is {name} and you have {age} years old!"
    .format({name: "Jônatas", age: 21}))
  .toEqual("Your name is Jônatas and you have 21 years old!");
});

test("One Argument type Number", () => {
  expect("You have {} things"
    .format(2))
  .toEqual("You have 2 things");
});

test("One Argument type Float", () => {
  expect("{} ".format(3.14)).toEqual("3.14 ");
});

test("One Argument type Boolean", () => {
  expect("{} ".format(true)).toEqual("true ");
});

test("Multiple type Argument", () => {
  expect("{} {} {}".format(2, 3.14, true)).toEqual("2 3.14 true");
});

test("Overflow String Align Right", () => {
  expect("{:>3}".format("Gustavo")).toEqual("Gustavo");
});

test("Overflow String Align Left", () => {
  expect("{:<3}".format("Gustavo")).toEqual("Gustavo");
});

test("Overflow String Align Center", () => {
  expect("{:^3}".format("Gustavo")).toEqual("Gustavo");
});

test("Align Left", () => {
  expect("{:<6}".format("oii")).toEqual("oii   ");
});

test("Align Right", () => {
  expect("{:>6}".format("oii")).toEqual("   oii");
});

test("Align Center Incomplete", () => {
  expect("{:^6}".format("oii")).toEqual(" oii  ");
});

test("Align Center Complete", () => {
  expect("{:^7}".format("oii")).toEqual("  oii  ");
});

test("Crop", () => {
  expect("{:.7}".format("Jonatas Martins")).toEqual("Jonatas");
});

test("Size String", () => {
  expect("{:10}".format("test")).toEqual("test      ");
});

test("Char Append Left", () => {
  expect("{:_<7}".format("Jhon")).toEqual("Jhon___");
});

test("Char Append Right", () => {
  expect("{:_>7}".format("Jhon")).toEqual("___Jhon");
});

test("Char Append Center Incomplete", () => {
  expect("{:_^7}".format("Jhon")).toEqual("_Jhon__");
});

test("Multiple Params Stretch", () => {
  expect("{:<5} {:>8}".format("Jhon", "Mart")).toEqual("Jhon      Mart");
});

test("Multiple Params Join", () => {
  expect("{:>5} {:<8}".format("Jhon", "Mart")).toEqual(" Jhon Mart    ");
});

test("Overflow Atrib", () => {
  expect("{:>5} {:<8}".format("Jhon", "Mart", "Lenss")).toEqual(
    " Jhon Mart    "
  );
});

test("Overflow String length Multiple Params", () => {
  expect(
    "{:_<6} {:<28} {:>1} {:^9}".format(
      "a22hhfdf123g4",
      "x  1 teste",
      "x2",
      "x3"
    )
  ).toEqual("a22hhfdf123g4 x  1 teste                   x2    x3    ");
});

test("Overflow params", () => {
  var captured = null;
  try {
    expect("{:>5} {:<8}".format("Jhon")).toEqual(null);
  } catch(e) {
    captured = 'Fail';
  }
  expect(captured).toBe(`Fail`);
});

test("String and param left align", () => {
  expect("Olá {:<8}".format("Jhon")).toEqual("Olá Jhon    ");
});

test("String and param right align", () => {
  expect("Olá {:>8}".format("Jhon")).toEqual("Olá     Jhon");
});

test("String and param center align", () => {
  expect("Olá {:^8}".format("Jhon")).toEqual("Olá   Jhon  ");
});

test("String align mark and Number", () => {
  expect("Olá {:_>5}, sua idade é {}".format("Jhon", 21)).toEqual(
    "Olá _Jhon, sua idade é 21"
  );
});
test("Number align mark and String", () => {
  expect("Olá {}, sua idade é {:_>5}".format("Jhon", 21)).toEqual(
    "Olá Jhon, sua idade é ___21"
  );
});
test("Reference Position Definition", () => {
  expect("Minha idade é {1} e meu nome é {0}".format("Jhon", "21")).toEqual(
    "Minha idade é 21 e meu nome é Jhon"
  );
});
test("Reference Position Definition Multiple Type", () => {
  expect(
    "Minha idade é {1} e meu nome é {0}, tenho algo mais que {1}".format(
      "Jhon",
      21
    )
  ).toEqual("Minha idade é 21 e meu nome é Jhon, tenho algo mais que 21");
});

test("Ref Not Defined", () => {
    var captured = null;
    try {
      expect("{:>2} {2}".format("x2", "x3")).toEqual(null);
    } catch(e) {
      captured = 'Fail';
    }
    expect(captured).toBe(`Fail`);
});

test("Reference var and align", () => {
  expect("{:+d} {:<4}".format(32, "x3")).toEqual(
    "+32 x3  "
  );
});

test("Right answer from above test and Reference var and align of set var", () => {
  expect("{:+d} {1:<4}".format(32, "x3")).toEqual(
    "+32 x3  "
  );
});

test("Center Ast", () => {
  expect("{:*^30}".format("centered")).toEqual(
    "***********centered***********"
  );
});

test("Float", () => {
  expect("{:f}; {:f}".format(3.14, -3.14)).toEqual("3.140000; -3.140000");
});

test("Float Space", () => {
  expect("{: f}; {: f}".format(3.14, -3.14)).toEqual(" 3.140000; -3.140000");
});
test("Float Align", () => {
  expect("{:<15f}; {: f}".format(3.14, -3.14)).toEqual("3.140000       ; -3.140000");
});

test("Float Plus", () => {
  expect("{:+f}; {:+f}".format(3.14, -3.14)).toEqual("+3.140000; -3.140000");
});

test("Float Less", () => {
  expect("{:-f}; {:-f}".format(3.14, -3.14)).toEqual("3.140000; -3.140000");
});

test("Number Simple", () => {
  expect("{:n} é maior que {:n} ".format(3.14, 21)).toEqual("3.14 é maior que 21 ");
});

test("Binary", () => {
  expect("{:b}".format(42)).toEqual("101010");
});
test("Binary Align", () => {
  expect("{:>4b}".format(5)).toEqual(" 101");
});

test("Binary Mask", () => {
  expect("{:#b}".format(42)).toEqual("0b101010");
});

test("Octal", () => {
  expect("{:o}".format(42)).toEqual("52");
});

test("Octal Mask", () => {
  expect("{:#o}".format(42)).toEqual("0o52");
});

test("Octal Mask Sign", () => {
  expect("{:-o}".format(42)).toEqual("+52");
});

test("Octal Mask Space", () => {
  expect("{: o}".format(42)).toEqual(" 52");
});

test("Number Octal Positive", () => {
  expect("{:+#o}".format(4233)).toEqual("+0o10211");
});

test("Number Octal Negative", () => {
  expect("{:-#o}".format(-4233)).toEqual("-0o10211");
});

test("Hexadecimal", () => {
  expect("{:x}".format(42)).toEqual("2a");
});

test("Hexadecimal Mask", () => {
  expect("{:#x}".format(42)).toEqual("0x2a");
});

test("Hexadecimal Mask Upper Case", () => {
  expect("{:#X}".format(42)).toEqual("0X2A");
});

test("Decimal Number", () => {
  expect("{:d}".format(42)).toEqual("42");
});

test("Exp", () => {
  expect("{:e}".format(4233)).toEqual("4.233e+3");
});

test("Exp Upper Case", () => {
  expect("{:E}".format(4233)).toEqual("4.233E+3");
});

test("Exp Size Over", () => {
  expect("{:<15e}".format(4233)).toEqual("4.233e+3       ");
});


test("Percent", () => {
  expect("{:%}".format(0.065)).toEqual("6.500000%");
});

test("All data", () => {
  expect("{:g}".format('Hello World')).toEqual("Hello World");
});

test("Align All", () => {
  expect("{:<5g}".format('T')).toEqual("T    ");
});

test("All Upper Case", () => {
  expect("{:G}".format("Hello World")).toEqual("HELLO WORLD");
});

test("Thousands Separator", () => {
  expect("{:,}".format(1234567890)).toEqual("1,234,567,890");
});

test("Fail char", () => {
    var captured = null;
    try {
      expect("{:a}".format(12345)).toEqual(null);
    } catch(e) {
      captured = 'Fail';
    }
    expect(captured).toBe(`Fail`);
});

test("Fail char not set", () => {
    var captured = null;
    try {
      expect("{:j}".format('less')).toEqual(null);
    } catch(e) {
      captured = 'Fail';
    }
    expect(captured).toBe(`Fail`);
});