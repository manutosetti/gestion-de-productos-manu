let primerDes = document.getElementById("desplegable-nav");
let ocultar = document.getElementById('ocultar')
primerDes.addEventListener("mouseenter",()=>{
    ocultar.classList.toggle('ocultar')
    });
primerDes.addEventListener("mouseleave",()=>{
        ocultar.classList.toggle('ocultar')

        });
let agregarForm = document.getElementById("form-agregar");
let carritoPlus = document.getElementById("carrito-plus");

carritoPlus.addEventListener("click",(e)=>{
    e.preventDefault()
    agregarForm.classList.toggle("mostrar");
})
