const { MarkovMachine } = require('./markov')

describe("Testing Markov Machine", function(){

    test("test makechain ", function(){
        const markov = new MarkovMachine('the cat in the hat is in the hat');
        const chain = {
                    the: [ 'cat', 'hat', 'hat' ],
                    cat: [ 'in' ],
                    in: [ 'the', 'the' ],
                    hat: [ 'is', null ],
                    is: [ 'in' ]
                    }

        expect(markov.chainObj).toEqual(chain)
    })

    test("semi-predictable text", function(){
        const newMarkov = new MarkovMachine("a b c")
        const newText = newMarkov.makeText()
        const expected = ["a b c","b c","c"]

        expect(expected).toContain(newText)
    })

    test("test makeText function", function(){
        let markov = new MarkovMachine('the cat in the hat is in the hat');
        const text = markov.makeText()
        //make another Markov sequence using original markov
        const newMarkov = new MarkovMachine(text)

        // Check if newMarkov.keys are subset of markov.keys
        const check = newMarkov.keys.every((el) => {
            return markov.keys.indexOf(el) !== -1;
        })

        expect(check).toEqual(true)
    })

    test("makeText: cut of at length", function(){
        const newMarkov = new MarkovMachine("a b c d")
        const newText = newMarkov.makeText(numWords=2)
        const words = newText.split(" ")

        expect([1,2]).toContain(words.length)
    })
})