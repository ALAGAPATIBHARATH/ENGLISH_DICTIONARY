let inputEl=document.getElementById("input");
let infoTextEl=document.getElementById("info-text");
let meaningContainerEl=document.getElementById("meaning-container");
let titleEl=document.getElementById("title");
let meaningEl=document.getElementById("meaning");
let audioEl=document.getElementById("audio");
async function fetchAPI(word){
    try {
        infoTextEl.style.display="block";
        meaningContainerEl.style.display="none";
        infoTextEl.innerText=`Searching the meaning of "${word}"`;
        let url= `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        let result=await fetch(url).then((res)=>res.json());
        console.log(result)
        if(result.title){
            meaningContainerEl.style.display="block";
            infoTextEl.style.display="none";
            titleEl.innerText=word;
            meaningEl.innerText="N/A";
            audioEl.style.display="none";
        }else{
            infoTextEl.style.display="none";
            meaningContainerEl.style.display="block";
            audioEl.style.display="inline-flex";
            titleEl.innerText=result[0].word;
            meaningEl.innerText=result[0].meanings[0].definitions[0].definition;
            audioEl.src=result[0].phonetics[0].audio;
        }
    }catch (error) {
        console.log(error);
        infoTextEl.innerText = `An error happened, try again later`;
    }   
}

inputEl.addEventListener("keyup",(e)=>{
    if(e.target.value && e.key==="Enter"){
        fetchAPI(e.target.value);
    }
});