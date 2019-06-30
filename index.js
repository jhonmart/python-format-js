"use strict"
Object.defineProperty(String.prototype, 'format', {
	value: function(...str) {
		let i = 0,
			e = this, // Entrada
			removeStr = [],
			srtSpc = e.match(/({+.*?})/g);

		str = str.map(el=>el+''); // toString

		let paramStr = srtSpc.map(p=>{
			let isNum = +p.replace(/[{}]/g,'');
			return (p.match(/{(\D+.*?)/g)? [true] : [isNum<str.length])[0];
		}).filter(e=>!e); 

		let refParam = srtSpc.map(p=>{
			let isNum = +p.replace(/[{}]/g,'');
			return p.match(/{(\D+.*?)/g)? isNum : true;
		}).filter(p=>p);
		
		if(paramStr.length)
			return "Fail ref"; // Fail line
		else if(srtSpc.length-refParam.length>str.length || srtSpc.length-refParam.length>=str.length && refParam.length)
			return "Overflow of parameters greater than amount of values"; // Fail line
		else
			srtSpc.map((nth,pE)=>{
				let pElem = /\d+.*?/.exec(nth),
					sep = nth.match(/[,_]/g), // Separadores (Milhar)
					lett = /{:(\D+.*?)}/g.exec(nth); // Letras

				if(nth.includes('{}')){ // Change default
					e = e.replace(nth, str[pE]); // Change for value
					removeStr.push(pE);
				} else if(pElem){
					if(pElem[0].length+2==nth.length)
						e = e.replace(nth, str[+pElem[0]]); // Change for value
					else if(str.length>pE && !nth.includes('.')) // Overflow string lenght
						if(str[pE].length >= +( pElem || ['0'])[0]){ 
							e = e.replace(nth, str[pE]); // Change for value
							removeStr.push(pE);
						}
				} else if(sep){
					let div = str[pE].split(/(?=(?:...)*$)/).join(sep[0]);
					e = e.replace(nth, div); // Change for value
					removeStr.push(pE);
				} else if(lett){
					let chars = lett[1].split('');
					if(chars.includes('f')){
						let val = parseFloat(str[pE]).toFixed(6),
							exp = +str[pE]>0? chars[0]==' '? ' ' : chars[0]=='+'? '+' : '' : '';
						e = e.replace(nth, exp+val); // Change for value
					} 

					removeStr.push(pE);
				}
			});
			
			removeStr.reverse().map(pE=>str.splice(pE,1));

			return !e.includes('{')? e : e.split(/([{}])/g).filter(a=>!['{','}'].includes(a)).map(c=>{
				let params = +c.slice(1) && !c.includes('.')? +c.slice(1) : /:(\D)+?(\D)*?(\d.*)/g.exec(c) || c; // /:(\D)+?(\D)*?(\d.*)*?(\D)+?/g

				if(typeof params=="string") return c;
				else{
					if(typeof params=="number") return " ".repeat(params).replace(RegExp(`.{${str[i].length}}`), str[i]);
					else{
						let p1 = params[1],
							fill_elem = ([...'<^>.'].includes(p1)? ' ':p1),
							space = !p1.includes('.')? fill_elem.repeat((+params[3])-str[i].length) : '',
							elem = [space, str[i]],
							srt_crop = str[i].slice(0,+params[3]),
							space_c = fill_elem.repeat(+params[3]),
							num = Math.floor((space_c.length-str[i].length)/2),
							str_pos = num>0? fill_elem.repeat(num)+str[i]: '',
							elem_center = space_c.replace(RegExp(`.{${str_pos.length}}`), str_pos);
						
						i++;
						return (params.includes('>')?  elem : 
								params.includes('<')? elem.reverse() : 
								params.includes('^')? [elem_center] :  
								params.includes('.')? [srt_crop] : '').join('');
					}
				}
				
			}).join('');
	}
});