
$(() => {

	const source = `
	<p>
		Click on the buttons to edit the rule, and see how the rule number is calculated:
	</p>
	<p>
		<span class='sum-list'></span>
	</p>
	<p>
		<table><tr class='items'></tr></table>
	</p>
	`

	const colors = '#ee4566 #ffa938 #eee039 #39e692 #3fcbe9 #5286f9 #9369fa #f962cf'.split(' ')

	function toBinary(value, digits = 8){
        let string = value.toString(2)
        let pad = ''
        for(let i = 0; i < digits; i++) pad += '0'
        return pad.substr(string.length) + string
    }

	$('.playable.p-rule-num').each((i, self) => {
		const container = self
		$(self).html(source)

		function render(){

			$(container).find('.sum-list').html('')

			let rule = []

			$(self).find('.button').each((i, self) => {
                let neighbourText = toBinary(i, 3).replace(/1/g, '◼︎').replace(/0/g, '◻︎')
                let producesLife = $(self).hasClass('active')
                rule.push(producesLife)

                $(self).html(`${neighbourText}<br>➜&nbsp;${producesLife ? '◼︎' : '◻︎'}`)

				const value = $(container).find(`.value`).eq(i)

				if(producesLife){
					value.css('color', colors[i])
					value.css('opacity', 1)
					value.css('text-decoration', 'none')
				} else {
					value.css('color', null)
					value.css('opacity', 0.5)
					value.css('text-decoration', 'line-through')
				}
            })

			const sumList = $(container).find('.sum-list')

			for(let i = 0; i < 8; i++){

				if(rule[i]){
					const item = $(`<span>${Math.pow(2, i)}</span>`)
					item.css('color', colors[i])
					const plus = $(`<span> + </span>`)
					sumList.append(item).append(plus)
				}
			}

			if(sumList.children().size()){
				sumList.children().last().remove()
			} else {
				sumList.append('0')
			}

			const num = parseInt([...rule].reverse().map(x => x ? 1 : 0).join(''), 2)
			sumList.append(`<span> = Rule ${num}</span>`)

		}

		for(let i = 0; i < 8; i++){

			const td = $('<td></td>')

			const button = $(`<div class='button'></div>`)
			button.on('click', () => {
				button.toggleClass('active')
				render()
			})
			button.css('--color', colors[i])

			const item = $(`<div class='value centered v-${i}'>2<sup>${i}</sup> ➜ ${Math.pow(2, i)}</div>`)
			item.css('color', colors[i])

			td.append(button)
			td.append(item)

			$(self).find('.items').append(td)
		}

		render()

	})

})
