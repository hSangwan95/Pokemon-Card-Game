const fightBtn=document.getElementById("fight");
const imgEl0=document.getElementById("img0");
const imgEl1=document.getElementById("img1");
const card0Name=document.getElementById("name0");
const card1Name=document.getElementById("name1");
const card0Exp=document.getElementById("experience0");
const card1Exp=document.getElementById("experience1");
const card0Abi=document.getElementById("abilities0");
const card1Abi=document.getElementById("abilities1");
const p1Score=document.getElementById("p1_score");
const p2Score=document.getElementById("p2_score");
var imgSwitch=false;
var p1Scount=0;
var p2Scount=0;
var p1exp=0;
var p2exp=0;


fightBtn.addEventListener('click',()=>{
    
    
    displayPokemon();
    displayPokemon();
    cleadDisplay();
    calculateScore();
})

function cleadDisplay(){
    imgEl0.innerHTML="";
    imgEl1.innerHTML="";
    card0Abi.innerHTML="";
    card1Abi.innerHTML="";
}

function displayPokemon(){
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20")
    .then((response)=>{
        return (response.json());   
    }).then((result)=>{
        getPokemon(result.results,imgSwitch);
        imgSwitch=!imgSwitch;
    });
}

function getPokemon(arr,imgSw){
    const arrLen=arr.length;
    const elID1=Math.floor(Math.random()*20);
    fetch(`${arr[elID1].url}`)
        .then((response)=>{
            return (response.json());        
        }).then((result)=>{
            console.log(result);
            const abilityArr=result.abilities;
            pok(result.sprites.other.dream_world.front_default,imgSw,result.name,result.base_experience,abilityArr);        
                
        })
}

function pok(imageUrl,sw,pName,exp,abilityArr){
    const frontDisplay=document.createElement("img");
    frontDisplay.src=imageUrl;
    console.log(sw);

    if(!sw){   
        imgEl0.appendChild(frontDisplay);
        card0Name.innerText=pName;
        card0Exp.innerText=exp;
        p1exp=exp;
        abilityArr.forEach(element => {
            let abEl=document.createElement("li");
            abEl.textContent=element.ability.name;
            card0Abi.appendChild(abEl);
        });
    }else if(sw){
        imgEl1.appendChild(frontDisplay);
        card1Name.innerText=pName;
        card1Exp.innerText=exp;
        p2exp=exp;
        abilityArr.forEach(element => {
            let abEl=document.createElement("li");
            abEl.textContent=element.ability.name;
            card1Abi.appendChild(abEl);
        }); 
    }   
}
//WORK ON CALCULATE SCORE
function calculateScore(){
    p1Score.innerHTML=`Score:${p1Scount}`;
    p2Score.innerHTML=`Score:${p2Scount}`;
    console.log(card0Exp.textContent);

    if(p1exp>p2exp){
        p1Score.innerHTML=`Score:${p1Scount++}`;
    }else{
        p2Score.innerHTML=`Score:${p2Scount++}`;
    }
    
}

