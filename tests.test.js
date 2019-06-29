require('./index')


test('Formatação de alinhamento', () => {
  expect("{:<6} {:<28} {:>5} {:^9}".format("abs", "x  1 teste", "x2", "x3"))
    .toEqual('abs    x  1 teste                      x2    x3    ')
})

test('Formatação de alinhamento 2', () => {
  expect("{:<6} {:^28} {:>5} {:^9}".format("abs", "x  1 teste", "x2", "x3"))
    .toEqual('abs             x  1 teste             x2    x3    ')
})

test("Formatação de alinhamento com excesso de caracteres", () => {
  expect("{:<6} {:<28} {:>5} {:^9}".format("absssss", "x  1 teste", "x2", "x3"))
    .toEqual('absssss x  1 teste                      x2    x3    ')
})

test("Formatação de alinhamento com mais paramentros: '_'", () => {
  expect("{:_<6} {:<28} {:>5} {:^9}".format("abs", "x  1 teste", "x2", "x3"))
    .toEqual('abs___ x  1 teste                      x2    x3    ')
})

test("Formatação de alinhamento 3", () => {
  expect("{:_<6} {:>28} {:>5} {:^9}".format("abs", "x  1 teste", "x2", "x3"))
    .toEqual('abs___                   x  1 teste    x2    x3    ')
})