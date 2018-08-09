
// Playable #4 - All neighbours challenge

$(() => {
    const source = `
        <p>
            Create a set of cells that consist of every type of neighbourhood:
        </p>
        <p class="array"></p>
        <p>You Have: <span data-has></span></p>
        <p>You're still missing: <span data-missing></span></p>
		<p>
			Puzzle hint (hover to reveal):
			<span class='puzzle-hint'>Remember that cells on the edge have dead neighbours we can't see!</span>
		</p>
    `

    $('.playable.p4').each((i, self) => {
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

        function update(){
            let all = [
                '◻︎◻︎◻︎', '◻︎◻︎◼︎', '◻︎◼︎◻︎', '◻︎◼︎◼︎', '◼︎◻︎◻︎', '◼︎◻︎◼︎', '◼︎◼︎◻︎', '◼︎◼︎◼︎'
            ]

            let has = []

            for(let i = 0; i < items.length; i++){
                let currText = getNeighbourhoodText(i)
                if(has.indexOf(currText) == -1){
                    has.push(currText)
                }
                if(all.indexOf(currText) != -1){
                    all.splice(all.indexOf(currText), 1)
                }
            }

            if(all.length == 0){
                $(self).find('[data-has]').text('All possible neighbourhoods!')
                $(self).find('[data-missing]').text('None!')
            } else {
                $(self).find('[data-has]').text(has.join(', '))
                $(self).find('[data-missing]').text(all.join(', '))
            }
        }

        for(let i = 0; i < 8; i++){
            const item = $(`<div class="item can-click" data-id="${i}"></div>`)
            items.push(item)

            item.on('mouseenter', (e) => {
                if(items[i - 1] != null) items[i - 1].addClass('highlight')
                item.addClass('highlight')
                if(items[i + 1] != null) items[i + 1].addClass('highlight')
            })

            item.on('mouseleave', (e) => {
                if(items[i - 1] != null) items[i - 1].removeClass('highlight')
                item.removeClass('highlight')
                if(items[i + 1] != null) items[i + 1].removeClass('highlight')
            })

            item.on('click', () => {
                item.toggleClass('alive')
                $(self).find('[data-out]').text(getNeighbourhoodText(i))
                update()
            })

            $(self).find('.array').append(item)
        }

        update()

    })
})
