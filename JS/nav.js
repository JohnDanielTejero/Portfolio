
navButtons();
navPadding();
popUps();

var toggler = document.querySelector("#nav-button-toggle");

let body = document.querySelector("body");

const delayExecution = (cb, delay = 0) => {
    
    let cooldown = false;

    return function(){
        if (cooldown){
            cooldown = false;
            return 
        }else{
            cooldown = true;
            setTimeout(cb, delay);
        }
    }

}

window.onresize = delayExecution(function(){
    navButtons();
    navPadding();
    popUps();
    if (window.innerWidth > 900){
            toggler.checked = false;
            body.classList.remove("overflow-hidden");
    }

    const popOver = document.querySelectorAll(".nav-item-popovers");
    popOver.forEach((e) =>{
        e.setAttribute("data-popover-toggled", false);
    });
})

let navigatorButtons = document.querySelectorAll(".nav-item-links");

navigatorButtons.forEach(nav => {
    if (window.innerWidth <= 900){
        nav.addEventListener("click", () => {
            toggler.checked = false;
            body.classList.remove("overflow-hidden");
        }); 
    }   
});


toggler.addEventListener("change", function(){
    
    if (toggler.checked == true){
        body.classList.add("overflow-hidden");
    }else{
        body.classList.remove("overflow-hidden");
    }
});

function navButtons(){
    let wrappers = document.querySelectorAll(".nav-items-wrapper");
    let navigatorButtons = document.querySelectorAll(".nav-item-links");

    wrappers.forEach((wrapper) => {
        wrapper.style.setProperty("--nav-links", navigatorButtons.length);
    })
}

function navPadding(){
    let navHeight = document.querySelector("#navigation-header").offsetHeight;
    document.documentElement.style.setProperty("--scroll-padding", navHeight + "px");
}

/*popover*/
const popUpButtons = document.querySelectorAll(".nav-item-links[data-nav-item-type]");

const dismissPopOver = document.querySelectorAll(".popover-dismiss");
dismissPopOver.forEach((button) =>{
    button.addEventListener("click", function(){
        const target = document.querySelector(button.getAttribute("data-popover-dismiss"));
        target.setAttribute("data-popover-toggled", false);
        body.classList.remove("overflow-hidden");
    })
})

popUpButtons.forEach((button) => {
    button.addEventListener("click", function(){
        const target = document.querySelector(button.getAttribute("data-popup-target"));
        let body = document.querySelector("body");

        if (target.getAttribute("data-popover-toggled") == "false"){
            target.setAttribute("data-popover-toggled", true);
            if (button.getAttribute("data-nav-item-type") == "cover"){
                body.classList.add("overflow-hidden");
            }
        }else{
            target.setAttribute("data-popover-toggled", false);
        }
    });
});

function popUps(){
    const popUpButtons = document.querySelectorAll(".nav-item-links[data-nav-item-type]");
    popUpButtons.forEach((button) => {
        let body = document.querySelector("body");
        if (window.innerWidth <= 900){
            button.setAttribute("data-nav-item-type", "cover");
        }else{
            button.setAttribute("data-nav-item-type", "popup");
        }
    })
}
