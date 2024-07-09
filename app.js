"use strict";
let movements=document.querySelector(".movements")
let balance=document.querySelector(".actualBalance")
let ina=document.querySelector(".in")
let outa=document.querySelector(".out")
let intrest=document.querySelector(".intrest")
let user=document.querySelector(".user")
let pin=document.querySelector(".pin")
let form=document.getElementById("form")
 
let logic=document.querySelector(".logic")
let to=document.querySelector(".to")
let amount=document.querySelector(".amount")
let btn1=document.getElementById("btn1")
let loanInput=document.querySelector(".loan")
let loanBtn=document.querySelector(".loanbtn")
let closeInput=document.querySelector(".closeinput")
let closePin=document.querySelector(".closepin")
let closeBtn=document.querySelector(".closebtn")
let welcome=document.querySelector(".welcome")
let feet=document.querySelector(".feet")
let tim;

let min=100;
const account1={
    owner:"jonas schmedtmann",
    movements:[400,450,-400,3000,-650,-130,70,1300],
    intrestRate:1.2,
    pin:111,
    accDates: [
        new Date(2014, 2, 14),
        new Date(2015, 2, 15),
        new Date(2014, 5, 14),
        new Date(2015, 6, 15),
        new Date(2014, 7, 14),
        new Date(2015, 8, 15),
        new Date(2014, 9, 14),
        new Date(2015, 10, 15)
    ],
    currency:"EUR",
    locale:"en-US"
}
const account2={
    owner:"jessica davis",
    movements:[500,450,-400,3000,-650,-130,70,1300],
    intrestRate:1.2,
    pin:112,
    accDates: [
        new Date(2014, 2, 14),
        new Date(2015, 2, 15),
        new Date(2014, 5, 14),
        new Date(2015, 6, 15),
        new Date(2014, 7, 14),
        new Date(2015, 8, 15),
        new Date(2014, 9, 14),
        new Date(2015, 10, 15)
    ],
    currency:"EUR",
    locale:"en-US"
}
const account3={
    owner:"staeven thomas williams",
    movements:[200,450,-400,3000,-650,-130,70,1300],
    intrestRate:1.2,
    pin:113,
    accDates: [
        new Date(2014, 2, 14),
        new Date(2015, 2, 15),
        new Date(2014, 5, 14),
        new Date(2015, 6, 15),
        new Date(2014, 7, 14),
        new Date(2015, 8, 15),
        new Date(2014, 9, 14),
        new Date(2015, 10, 15)
    ],
    currency:"EUR",
    locale:"en-US"
}
const account4={
    owner:"sarah smith",
    movements:[200,450,-400,3000,-650,-130,70,1300],
    intrestRate:1.2,
    pin:114,
    accDates: [
        new Date(2014, 2, 14),
        new Date(2015, 2, 15),
        new Date(2014, 5, 14),
        new Date(2015, 6, 15),
        new Date(2014, 7, 14),
        new Date(2015, 8, 15),
        new Date(2014, 9, 14),
        new Date(2015, 10, 15)
    ],
    currency:"EUR",
    locale:"en-US"
}
 const accounts=[account1,account2,account3,account4]
    
 let currDate=function(date){
 
 const calcDayPassed=(date1,date2)=>{
return Math.floor(Math.abs(date2-date1)/1000*60*60*24)
}
let dayPassed=calcDayPassed(new Date(),date);
console.log(dayPassed)
if(dayPassed===0) return "Today"
if(dayPassed===1) return "yesterday"
if(dayPassed===7) return "7dayes ago"
else{
let today=date.getDate()
let month=date.getMonth()
let year=date.getFullYear()
    return `${today}/${month}/${year}`
}

 }


 //intercurrency-function
let interCurr=function(value,locale,currency){
const options={
style:"currency",
currency:currency
    }
    return new Intl.NumberFormat(locale,options).format(value)
}



const dispalyMovements=function(acc){
movements.innerHTML=""
acc.movements.forEach((elem,i) => {
    let type=elem>0?"deposited":"credited";
    // type=="deposited"?classList(bg-red)
    const html=`<div class="movie">
         <div class="amdat">
             <div>
             ${type}
             </div>
         <div class="dat">
 ${currDate(new Date(acc.accDates[i]))}
         </div>
         </div>
         <div class="hat">
            
         ${interCurr(elem,acc.locale,acc.currency)}
         </div>
    </div>
        </div>`;

        movements.insertAdjacentHTML("afterbegin",html)
 
    
});

}



//have to add user  in all accounts

let allAccounts=function(acc){
    acc.forEach((acc,i)=>{
        acc.user=acc.owner.toLowerCase().split(" ").map((name)=>{
         return name[0] 

        }).join("")
    })


}
allAccounts(accounts)
 


//deposits array and withrawl array
let deposits=""
let withrals=""
const depoWith=function(account1){
 deposits= account1.movements.filter((mov)=>{
        return mov>0
        })
withrals= account1.movements.filter((mov)=>{
        return mov<0
        })
}

// console.log(deposits,withrals);
 

//current balance
let currentBalance = function (total) {
    let ourbalance = total.movements.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
    balance.innerHTML = `${interCurr(ourbalance,total.locale,total.currency)}`;
    currAcc.balance = ourbalance;
    console.log(currAcc);
};



//in out intrest

let inOut=function(total){
    let inaa=total.movements.filter((tot)=>{
        return tot>0
        }).reduce((acc,curr,i,arr)=>{
             
         return acc+curr
        },0)
        ina.innerHTML=`${interCurr(inaa,total.locale,total.currency)}`
let outaa=total.movements.filter((tot)=>{
    return tot<0
    }).reduce((acc,curr,i,arr)=>{
        
     return acc+curr
    },0)
    outa.innerHTML=`${interCurr(outaa,total.locale,total.currency)}`

    let intresta=total.movements.filter((tot)=>{
        return tot>0
        }).map((tot)=>{
return (tot*1.2)/100
        }).reduce((acc,curr,i,arr)=>{
            
         return acc+curr
        },0)
        intrest.innerHTML=`${interCurr(intresta,total.locale,total.currency)}`
}




//login functionality----------------------------------------------------
 let currAcc=""
 

const loginFun=function(allAcc){
    

form.addEventListener("click",(e)=>{
     
    e.preventDefault()
    
     currAcc=allAcc.find((elem)=>{
        return user.value===elem.user
    
    })
 
if(currAcc.user && currAcc.pin==Number(pin.value)){
    
    logic.style.opacity=100
    logic.style.transform="translateX(0)"
     
    welcome.innerHTML=` Welcome back -  ${currAcc.owner}!`
    transferMoney(accounts)
depoWith(currAcc)
 
currentBalance(currAcc)
inOut(currAcc)
dispalyMovements(currAcc)


user.value = "";
            pin.value = "";

            min=100
            timer()
            
             

} 
})


}
loginFun(accounts)

//transfer money--------------
let transferMoney=function(accounts){
    
    btn1.addEventListener("click",()=>{
let toAcc=accounts.find((acc)=>{
     
return to.value===acc.user

})
console.log(toAcc.movements)
console.log(currAcc.movements)
if(toAcc && Number(amount.value)>0 && toAcc.user!==currAcc.user && currAcc.balance>=Number(amount.value)){
    min=100
    timer()
    toAcc.movements.push(Number(amount.value))
    toAcc.accDates.push(new Date())
   currAcc.movements.push(Number(-amount.value))
   currAcc.accDates.push(new Date())

depoWith(currAcc);
            currentBalance(currAcc);
            inOut(currAcc);
            dispalyMovements(currAcc);
            to.value = "";
            amount.value = "";
}


    })


}

//request loan------------
const reqLoan=function(){
loanBtn.addEventListener("click",()=>{
 setTimeout(()=>{
    currAcc.movements.push(Number(loanInput.value))
    currAcc.accDates.push(new Date())
    currentBalance(currAcc);
            inOut(currAcc);
            dispalyMovements(currAcc);
              loanInput.value=""
 },3000)
   
          
})

}

console.log(reqLoan())

 //closeAcc--------------
const closeAccount=function(){

    closeBtn.addEventListener("click",()=>{
if(closeInput.value==currAcc.user && closePin.value==currAcc.pin){
    let index=accounts.findIndex((acc)=>{
     return  acc.user==currAcc.user
    })
    console.log(index)
    accounts.splice(index,1)
    welcome.innerHTML=""
    logic.style.opacity=0
    closeInput.value=""
    closePin.value=""
}

    })
}
closeAccount()



//timer-----------------




let timer=function(){
    
tim=setInterval(()=>{
   
   
    feet.innerHTML=`${min}s`

    
 if(min===0){
    
    clearInterval(tim)
    logic.style.opacity=0
    welcome.innerHTML=""
}
 
min--
 
},1000)
    
}

 