const items = document.querySelectorAll(".card,.box,.stat,.review,.why-container div");

function reveal() {

items.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<window.innerHeight-100){

item.style.opacity="1";
item.style.transform="translateY(0)";

}

});

}

items.forEach(item=>{

item.style.opacity="0";
item.style.transform="translateY(60px)";
item.style.transition="all 0.8s ease";

});

window.addEventListener("scroll",reveal);

reveal();