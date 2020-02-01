"use strict"
Object.defineProperty(String.prototype, 'format', {
            value: function(...param) {
                    let e = this, // Entrada
                        i = 0,
                        removeStr = [], // Array de ajuda para remover valores já usados
                        srtSpc = e.match(/({.*?})/g), // Separação de cada mascara
                        failRun,
                        elemForm = (mask, ...el) => {
                            if (!mask.includes('{')) return mask;

                            mask.match(/({.*?})/g)
                                .map(it_mk => {
                                    let bs_mk = it_mk.replace(/[}{]/g, '');

                                    let params = +bs_mk.slice(1) && !bs_mk.includes('.') ?
                                        +bs_mk.slice(1) :
                                        /:(\D)?((\d+)(\D)(\d+)?|(\D)*?(\d+))/g.exec(bs_mk),
                                        last_lng = params.length - 1;

                                    if (typeof params == "number") mask = mask.replace(it_mk, " ".repeat(params)
                                        .replace(RegExp(`.{${el[i].length}}`), el[i]));
                                    else {
                                        let p1 = params[1],
                                            fill_elem = ([...
                                                '<^>.'
                                            ].includes(p1) ? ' ' : p1),
                                            sz_sp = (+params[last_lng]) - el[i].length;

                                        sz_sp = sz_sp < 0 ? el[i].length - 1 : sz_sp;
                                        let space = !p1.includes('.') ? fill_elem.repeat(sz_sp) : '',
                                            elem = [space, el[i]],
                                            srt_crop = el[i].match(/(\d+)([.])(\d+)/g) ? (+el[i]).toFixed(+params[last_lng]) : el[i].slice(0, +params[last_lng]),
                                            space_c = fill_elem.repeat(+params[last_lng]),
                                            num = Math.floor((space_c.length - el[i].length) / 2),
                                            str_pos = num > 0 ? fill_elem.repeat(num) + el[i] : '',
                                            elem_center = space_c.replace(RegExp(`.{${str_pos.length || sz_sp}}`), str_pos);

                                        i++;
                                        mask = mask.replace(it_mk, (params.includes('>') ? elem : [...
                                                '>^.'
                                            ].filter(ind => params.includes(ind)).length < 1 || (+it_mk.slice(1)) > 0 ? elem.reverse() : // <
                                            params.includes('^') ? [elem_center] : [srt_crop]).join(''));
                                    }
                                });

                            return mask;
                        },
                        elemLetter = (lett, pE, nth) => {
                            let lett_last = lett[lett.length - 1],
                                pad = {
                                    for: { n: 10, d: 10, x: 16, X: 16, o: 8, b: 2 },
                                    mask: { n: '', d: '', x: '0x', X: '0X', o: '0o', b: '0b', '': '' }
                                },
                                nth_pers = nth.replace(/[eEfFgGdxXobn#%]/g, ''),
                                val;

                            if (lett_last) { // Verificar se tem Letra
                                if (lett_last.toLowerCase().includes('f')) {
                                    let exp = +str[pE] > 0 ?
                                        nth.includes(' ') ? ' ' :
                                        nth.includes('+') ? '+' : '' : '';

                                    val = exp + (parseFloat(str[pE]).toFixed(6));
                                } else if ([...
                                        'dxXobn'
                                    ].includes(lett_last)) {
                                    let op = (+str[pE]) > 0 ? // Numero é positivo
                                        nth.includes(' ') ? ' ' : // Marcador é espaço e numero é positivo
                                        nth.includes('+') ? '+' : // Marcador é positivo e numero é positivo
                                        nth.includes('-') ? '+' : // Marcador é negativo e numero é positivo
                                        '' : // Marcador é negativo e numero também
                                        '-'; // Numero negativo

                                    val = op + (nth.includes('#') ? pad.mask[lett_last] : '') +
                                        (+str[pE]).toString(pad.for[lett_last]).replace('-', ''); // d na ultima posição procura a formula e mostra seu resultado
                                    val = nth.includes('X') ? val.toUpperCase() : val; // Caixa Alta (FONTE)
                                } else if (lett_last.toLowerCase() == 'g') {
                                    val = lett_last == 'G' ? str[pE].toUpperCase() : str[pE];
                                } else { //if(lett_last.toLowerCase()=='e'){
                                    val = (+str[pE]).toExponential();
                                    val = nth.includes('E') ? val.toUpperCase() : val;
                                }

                                val = !lett[5] ? val : elemForm(nth_pers, val); // Change align
                                e = e.replace(nth, val); // Change for value
                                removeStr.push(pE);
                            }
                        };

                    if (typeof param[0] == "object") {
                        srtSpc.map(ix => e = e.replace(ix, param[0][/{.*?(\w+)?}/.exec(ix)[1]]));
                        return e;
                    }

                    let searchRefs = srtSpc.map(el => { let v = /{(\w+)/.exec(el); return v ? +v[1] : v });

                    if (!searchRefs.filter(p => isNaN(+p) || p == null).length) {
                        searchRefs.map((ix, id) => e = e.replace(srtSpc[id], param[ix]));
                        return e;
                    }

                    let str = param.map(el => el + ''); // toString

                    let paramStr = [],
                        refParam = [];

                    srtSpc.map(p => {
                        let isNum = /{(\d+):?/.exec(p);
                        if (isNum) {
                            if (+isNum[1] >= str.length) paramStr.push(1);
                            else {
                                refParam.push(1);
                                let resp = p.replace(isNum[1], '').format(str[isNum[1]]);
                                e = e.replace(p, resp);
                            }
                        }
                    });

                    if (paramStr.length)
                        failRun = `ValueError: cannot switch from automatic field numbering to manual field specification`;
                    else if (srtSpc.length - refParam.length > str.length || srtSpc.length - refParam.length >= str.length && refParam.length)
                        failRun = `IndexError: tuple index out of range`;
                    else {
                        srtSpc.map((nth, pE) => {
                            let lett = /{(\d+)?:?([+_-])?(\d+)?(\W|_)?(\d+)?([eEfFdxXobcGgn])?}/.exec(nth),
                                expt = /{.*?([a-zA-Z])?}/.exec(nth);

                            if (expt && expt[1] && !lett && !['eEfFdxXobcGg'].includes(expt)) {
                                failRun = `ValueError: Unknown format code '${expt[1]}' for object of type '${typeof (+str[pE] || str[pE])}'`;
                            } else if (nth.includes('%')) {
                                let val = (+str[pE] * 100).toFixed(6) + '%';
                                e = e.replace(nth, val); // Change for value
                            } else if (lett && [',', '_'].includes(lett[4]) && +str[pE]) { // Separador deve existir e valor de atributo de ser numerico
                                let div = str[pE].split(/(?=(?:...)*$)/).join(lett[4]);
                                e = e.replace(nth, div); // Change for value
                                removeStr.push(pE);
                            } else if (lett && (+lett[5]) <= str[pE].length && !lett.includes('.')) { // Mascara menor do que o valor
                                e = e.replace(nth, str[pE]); // Change for value
                                removeStr.push(pE);
                            } else if (lett && lett[3] && !lett[lett.length - 1]) {
                                e = e.replace(nth, elemForm(nth, str[pE])); // Change for value
                                removeStr.push(pE);
                            } else if (lett && !lett[5] && !lett[6] || lett && lett[1]) { // Change default
                                e = e.replace(nth, str[pE]); // Change for value
                                removeStr.push(pE);
                            } else if (lett) {
                                elemLetter(lett, pE, nth);
                            }
                        });
                    }

                    if (failRun) throw new Error(`Traceback (most recent call last):\n\t"${e}".format(${param.map(el_at => typeof el_at == "string" ? `"${el_at}"` : el_at).join(', ')})\n` + failRun);
    else {
      removeStr.reverse().map(pE => str.splice(pE, 1));
      return elemForm(e, ...str);
    }
  }
});