// =============================
// Tribal Tourism Portal JS
// =============================

// Mobile Menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle){
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if(navLinks.classList.contains("active")){
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        }else{
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });
}

// Sticky Header
const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 100){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }

});

// Scroll To Top Button
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

// Smooth Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

        navLinks.classList.remove("active");

    });

});

// Hero Animation
window.addEventListener("load",()=>{

    document.querySelector(".hero-content").style.opacity="1";
    document.querySelector(".hero-content").style.transform="translateY(0)";

});

// Scroll Reveal Animation
const revealElements=document.querySelectorAll(
".welcome,.features,.about,.counter,.gallery,footer"
);

const revealOnScroll=()=>{

    revealElements.forEach(section=>{

        const windowHeight=window.innerHeight;

        const revealTop=section.getBoundingClientRect().top;

        if(revealTop<windowHeight-120){

            section.style.opacity="1";
            section.style.transform="translateY(0)";
            section.style.transition="all 1s ease";

        }

    });

};

revealElements.forEach(section=>{

    section.style.opacity="0";
    section.style.transform="translateY(80px)";

});

window.addEventListener("scroll",revealOnScroll);

revealOnScroll();

// Animated Counter
const counters=document.querySelectorAll(".count h2");

let started=false;

window.addEventListener("scroll",()=>{

    const counterSection=document.querySelector(".counter");

    if(!counterSection) return;

    const position=counterSection.getBoundingClientRect().top;

    if(position<window.innerHeight && !started){

        started=true;

        counters.forEach(counter=>{

            const text=counter.innerText;

            const target=parseInt(text.replace(/\D/g,""));

            const suffix=text.replace(/[0-9]/g,"");

            let count=0;

            const speed=Math.ceil(target/100);

            const update=()=>{

                count+=speed;

                if(count<target){

                    counter.innerHTML=count+suffix;

                    requestAnimationFrame(update);

                }else{

                    counter.innerHTML=target+suffix;

                }

            };

            update();

        });

    }

});

// Gallery Hover Effect
document.querySelectorAll(".gallery-box img").forEach(img=>{

    img.addEventListener("mouseenter",()=>{

        img.style.transform="scale(1.08) rotate(-2deg)";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.transform="scale(1)";

    });

});

// Button Ripple Effect
document.querySelectorAll(".btn,.btn-outline").forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.classList.add("ripple");

        const rect=this.getBoundingClientRect();

        ripple.style.left=(e.clientX-rect.left)+"px";
        ripple.style.top=(e.clientY-rect.top)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});