
// Interactive #x - The full ECA
// There's a mix of $ and regular DOM manipulation going on in here.
// Using the utility methods for everything made it super slow

$(() => {
    const source = `
		<p>
			Click on the buttons or cells to edit the rule (hover cells to see their neighbourhood):
		</p>
        <p>
			<div class='split-container'>
				<div>
					<div class="buttons"></div>
				</div>
				<div>
					<div class='array-grid'></div>
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

    let size = 25

    $('.playable.p-final').each((i, self) => {
        const container = self
        let cells = {}

        const getCell = (x, y) => {
            if(cells[`${x}-${y}`]) return cells[`${x}-${y}`]
            return null
        }

        function render(){

            for(const item of Object.values(cells)){
                // TODO: Move the hover and grid clicking inside of rendering to make it update
                item.className = 'item'
            }

            let rule = []

            $(self).find('.rule-toggle').each((i, self) => {
                let neighbourText = toBinary(i, 3).replace(/1/g, '◼︎').replace(/0/g, '◻︎')
                let producesLife = $(self).hasClass('active')
                rule.push(producesLife)
                $(self).text(`${neighbourText} ➜ ${producesLife ? '◼︎' : '◻︎'}`)
            })

            // In the horizontal loops, the x direction goes way out of the visible bounds
            // This is to make sure that even though we might not be able to see everything, the pattern is correct
            const generation = (gen, previous) => {
                let data = {}
                if(previous == null){
                    for(let i = 0 - size; i < size * 2; i++){
                        if(i == Math.floor(size / 2)){
                            data[i] = 1
                            if(getCell(i, gen)){
                                let element = getCell(i, gen)
                                element.style.setProperty('--color', '#333')
                                element.className += ' alive'
                            }
                        } else {
                            data[i] = 0
                        }
                    }
                } else {
                    for(let i = 0 - size; i < size * 2; i++){
                        let a = previous[i - 1] || 0
                        let b = previous[i]
                        let c = previous[i + 1] || 0

                        let neighbourhoodBinary = `${a}${b}${c}`
                        let neighbourhoodId = parseInt(neighbourhoodBinary, 2)

                        if(rule[neighbourhoodId]){
                            data[i] = 1
                            if(getCell(i, gen)){
                                let element = getCell(i, gen)
                                element.style.setProperty('--color', colors[neighbourhoodId])
                                element.className += ' alive'
                            }
                        } else {
                            data[i] = 0
                        }
                    }
                }

                if(gen < size) {
                    setTimeout(() => {
                        generation(gen + 1, data)
                    }, Math.random() * 10)
                }
            }

            generation(0, null)

        }

        $(self).html(source)

        for(let i = 0; i < 8; i++){
            const item = $(`<div class="button rule-toggle ${ (i < 5 && i != 0) ? "active" : "" }"></div>`)
            item.css('--color', colors[i])
            item.on('click', () => {
                item.toggleClass('active')
                render()
            })
            $(self).find('.buttons').append(item)
        }

        let resetButton = $(`<div class="button">Reset</div>`)
        resetButton.css({'--color': '#eee', color: '#333'})
        resetButton.on('click', () => {
            $(container).find('.rule-toggle').removeClass('active')
            render()
        })
        $(self).find('.buttons').append(resetButton)

        for(let i = 0; i < size; i++) $(self).find('.array-grid').append('<div class="array"></div>')

        $(self).find('.array').each((i, self) => {
            for(let x = 0; x < size; x++){
                const item = document.createElement('div')
                item.className = 'item'
                cells[`${x}-${i}`] = item

                item.addEventListener('mouseenter', () => {
                    if(getCell(x - 1, i - 1)) $(getCell(x - 1, i - 1)).addClass('highlight')
                    if(getCell(x, i - 1)) $(getCell(x, i - 1)).addClass('highlight')
                    if(getCell(x + 1, i - 1)) $(getCell(x + 1, i - 1)).addClass('highlight')
                    $(item).addClass('highlight')

                    let a = 0, b = 0, c = 0

                    if(getCell(x - 1, i - 1) && $(getCell(x - 1, i - 1)).hasClass('alive')) a = 1
                    if(getCell(x, i - 1) && $(getCell(x, i - 1)).hasClass('alive')) b = 1
                    if(getCell(x + 1, i - 1) && $(getCell(x + 1, i - 1)).hasClass('alive')) c = 1

                    let neighbourhoodBinary = `${a}${b}${c}`
                    let neighbourhoodId = parseInt(neighbourhoodBinary, 2)

                    $(container).find('.rule-toggle').each((i, self) => {
                        if(i != neighbourhoodId) $(self).css('opacity', 0.5)
                        else {
                            $(item).on('click', () => {
                                $(container).find('.rule-toggle').eq(neighbourhoodId).toggleClass('active')
                                render()
                            })
                        }
                    })
                })

                item.addEventListener('mouseleave', () => {
                    if(getCell(x - 1, i - 1)) $(getCell(x - 1, i - 1)).removeClass('highlight')
                    if(getCell(x, i - 1)) $(getCell(x, i - 1)).removeClass('highlight')
                    if(getCell(x + 1, i - 1)) $(getCell(x + 1, i - 1)).removeClass('highlight')
                    $(item).removeClass('highlight').off('click')
                    $(container).find('.rule-toggle').css('opacity', 1)
                })

                $(self).append(item)
            }
        })

        render()

    })
})
