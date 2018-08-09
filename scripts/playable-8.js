
// Interactive #8 - Create a pattern in generation 2

$(() => {
    const source = `
		<p>
			<div class='split-container'>
				<div>
					<div class='button-line'></div>
				</div>
				<div>
					<p>Click to toggle input cells:<p/>
					<div class='arrays'></div>
				</div>
			</div>
		</p>
    `

	const colors = '#ee4566 #ffa938 #eee039 #39e692 #3fcbe9 #5286f9 #9369fa #f962cf'.split(' ')

	function toBinary(value, digits = 8){
        let string = value.toString(2)
        let pad = ''
        for(let i = 0; i < digits; i++) pad += '0'
        return pad.substr(string.length) + string
    }

    $('.playable.p8').each((i, self) => {

		$(self).html(source)

		const container = self, rows = []

		let size = 9
		let hovered = null

		// TODO: Use negative x values so to outter cells

		function render(){

			let rule = []

			$(self).find('.rule-toggle').each((i, self) => {
                let neighbourText = toBinary(i, 3).replace(/1/g, '◼︎').replace(/0/g, '◻︎')
                let producesLife = $(self).hasClass('active')
                rule.push(producesLife)
                $(self).html(`${neighbourText} ➜ ${producesLife ? '◼︎' : '◻︎'}`)
            })


			let cells = []
			for(let i = 0; i < rows.length; i++){
				let row = {}
				for(let x = 0 - rows.length * 2; x < rows.length * 3; x++){
					if(i == 0){
						if(rows[i][x] != null) row[x] = rows[i][x].hasClass('alive') ? 1 : 0
						else row[x] = 0
					} else {
						let a = cells[i - 1][x - 1] || 0
						let b = cells[i - 1][x + 0] || 0
						let c = cells[i - 1][x + 1] || 0
						const ruleId = parseInt(`${a}${b}${c}`, 2)
						row[x] = rule[ruleId] ? 1 : 0
					}
				}
				cells.push(row)
			}

			for(let i = 1; i < rows.length; i++){

				for(let x = 0; x < size; x++){

					const item = rows[i][x]
					item.removeClass('alive')

					let a = cells[i - 1][x - 1] || 0
					let b = cells[i - 1][x + 0] || 0
					let c = cells[i - 1][x + 1] || 0
					const ruleId = parseInt(`${a}${b}${c}`, 2)

					if(cells[i][x]) item.addClass('alive').css('--color', colors[ruleId])

					if(item == hovered){
						item.addClass('highlight')
						if(!rule[ruleId]) item.css('--highlight', colors[ruleId])
						else item.css('--highlight', null)
					}

					item.off('mouseenter')
					item.off('mouseleave')
					item.off('click')

					item.on('click', () => {
						$(container).find('.rule-toggle').eq(ruleId).toggleClass('active')
						render()
					})

                    item.on('mouseenter', () => {
						hovered = item

                        item.addClass('highlight')


						if(!rule[ruleId]) item.css('--highlight', colors[ruleId])
						else item.css('--highlight', null)
                        if(rows[i - 1][x - 1]) rows[i - 1][x - 1].addClass('highlight')
    					if(rows[i - 1][x + 0]) rows[i - 1][x + 0].addClass('highlight')
    					if(rows[i - 1][x + 1]) rows[i - 1][x + 1].addClass('highlight')
                        $(container).find('.button').css('opacity', 0.5).eq(ruleId).css('opacity', 1)
                    })

                    item.on('mouseleave', () => {
						hovered = null
						item.css('--highlight', null)
                        $(container).find('.item').removeClass('highlight')
                        $(container).find('.button').css('opacity', 1)
                    })

				}
			}
		}

        for(let i = 0; i < 8; i++){
            const item = $(`<div class="button rule-toggle"></div>`)
            item.css('--color', colors[i])
            item.on('click', () => {
                item.toggleClass('active')
                render()
            })
            $(self).find('.button-line').append(item)
        }

        let resetButton = $(`<div class="button">Reset</div>`)
        resetButton.css({'--color': '#eee', color: '#333'})
        resetButton.on('click', () => {
            $(container).find('.rule-toggle').removeClass('active')
            render()
        })
        $(self).find('.button-line').append(resetButton)

		for(let i = 0; i < 4; i++){

			if(i > 0){
				const title = $(`<p>Generation ${i}:</p>`)
				$(self).find('.arrays').append(title)
			}

			const list = $(`<div class='array'></div>`)
			$(self).find('.arrays').append($('<p></p>').append(list))

			let row = []
			rows.push(row)
			for(let x = 0; x < size; x++){
				const item = $(`<div class="item can-click"></div>`)
				if(i == 0){
					item.on('click', () => {
						item.toggleClass('alive')
						render()
					})
					item.on('mouseenter', () => item.addClass('highlight'))
					item.on('mouseleave', () => item.removeClass('highlight'))
				}
				list.append(item)
				row.push(item)
			}
		}

		render()

    })
})
