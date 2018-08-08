
// Interactive #4 is a challenge to fit every neighbourhood type into a small set of cells
// I used this code to find solutions with various cell counts!

// I know for a fact it's possible with 8 cells because I did it by hand
// Larger sizes can just use the same solution, so start at 8 at the default

// After running it, I now know that my solution is pretty much the only one, nice!

function findSolutions(cells = 8){
    console.log(`Solutions in ${cells} cells:`)
    for(let i = 0; i < Math.pow(2, cells); i++){
        let pad = ''
        for(let j = 0; j < cells; j++) pad += '0'
        let binary = i.toString(2)
        binary = pad.substr(binary.length) + binary
        binary = binary.split('')
        const getI = (i) => {
            if(binary[i] === undefined) return '0'
            else return binary[i]
        }
        let all = '000 001 010 011 100 101 110 111'.split(' ')
        for(let x = 0; x < cells; x ++){
            let curr = `${getI(x-1)}${getI(x)}${getI(x+1)}`
            if(all.indexOf(curr) != -1){
                all.splice(all.indexOf(curr), 1)
            }
        }
        if(all.length == 0) console.log(binary.map(x => x == '1' ? '◼︎' : '◻︎').join(' '))
    }
    if(cells > 1) findSolutions(cells - 1)
}


findSolutions()
