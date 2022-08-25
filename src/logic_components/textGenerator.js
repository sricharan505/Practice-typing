const randomText = async (sentence_length=0) => {
    let url = `http://metaphorpsum.com/sentences/${sentence_length}`;
    
    let randomtext = await fetch(url)
    .then(res => res.text())
    .then( (text) => {
        return text;
    })
    console.log(randomtext);
    return randomtext;
};

export default randomText;