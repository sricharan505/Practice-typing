const randomText = async (sentence_length=0) => {
    //let url = `http://metaphorpsum.com/sentences/${sentence_length}`;
    let url = `https://hipsum.co/api/?type=hipster-centric&sentences=${sentence_length}`;
    let randomtext = await fetch(url)
    .then(res => res.json())
    .then( (text) => {
        return text[0];
    })
    //console.log(randomtext);
    return randomtext;
};

export default randomText;