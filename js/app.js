const hamburguesa = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const enlaces = document.querySelectorAll('.navegacion a');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnMotherboard = document.querySelector('.motherboard');
const btnPlacaDeVideo = document.querySelector('.placa-de-video');
const btnDiscoSolido = document.querySelector('.disco-solido');
const btnCartuchos = document.querySelector('.cartucho');
const contenedorProductos = document.querySelector('.contenido-productos');
const fecha = document.querySelector('.fecha');
document.addEventListener('DOMContentLoaded',()=>{
    mostrarMenu();
    cerrarMenu();
    productos();
    fechaActual();
});

function mostrarMenu(){
    hamburguesa.addEventListener('click',()=>{
        navegacion.classList.toggle('ocultar');

        
        /*if (navegacion.classList.contains('ocultar')){
            navegacion.classList.remove('ocultar');
        }else{
            navegacion.classList.add('ocultar');
        }*/
        
    }); 
}

function cerrarMenu(){
    enlaces.forEach(enlace =>{
        enlace.addEventListener('click',(e)=>{
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            cambioSeccion(seccion);
            if(e.target.tagName === 'A'){
                navegacion.classList.add('ocultar');
            }
        });
    });
}

function cambioSeccion(seccion){
    seccion.scrollIntoView({
        behavior:'smooth'
    })
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    }); 
});

imagenes.forEach(imagen=>{
    observer.observe(imagen);
})

const productos = () =>{
    let productosArreglo = [];
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto=> productosArreglo = [...productosArreglo,producto]);

    const motherboards = productosArreglo.filter(motherboard=> motherboard.getAttribute('data-producto') === 'motherboard');
    const placaVideos = productosArreglo.filter(placaVideo => placaVideo.getAttribute('data-producto') === 'placaVideo');
    const discoSolidos = productosArreglo.filter(discoSolido => discoSolido.getAttribute('data-producto') === 'discoSolido');
    const cartuchos = productosArreglo.filter(cartucho=> cartucho.getAttribute('data-producto') === 'cartucho');

    mostrarProductos(motherboards, placaVideos, discoSolidos, cartuchos, productosArreglo);

}

const mostrarProductos = (motherboards, placaVideos, discoSolidos, cartuchos, todos) =>{
    btnMotherboard.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        motherboards.forEach(motherboard=> contenedorProductos.appendChild(motherboard));
    });

    btnPlacaDeVideo.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        placaVideos.forEach(placaVideo=> contenedorProductos.appendChild(placaVideo));
    });

    btnDiscoSolido.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        discoSolidos.forEach(discoSolido=> contenedorProductos.appendChild(discoSolido));
    });
    btnCartuchos.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        cartuchos.forEach(cartucho=> contenedorProductos.appendChild(cartucho));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        todos.forEach(todo=> contenedorProductos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}


function iniciarMap(){
    var coord = {lat:-34.5841135 ,lng: -58.4469959};
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 15,
        center: coord
        });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
}


function fechaActual(){
    let fechaHoy = new Date().getFullYear();
    fecha.textContent = fechaHoy;
}