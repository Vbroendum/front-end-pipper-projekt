

const url = "http://localhost:8000/pips";
const response = fetch(url)

const pips = response.json();

console.log(pips)
    