
// Interactive #1 - Click to toggle cells

$(() => {
    const source = `
        <p>Click to toggle a cell between being alive and dead:</p>
        <p class="array"></p>
    `

    $('.playable.p1').each((i, self) => {
        $(self).html(source)

        for(let i = 0; i < 11; i++){
			const item = $(`<div class="item can-click ${Math.random() > 0.5 ? 'alive' : ''}"></div>`)

			item.on('click', () => {
	        	item.toggleClass('alive')
	        })

			item.on('mouseenter', () => {
				item.addClass('highlight')
			})

			item.on('mouseleave', () => {
				item.removeClass('highlight')
			})

			$(self).find('.array').append(item)
        }



    })
})
