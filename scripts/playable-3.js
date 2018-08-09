
// Playable #3 - Click to toggle cells, hover to see neighbourhoods

$(() => {

    const notHoveringText = ''
    const source = `
        <p>
            Hover over a cell to see its neighbourhood (you can still click to toggle them):&nbsp;
            <span data-out>${notHoveringText}</span>
        </p>
        <p class="array"></p>
    `

    $('.playable.p3').each((i, self) => {
        $(self).html(source)

        let items = []

        function getNeighbourhoodText(i){
            let text = ''
            if(items[i - 1] != null && items[i - 1].hasClass('alive')) text += '◼︎'
            else text += '◻︎'
            if(items[i] != null && items[i].hasClass('alive')) text += '◼︎'
            else text += '◻︎'
            if(items[i + 1] != null && items[i + 1].hasClass('alive')) text += '◼︎'
            else text += '◻︎'
            return text
        }

        for(let i = 0; i < 11; i++){
            const item = $(`<div class="item can-click ${Math.random() > 0.5 ? 'alive' : ''}" data-id="${i}"></div>`)
            items.push(item)

            item.on('mouseenter', (e) => {
                if(items[i - 1] != null) items[i - 1].addClass('highlight')
                item.addClass('highlight')
                if(items[i + 1] != null) items[i + 1].addClass('highlight')
                $(self).find('[data-out]').text(getNeighbourhoodText(i))
            })

            item.on('mouseleave', (e) => {
                if(items[i - 1] != null) items[i - 1].removeClass('highlight')
                item.removeClass('highlight')
                if(items[i + 1] != null) items[i + 1].removeClass('highlight')
                $(self).find('[data-out]').text(notHoveringText)
            })

            item.on('click', () => {
                item.toggleClass('alive')
                $(self).find('[data-out]').text(getNeighbourhoodText(i))
            })

            $(self).find('.array').append(item)
        }

    })
})
