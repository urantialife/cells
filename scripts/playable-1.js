
// Interactive #1 - Click to toggle cells

$(() => {
    const source = `
        <p>Click to toggle a cell between being alive and dead:</p>
        <p class="array"></p>
    `

    $('.playable.p1').each((i, self) => {
        $(self).html(source)

        for(let i = 0; i < 11; i++){
            $(self).find('.array').append(`<div class="item ${Math.random() > 0.5 ? 'alive' : ''}"></div>`)
        }
		
        $(self).find('.item').on('click', (e) => {
            $(e.target).toggleClass('alive')
        })
    })
})
