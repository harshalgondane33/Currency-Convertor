const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const fromcurr=document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
const dropdown= document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const msg= document.querySelector(".msg");

for(let select of dropdown)
{
    for(currcode in countryList)
    {
        let newopt=document.createElement("option");
        newopt.innerText=currcode;
        newopt.value=currcode;
        if(select.name==="from" && currcode==="USD")
        {
            newopt.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR")
        {
            newopt.selected="selected";
        }
        select.append(newopt);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}
const updateflag=(el)=>
{
    let currcode=el.value;
    let contcode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${contcode}/flat/64.png`;
    let img= el.parentElement.querySelector("img");
    img.src=newsrc;
};
const updateexchange = async() => {
    let amt = document.querySelector(".amount input");
    let amtvalue=amt.value;
    if(amtvalue=="" || amtvalue<1)
    {
        amtvalue=1;
        amt.value="1";
    }
    let url=`${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch (url);
    let data = await response.json();
    console.log(data);
    console.log(data[fromcurr.value.toLowerCase()]);
    let arr=data[fromcurr.value.toLowerCase()];
    let rate = arr[tocurr.value.toLowerCase()];
    let finalamt = rate * amtvalue ;
    console.log(rate);
    msg.innerText = `${amtvalue} ${fromcurr.value} = ${rate} ${tocurr.value}`;   
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateexchange();
});
window.addEventListener("load", () => {
    updateexchange();
  });
