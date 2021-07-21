/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require('./markov')
const fs = require('fs')
const axios = require('axios')

const args = process.argv.slice(2)

if(args[0] === "file"){
    makeTextFromFile(args[1])
}else if(args[0]==="url"){
    makeTextFromUrl(args[1])
}else{
    console.log(`unknown command: ${args[0]} \nValid commands: 'file' or 'url'`)
    process.exit(1)
}

function makeTextFromFile(filename){
    fs.readFile(filename,'utf8', (err,data)=>{
        if(err){
            console.error(`Error: Cannot read file from ${filename}: ${err}`)
            process.exit(1)
        }
        generateText(data);
    })
}

async function makeTextFromUrl(url){
    let res;
    try{
        res = await axios.get(url)
    }catch(err){
        console.error(`Error: Cannot fetching data from ${url}: ${err}`)
        process.exit(1)
    }   
    generateText(res.data);
}

function generateText(data){
    const markov = new MarkovMachine(data);
    console.log(markov.makeText());
}