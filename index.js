"use strict"
Object.defineProperty(String.prototype, 'format', {
	value: function(...param) {
		let i = 0, // Indice para ajudar a percorrer valores
			e = this, // Entrada
			removeStr = [], // Array de ajuda para remover valores já usados
			srtSpc = e.match(/({.*?})/g), // Separação de cada mascara
			failRun,
			elemForm = (mask, ...el) =>{
				return !mask.includes('{')? mask : 
							mask.split(/([{}])/g)
								.filter(f=>!['{','}'].includes(f))
								.map(it_mk=>{
									let params = +it_mk.slice(1) && !it_mk.includes('.')? +it_mk.slice(1) : 
										/:(\D)+?(\D)*?(\d+)/g.exec(it_mk) || it_mk,
										valSet = (typeof el=="object"? el[i] : el);
					
					if(typeof params=="string") return it_mk;
					else{
						if(typeof params=="number") return " ".repeat(params)
															  .replace(RegExp(`.{${el[i].length}}`), el[i]);
						else{
							let p1 = params[1],
								fill_elem = ([...'<^>.'].includes(p1)? ' ':p1),
								sz_sp = (+params[3])-valSet.length;

							sz_sp = sz_sp<0? valSet.length : sz_sp;

							let	space = !p1.includes('.')? 
											fill_elem.repeat(sz_sp) : '',
								elem = [space, valSet],
								srt_crop = valSet.slice(0,+params[3]),
								space_c = fill_elem.repeat(+params[3]),
								num = Math.floor((space_c.length-valSet.length)/2),
								str_pos = num>0? 
											fill_elem.repeat(num)+valSet: '',
								elem_center = space_c.replace(RegExp(`.{${str_pos.length || sz_sp}}`), str_pos);
							
							i++;
							return (params.includes('>')? elem : 
							[...'>^.'].filter(ind=>params.includes(ind)).length<1? elem.reverse() : // <
									params.includes('^')? [elem_center] :  
									[srt_crop]).join('');
						}
					}
							
				}).join('');
			},
			elemLetter = (lett, pE, nth) =>{
				let lett_last = lett[lett.length-1],
					pad = {
						for: {n: 10, d: 10, x: 16, X: 16, o: 8, b: 2},
						mask: {n: '', d: '', x: '0x', X: '0X', o: '0o', b: '0b', '':''}
					},
					nth_pers = nth.replace(/[eEfFgGdxXobn#%]/g,''),
					val;

				if(lett_last){ // Verificar se tem Letra
					if(lett_last.toLowerCase().includes('f')){
						let exp = +str[pE]>0? 
								nth.includes(' ')? ' ' : 
								nth.includes('+')? '+' : '' : '';

						val = exp+(parseFloat(str[pE]).toFixed(6));
					} else if([...'dxXobn'].includes(lett_last)){
						let op = (+str[pE])>0? // Numero é positivo
									nth.includes(' ')? ' ' : // Marcador é espaço e numero é positivo
									nth.includes('+')? '+' : // Marcador é positivo e numero é positivo
									nth.includes('-')? '+' : // Marcador é negativo e numero é positivo
									'' : // Marcador é negativo e numero também
								'-'; // Numero negativo

						val = op+(nth.includes('#')? pad.mask[lett_last] : '')+
								(+str[pE]).toString(pad.for[lett_last]).replace('-',''); // d na ultima posição procura a formula e mostra seu resultado
						val = nth.includes('X')? val.toUpperCase() : val; // Caixa Alta (FONTE)
					} else if(lett_last.toLowerCase()=='g'){
						val = lett_last == 'G'? str[pE].toUpperCase() : str[pE];
					} else { //if(lett_last.toLowerCase()=='e'){
						val = (+str[pE]).toExponential();
						val = nth.includes('E')? val.toUpperCase() : val;
					}

					val = !lett[4]? val : elemForm(nth_pers, val); // Change align
					e = e.replace(nth, val); // Change for value
					removeStr.push(pE);
				}
			};

		let str = param.map(el=>el+''); // toString

		let paramStr = [],
			refParam = [];
			
		srtSpc.map(p => {
			let isNum = /{(\d+):?/.exec(p);
			if(isNum)
				if(+isNum[1] >= str.length) paramStr.push(1);
				else refParam.push(1);
		});

		if(paramStr.length)
			failRun = `ValueError: cannot switch from automatic field numbering to manual field specification`;
		else if(srtSpc.length-refParam.length>str.length || srtSpc.length-refParam.length>=str.length && refParam.length)
			failRun = `IndexError: tuple index out of range`;
		else{
			srtSpc.map((nth,pE)=>{
				let lett = /{(\d+)?:?([+_-])?(\W|_)?(\d+)?([eEfFdxXobcGgn])?}/.exec(nth),
					expt = /{.*?([a-zA-Z])?}/.exec(nth);
					
				if(expt && expt[1] && !lett && !['eEfFdxXobcGg'].includes(expt)){
					failRun = `ValueError: Unknown format code '${expt[1]}' for object of type '${typeof (+str[pE] || str[pE])}'`;
				} else if(nth.includes('%')){
					let val = (+str[pE]*100).toFixed(6)+'%';
					e = e.replace(nth, val); // Change for value
				} else if(lett && [',','_'].includes(lett[3]) && +str[pE]){ // Separador deve existir e valor de atributo de ser numerico
					let div = str[pE].split(/(?=(?:...)*$)/).join(lett[3]);
					e = e.replace(nth, div); // Change for value
					removeStr.push(pE);
				} else if(lett && lett[1] && lett[1].length+2==nth.length){ // Saber se existe um numero antes do dois pontos {Numero:}
					e = e.replace(nth, str[lett[1]]); // Change for value
				} else if(lett && (+lett[4])<=str[pE].length && !lett.includes('.')){ // Mascara menor do que o valor
					e = e.replace(nth, str[pE]); // Change for value
					removeStr.push(pE);
				} else if(lett && !lett[4] && !lett[5] || lett && lett[1]){ // Change default
					e = e.replace(nth, str[pE]); // Change for value
					removeStr.push(pE);
				} else if(lett){
					elemLetter(lett, pE, nth);
				}  
			});
		}

		if(failRun) throw new Error(`Traceback (most recent call last):\n\t"${e}".format(${param.map(el_at=>typeof el_at=="string"? `"${el_at}"` : el_at).join(', ')})\n`+failRun);
		else{
			removeStr.reverse().map(pE=>str.splice(pE,1));
			return elemForm(e, ...str);
		}
	}
});