
// Playable #2 - Click to toggle cells, hover to see neighbours

$(() => {

    const notHoveringText = ''
    const source = `
        <p>
            Hover over a cell to see its neighbours (you can still click to toggle them):&nbsp;
            <span data-out>${notHoveringText}</span>
        </p>
        <p class="array"></p>
    `

    $('.playable.p2').each((i, self) => {
        $(self).html(source)

        let items = []

        function getNeighbourText(i){
            let text = ''
            if(items[i - 1] != null && items[i - 1].hasClass('alive')) text += '◼︎'
            else text += '◻︎'
            text += ' and '
            if(items[i + 1] != null && items[i + 1].hasClass('alive')) text += '◼︎'
            else text += '◻︎'
            return text
        }

        for(let i = 0; i < 11; i++){
            const item = $(`<div class="item can-click ${Math.random() > 0.5 ? 'alive' : ''}" data-id="${i}"></div>`)
            items.push(item)

            item.on('mouseenter', (e) => {
                if(items[i - 1] != null) items[i - 1].addClass('highlight')
                if(items[i + 1] != null) items[i + 1].addClass('highlight')
                $(self).find('[data-out]').text(getNeighbourText(i))
            })

            item.on('mouseleave', (e) => {
                if(items[i - 1] != null) items[i - 1].removeClass('highlight')
                if(items[i + 1] != null) items[i + 1].removeClass('highlight')
                $(self).find('[data-out]').text(notHoveringText)
            })

            item.on('click', () => {
                item.toggleClass('alive')
                $(self).find('[data-out]').text(getNeighbourText(i))
            })

            $(self).find('.array').append(item)
        }

    })
})
