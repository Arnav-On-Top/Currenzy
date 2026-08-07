var fromCurrency=document.getElementById("fromCurrency");
var toCurrency=document.getElementById("toCurrency");
var rate=document.getElementById("rate");
var amount=document.getElementById("amount");
var convertButton=document.getElementById("convertButton");
var swapButton=document.getElementById("swapButton");
var result=document.getElementById("result");
var inverseRate=document.getElementById("inverseRate");
var error=document.getElementById("error");
var savedRates=localStorage.getItem("currencyRates");
if (savedRates==null)
{savedRates="{}";}
savedRates=JSON.parse(savedRates);
fromCurrency.onchange=function(){loadRate();};
toCurrency.onchange=function(){loadRate();};
function loadRate(){
    error.innerHTML="";
    if(fromCurrency.value=="")
        {return;}
    if(toCurrency.value=="")
        {return;}
    var key=fromCurrency.value+"_"+ toCurrency.value;
    if(savedRates[key]!=undefined)
        {rate.value=savedRates[key];}
}
convertButton.onclick=function(){
    error.innerHTML="";
    result.innerHTML="";
    inverseRate.innerHTML="";
    if(fromCurrency.value==""){
        error.innerHTML="Select The Currency";
        return;
    }
    if(toCurrency.value==""){
        error.innerHTML="Select The Currency";
        return;
    }
    if(rate.value==""){
        error.innerHTML="Select Exchange Rate";
        return;
    }
    if(Number(rate.value)<=0){
        error.innerHTML="Exchange Rate Must be >0";
        return;
    }
    if(amount.value==""){
        error.innerHTML="Enter Amount";
        return;
    }
    var exchangeRate=Number(rate.value);
    var enteredAmount=Number(amount.value);
    var answer=enteredAmount*exchangeRate;
    result.innerHTML=enteredAmount+""+fromCurrency.value+"="+answer.toFixed(2)+""+toCurrency.value;
    var reverse=1/exchangeRate;
    inverseRate.innerHTML="1"+toCurrency.value+"="+reverse.toFixed(6)+""+fromCurrency.value;
    var key=fromCurrency.value+"_"+toCurrency.value;
    savedRates[key]=exchangeRate;
    localStorage.setItem("currencyRates",JSON.stringify(savedRates));
};
swapButton.onclick=function(){
    error.innerHTML="";
    var oldFrom=fromCurrency.value;
    var oldTo=toCurrency.value;
    fromCurrency.value=oldTo;
    toCurrency.value=oldFrom;
    if(rate.value !=""){
        if(Number(rate.value)>0){
            var oldRate=Number(rate.value);
            var newRate=1/oldRate;
            rate.value=newRate.toFixed(6);
            var key=fromCurrency.value+"_"+ toCurrency.value;
            savedRates[key]=newRate;
            localStorage.setItem("currencyRates",JSON.stringify(savedRates));
        }
    }
    if(amount.value !=""){
        if(rate.value !=""){
            if(Number(rate.value)){
                var exchangeRate=Number(rate.value);
                var enteredAmount=Number(amount.value);
                var answer=enteredAmount*exchangeRate;
                result.innerHTML=enteredAmount+""+fromCurrency.value+"="+answer.toFixed(2)+""+toCurrency.value;
                var reverseRate=1/exchangeRate;
                inverseRate.innerHTML="1"+toCurrency.value+"="+reverseRate.toFixed(6)+""+fromCurrency.value;
            }
        }
    }
};