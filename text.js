

function parse(string) {
    chars = string.split('')
    chars.map(char => replace(char))
    return chars.toString()
}


function replace(char) {
    let map = {
        a: 'bcd',
        b: '123',
        c: 'def',
        d: '321',
        e: '11',
        f: 'd',
        g: 'hf',
        h: '2'
    }
    if (map[char]) {
        char = map[char]
        parse(char)
    }
    else {
        return char
    }

}

parse(a)