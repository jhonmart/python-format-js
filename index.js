"use strict"
Object.defineProperty(String.prototype, 'format', {
  value: function(...param) {
    let input = this,
        count = 0,
        removeStr = [],
        placeholder = input.match(/({.*?})/g),
        failRun,
        simpleFormat = (mask, ...values) => {
            if (!mask.includes('{')) return mask;

            mask.match(/({.*?})/g)
                .map(maskItem => {
                    let base_mask = maskItem.replace(/[}{]/g, '');

                    let params = +base_mask.slice(1) && !base_mask.includes('.') ?
                        +base_mask.slice(1) :
                        /:(\D)?((\d+)(\D)(\d+)?|(\D)*?(\d+))/g.exec(base_mask),
                        custom_param_index = params.length - 1;

                    if (typeof params == "number") mask = mask.replace(maskItem, " ".repeat(params)
                        .replace(RegExp(`.{${values[count].length}}`), values[count]));
                    else {
                        let firstParam = params[1],
                            fill_elem = ([...
                                '<^>.'
                            ].includes(firstParam) ? ' ' : firstParam),
                            sz_sp = (+params[custom_param_index]) - values[count].length;

                        sz_sp = sz_sp < 0 ? values[count].length - 1 : sz_sp;
                        let space = !firstParam.includes('.') ? fill_elem.repeat(sz_sp) : '',
                            elem = [space, values[count]],
                            srt_crop = values[count].match(/(\d+)([.])(\d+)/g) ? (+values[count]).toFixed(+params[custom_param_index]) : values[count].slice(0, +params[custom_param_index]),
                            custom_repeat = fill_elem.repeat(+params[custom_param_index]),
                            count_repeat = Math.floor((custom_repeat.length - values[count].length) / 2),
                            str_positon = count_repeat > 0 ? fill_elem.repeat(count_repeat) + values[count] : '',
                            elem_center = custom_repeat.replace(RegExp(`.{${str_positon.length || sz_sp}}`), str_positon);

                        count++;
                        mask = mask.replace(maskItem, (params.includes('>') ? elem : [...
                                '>^.'
                            ].filter(ind => params.includes(ind)).length < 1 || (+maskItem.slice(1)) > 0 ? elem.reverse() :
                            params.includes('^') ? [elem_center] : [srt_crop]).join(''));
                    }
                });

            return mask;
        },
        elemletterser = (letters, position, mask_item) => {
            let letters_last = letters[letters.length - 1],
                pad = {
                    for: { n: 10, d: 10, x: 16, X: 16, o: 8, b: 2 },
                    mask: { n: '', d: '', x: '0x', X: '0X', o: '0o', b: '0b', '': '' }
                },
                mask_item_format = mask_item.replace(/[eEfFgGdxXobn#%]/g, ''),
                outValue;

            if (letters_last) {
                if (letters_last.toLowerCase().includes('f')) {
                    let exp = +str[position] > 0 ?
                        mask_item.includes(' ') ? ' ' :
                        mask_item.includes('+') ? '+' : '' : '';

                    outValue = exp + (parseFloat(str[position]).toFixed(6));
                } else if ([...
                        'dxXobn'
                    ].includes(letters_last)) {
                    let op = (+str[position]) > 0 ?
                        mask_item.includes(' ') ? ' ' :
                        mask_item.includes('+') ? '+' :
                        mask_item.includes('-') ? '+' :
                        '' :
                        '-';

                    outValue = op + (mask_item.includes('#') ? pad.mask[letters_last] : '') +
                        (+str[position]).toString(pad.for[letters_last]).replace('-', '');
                    outValue = mask_item.includes('X') ? outValue.toUpperCase() : outValue;
                } else if (letters_last.toLowerCase() == 'g') {
                    outValue = letters_last == 'G' ? str[position].toUpperCase() : str[position];
                } else {
                    outValue = (+str[position]).toExponential();
                    outValue = mask_item.includes('E') ? outValue.toUpperCase() : outValue;
                }

                outValue = !letters[5] ? outValue : simpleFormat(mask_item_format, outValue);
                input = input.replace(mask_item, outValue);
                removeStr.push(position);
            }
        };

    if (!placeholder) {
        return input;
    }

    if (typeof param[0] == "object") {
        placeholder.map(ix => input = input.replace(ix, param[0][/{.*?(\w+)?}/.exec(ix)[1]]));
        return input;
    }

    let searchRefs = placeholder.map(el => { let v = /{(\w+)/.exec(el); return v ? +v[1] : v });

    if (!searchRefs.filter(p => isNaN(+p) || p == null).length) {
        searchRefs.map((ix, id) => input = input.replace(placeholder[id], param[ix]));
        return input;
    }

    let str = param.map(el => el + '');

    let paramStr = [],
        refParam = [];

    placeholder.map(p => {
        let isNum = /{(\d+):?/.exec(p);
        if (isNum) {
            if (+isNum[1] >= str.length) paramStr.push(1);
            else {
                refParam.push(1);
                let resp = p.replace(isNum[1], '').format(str[isNum[1]]);
                input = input.replace(p, resp);
            }
        }
    });

    if (paramStr.length)
        failRun = `ValueError: cannot switch from automatic field numbering to manual field specification`;
    else if (placeholder.length - refParam.length > str.length || placeholder.length - refParam.length >= str.length && refParam.length)
        failRun = `IndexError: tuple index out of range`;
    else {
        placeholder.map((mask_item, position) => {
            let letters = /{(\d+)?:?([+_-])?(\d+)?(\W|_)?(\d+)?([eEfFdxXobcGgn])?}/.exec(mask_item),
                expt = /{.*?([a-zA-Z])?}/.exec(mask_item);

            if (expt && expt[1] && !letters && !['eEfFdxXobcGg'].includes(expt)) {
                failRun = `ValueError: Unknown format code '${expt[1]}' for object of type '${typeof (+str[position] || str[position])}'`;
            } else if (mask_item.includes('%')) {
                let val = (+str[position] * 100).toFixed(6) + '%';
                input = input.replace(mask_item, val);
            } else if (letters && [',', '_'].includes(letters[4]) && +str[position]) {
                let div = str[position].split(/(?=(?:...)*$)/).join(letters[4]);
                input = input.replace(mask_item, div);
                removeStr.push(position);
            } else if (letters && (+letters[5]) <= str[position].length && !letters.includes('.')) {
                input = input.replace(mask_item, str[position]);
                removeStr.push(position);
            } else if (letters && letters[3] && !letters[letters.length - 1]) {
                input = input.replace(mask_item, simpleFormat(mask_item, str[position]));
                removeStr.push(position);
            } else if (letters && !letters[5] && !letters[6] || letters && letters[1]) {
                input = input.replace(mask_item, str[position]);
                removeStr.push(position);
            } else if (letters) {
                elemletterser(letters, position, mask_item);
            }
        });
    }

    if (failRun) throw new Error(`Traceback (most recent call last):\n\t"${input}".format(${param.map(el_at => typeof el_at == "string" ? `"${el_at}"` : el_at).join(', ')})\n` + failRun);
    else {
      removeStr.reverse().map(position => str.splice(position, 1));
      return simpleFormat(input, ...str);
    }
  }
});