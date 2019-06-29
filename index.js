// Abaixo mais atualizado
Object.defineProperty(String.prototype, 'format', {
    value: function(...str) {
    	let i = 0;

		return this.split(/([{}])/g).filter(a=>!['{','}',' ',''].includes(a)).map(c=>{
			let params = /:(\D)?(\d.*)/g.exec(c) || c;

			if(typeof params=="string") return c;
			else{
				let space = " ".repeat((+params[2])-str[i].length),
					elem = [space, str[i]],
					space_c = " ".repeat(+params[2]),
					num = Math.floor((space_c.length-str[i].length)/2),
					str_pos = " ".repeat(num)+str[i++],
					elem_center = space_c.replace(RegExp(`.{${str_pos.length}}`), str_pos);

				return (params[1]=='>'?  elem : params[1]=='<'? elem.reverse() : [elem_center]).join('');
			}
			
		}).join('');
    }
});