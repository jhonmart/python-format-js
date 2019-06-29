Object.defineProperty(String.prototype, 'format', {
	value: function(...str) {
		let i = 0,
			e = this; // Entrada
			
		e.split(' ').map(nth=>{
			if(e.includes('{}'))
				e = e.replace('{}', str.splice(0,1)[0])
		});

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