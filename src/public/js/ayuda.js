const container = document.getElementById("container-nav")

container.addEventListener("click", (e)=>{
    if(e.target.classList.contains("list-div"))
        e.target.parentElement.classList.toggle("scale")
        e.target.children[1].classList.toggle("rotate")
})