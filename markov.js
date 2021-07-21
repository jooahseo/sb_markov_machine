/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let words = this.words
    this.chainObj = {}
    for(let i=0; i<words.length; i++){
      if(words[i+1] !== undefined){
        if (this.chainObj[words[i]]){
          this.chainObj[words[i]].push(words[i+1])
        }else{
          this.chainObj[words[i]] = [words[i+1]]
        }
      }else{ // x +1 === undefined
        if (this.chainObj[words[i]]){
          this.chainObj[words[i]].push(null)
        }else{
          this.chainObj[words[i]] = [null]
        }
      }
    }
    this.keys = Object.keys(this.chainObj)
  }

  // makeChainsRec(i=0){ //recursive way
  //   let words = this.words;
  //   this.chainObj = {}
  //   if(i >= words.length){
  //     return;
  //   }
  //   if(words[i+1] == undefined){
  //     if (this.chainObj[words[i]]){
  //       this.chainObj[words[i]].push(null)
  //     }else{
  //       this.chainObj[words[i]] = [null]
  //     }
  //   }else{ // x +1 !== undefined
  //     if (this.chainObj[words[i]]){
  //       this.chainObj[words[i]].push(words[i+1])
  //     }else{
  //       this.chainObj[words[i]] = [words[i+1]]
  //     }
  //   }
  //   return this.makeChainsRec(i+1)
  // }

  /** return random text from chains 
   * {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} 
   * -> cat in the hat |-> the cat in the cat in the hat |-> hat
  */

  makeText(numWords = 100, 
           text ="", 
           key = this.keys[Math.floor(Math.random() * this.keys.length)]) {
    
    let randIdxVal = Math.floor(Math.random() * this.chainObj[key].length)
    let selectedWord = this.chainObj[key][randIdxVal]
    
    text += ` ${key}`
    if(selectedWord === null || numWords <= 1){
      return text.trim()
    }else{
      return this.makeText(numWords-1, text, selectedWord)
    }
  }
}

// let mark = new MarkovMachine(`the cat in the hat is in the hat`)
// console.log('markov words',mark.words)
// console.log('markov chain obj',mark.chainObj)


// let res = mark.makeText()
// console.log(res)
// console.log(res.split(" ").length)

module.exports = { MarkovMachine }