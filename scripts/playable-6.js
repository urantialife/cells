
// Interactive #6 - One neighbourhood transform, two generations

$(() => {
    const source = `
		<div class='arrays'>
			<p> Click to edit these input cells and see subsequent generations: </p>
		</div>
    `

    $('.playable.p6').each((i, self) => {

		$(self).html(source)

		const container = self, rows = []

		let size = 11

		// TODO: Use negative x values so to outter cells

		function render(){
			for(let i = 1; i < rows.length; i++){
				for(let x = 0; x < size; x++){
					rows[i][x].removeClass('alive')
					let a = 0, b = 0, c = 0
					if(rows[i - 1][x - 1] && rows[i - 1][x - 1].hasClass('alive')) a = 1
					if(rows[i - 1][x + 0] && rows[i - 1][x + 0].hasClass('alive')) b = 1
					if(rows[i - 1][x + 1] && rows[i - 1][x + 1].hasClass('alive')) c = 1
					if(a && !b && c) rows[i][x].addClass('alive')
				}
			}
		}

		for(let i = 0; i < 3; i++){

			if(i > 0){
				const title = $(`<p>Generation ${i}: <b>◼︎ ◻︎ ◼︎ ➜ ◼︎</b></p>`)
				$(self).find('.arrays').append(title)
			}

			const list = $(`<div class='array'></div>`)
			$(self).find('.arrays').append($('<p></p>').append(list))

			let row = []
			rows.push(row)
			for(let x = 0; x < size; x++){
				const item = $(`<div class="item ${i == 0 ? 'can-click' : ''} ${Math.random() > 0.5 ? 'alive' : ''}"></div>`)
				item.on('mouseenter', () => {
					item.addClass('highlight')
					if(rows[i - 1] && rows[i - 1][x - 1]) rows[i - 1][x - 1].addClass('highlight')
					if(rows[i - 1] && rows[i - 1][x + 0]) rows[i - 1][x + 0].addClass('highlight')
					if(rows[i - 1] && rows[i - 1][x + 1]) rows[i - 1][x + 1].addClass('highlight')
				})
				item.on('mouseleave', () => {
					for(let i = 0; i < rows.length; i++){
						for(let x = 0; x < size; x++){
							rows[i][x].removeClass('highlight')
						}
					}
				})
				if(i == 0){
					item.on('click', () => {
						item.toggleClass('alive')
						render()
					})
				}
				list.append(item)
				row.push(item)
			}
		}

        render()

    })
})
