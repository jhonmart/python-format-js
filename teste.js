require("./index.js");
let inicio = (new Date).getTime(),
    i = 0,
    limite = 1597;
console.log("Começou em:",inicio);

for(;i<limite;){
    "{} {}".format("Jhon", "Mart")
    "{} ".format(2)
    "{} ".format(3.14)
    "{} ".format(true)
    "{} {} {}".format(2, 3.14, true)
    "{:>3}".format("Gustavo")
    "{:<3}".format("Gustavo")
    "{:^3}".format("Gustavo")
    "{:<6}".format("oii")
    "{:>6}".format("oii")
    "{:^6}".format("oii")
    "{:^7}".format("oii")
    "{:.7}".format("Jonatas Martins")
    "{:10}".format("test")
    "{:_<7}".format("Jhon")
    "{:_>7}".format("Jhon")
    "{:_^7}".format("Jhon")
    "{:<5} {:>8}".format("Jhon", "Mart")
    "{:>5} {:<8}".format("Jhon", "Mart")
    "{:>5} {:<8}".format("Jhon", "Mart", "Lenss")

        "{:_<6} {:<28} {:>1} {:^9}".format(
            "a22hhfdf123g4",
            "x  1 teste",
            "x2",
            "x3"
        )


    try {
    } catch (e) {
        "{:>5} {:<8}".format("Jhon")
    }


    "Olá {:<8}".format("Jhon")
    "Olá {:>8}".format("Jhon")
    "Olá {:^8}".format("Jhon")
    "Olá {:_>5}, sua idade é {}".format("Jhon", "21")
    "Olá {}, sua idade é {:_>5}".format("Jhon", "21")
    "Minha idade é {1} e meu nome é {0}".format("Jhon", "21")
        "Minha idade é {1} e meu nome é {0}, tenho algo mais que {1}".format(
            "Jhon",
            "21"
        )


    try {
    } catch (e) {
        "{:>2} {2}".format("x2", "x3")
    }

    "{:+d} {:<4}".format(32, "x3")
    "{:*^30}".format("centered")

    "{:f}; {:f}".format(3.14, -3.14)
    "{: f}; {: f}".format(3.14, -3.14)
    "{:+f}; {:+f}".format(3.14, -3.14)
    "{:-f}; {:-f}".format(3.14, -3.14)
    "{:b}".format(42)
    "{:#b}".format(42)
    "{:o}".format(42)
    "{:#o}".format(42)
    "{:-o}".format(42)
    "{: o}".format(42)
    "{:+#o}".format(4233)
    "{:-#o}".format(-4233)
    "{:x}".format(42)
    "{:#x}".format(42)
    "{:#X}".format(42)
    "{:d}".format(42)
    "{:e}".format(4233)
    "{:E}".format(4233)
    "{:<15e}".format(4233)

    "{:%}".format(0.065)
    "{:g}".format('Hello World')
    "{:<5g}".format('T')
    "{:G}".format("Hello World")
    "{:,}".format(1234567890)

    try {
    } catch (e) {
        "{:a}".format(12345)
    }
    try {
    } catch (e) {
        "{:j}".format('less')
    }
    "{:.6} {}".format("sd", "alto");
    i++;
}

let fim = (new Date).getTime();
console.log("Terminou em",fim);
console.log("Tempo:",(fim-inicio)+"ms");