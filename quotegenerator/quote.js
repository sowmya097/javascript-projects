const quoteContainer=document.getElementById("quote-contanier");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader=document.getElementById("loader");
//show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
//hideloading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }

}

//get quote from api
async function quote(){
    loading();
    const proxyUrl="https://cors-anywhere.herokuapp.com/"
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    try{
        const response=await fetch(proxyUrl+apiUrl);
        const data=await response.json();
        // if author is blank then print unknown
        if(data.quoteAuthor===''){
            authorText.innerText='Unknown';
        }
        else{
            authorText.innerText=data.quoteAuthor;
        }
        //if quote size long then reduce size
        if(data.quoteText.length >=100){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
       quoteText.innerText=data.quoteText;
    //   stop loading show quote
    complete();
}
    catch(error){
       quote();
    }
}
// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
  }
//event listener
newQuoteBtn.addEventListener('click',quote);
twitterBtn.addEventListener('click',tweetQuote);
//on Load
quote();
