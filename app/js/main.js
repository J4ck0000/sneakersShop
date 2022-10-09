//Cambio de cantidad de articulos ingresado por el usuario

let minusBtn = document.querySelector(".input__minus");
let plusBtn = document.querySelector(".input__plus");
let userInput = document.querySelector(".input__number");


let userInputNumber = 0;

plusBtn.addEventListener("click",()=>{
  userInputNumber++;
  userInput.value = userInputNumber;
})

minusBtn.addEventListener("click",()=>{
  userInputNumber--;
  if(userInputNumber<=0){
    userInputNumber=0;
  }
  userInput.value = userInputNumber;
})


//Agregar el total de productos al carrito cuando se presiona el boton a ADD TO CART

const addToCartBtn = document.querySelector(".details__button");
let cartNotification = document.querySelector(".header__cart--notification");
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener("click",()=>{


  lastValue= lastValue+userInputNumber;

  
  drawProductInModal();

  if(userInput.value>0){

    if(window.innerWidth>=1115){
      Toastify({

        text: "Product add to cart!",
        duration: 2000,
        offset: {
          x: 750, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
        
        }).showToast();
    }
    else{
      Toastify({

        text: "Product add to cart!",
        duration: 2000,
        offset: {
          x: 130, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 50 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
        
        }).showToast();
    }
    
    
  }

  if (lastValue>0){
    cartNotification.innerText= lastValue;
    cartNotification.style.display='block';
  }
  
  
})


//Mostrar modal con el detalle del carrito

const cartIconBtn = document.querySelector(".header__cart");
const cartModal = document.querySelector(".cart-modal");
// let priceModal = document.querySelector(".cart-modal__price");
const productContainer = document.querySelector('.cart-modal__chekout-container');

cartIconBtn.addEventListener("click",()=>{
  cartModal.classList.toggle('show');
  
  if (lastValue==0){
    productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    
  }

  else{
    drawProductInModal();
  }
})


//Confirmar compra con el boton CKECKOUT

function confirmButton(){
  let checkoutBtn = document.querySelector('.cart-modal__checkout')

  checkoutBtn.addEventListener("click",()=>{
   
     
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, buy it!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire(
      'Thanks for you buy!',
      'Your buy has been acepted.',
      'success',
      lala()
      
    )

    
    
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'Your buy has been cancell',

    )
  }
})

    
  })
}




//Borrar el contenido del carrito

  function deleteProduct(){

    const deleteProductBtn = document.querySelector('.cart-modal__delete');
  
    deleteProductBtn.addEventListener("click",()=>{
      productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
      lastValue=0;
      cartNotification.style.display='none';
    })

  }


  //Cambiar las imagenes cuando se presiones los botones flechas
 
  const imageContainer = document.querySelector('.gallery__image-container');
  const previousGalleryBtn = document.querySelector('.gallery__previous');
  const nextGalleryBtn = document.querySelector('.gallery__next');
  let imgIndex = 1;

  const imagesUrls = [
    '../../images/image-product-1.jpg',
    '../../images/image-product-2.jpg',
    '../../images/image-product-3.jpg',
    '../../images/image-product-4.jpg'
  ];

  nextGalleryBtn.addEventListener("click",()=>{
     changeNextImage(imageContainer);
  })

  previousGalleryBtn.addEventListener("click", ()=>{
    changePreviousImage(imageContainer);
  })



  //Mostrar el modal de imagenes cuando hago click en la imagen principal

  const imageModal = document.querySelector('.modal-gallery__background');
  const closeImageModal = document.querySelector('.modal-gallery__close-container');


  imageContainer.addEventListener("click",()=>{
    if(window.innerWidth>=1115){
      imageModal.style.display = 'grid';
    }
    
  })

  closeImageModal.addEventListener("click",()=>{
    imageModal.style.display = 'none';
  })


  //Cambiar las imagenes principales en el modal con next y previous

  const modalImageContainer = document.querySelector('.modal-gallery__image-container');
  const modalPreviousGalleryBtn = document.querySelector('.modal-gallery__previous');
  const modalNextGalleryBtn = document.querySelector('.modal-gallery__next');

  modalNextGalleryBtn.addEventListener("click",()=>{
    changeNextImage(modalImageContainer);
  })

  modalPreviousGalleryBtn.addEventListener("click",()=>{
    changePreviousImage(modalImageContainer);
  })
    
    
  //Cambiar las imagenes principales con los thumbnails

  let thumbnails = document.querySelectorAll('.gallery__thumbnail')
  thumbnails = [...thumbnails]
  
  thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click",(e)=>{
        imageContainer.style.backgroundImage = `url('../../images/image-product-${e.target.id}.jpg')`
      })
  });


  //Cambiar las imagenes principales desde los thumbnails en el MODAL

  let modalThumbnails = document.querySelectorAll('.modal-gallery__thumbnail')
  modalThumbnails = [...modalThumbnails];

  modalThumbnails.forEach(modalThumbnail=>{
    modalThumbnail.addEventListener("click",(e)=>{
      console.log(e.target.id.slice(-1))
      modalImageContainer.style.backgroundImage = `url('../../images/image-product-${e.target.id.slice(-1)}.jpg')`
    })
  })


  //Mostrar el navbar caundo presiono el boton de hambuerguesa
  const hamburguerMenu = document.querySelector('.header__menu');
  const modalNavbar = document.querySelector('.modal-navbar__background');
  const closeModalNavbar = document.querySelector('.modal-navbar__close-icon');

  modalNavbar.style.display = 'none';

  hamburguerMenu.addEventListener("click",()=>{
    modalNavbar.style.display = 'block';
  })

  closeModalNavbar.addEventListener("click",()=>{
    modalNavbar.style.display = 'none';
  })

  //funciones

  function drawProductInModal(){
    productContainer.innerHTML= `
      <div class="cart-modal__details-container">
        <img class="cart-modal__image" src="images/image-product-1-thumbnail.jpg" alt="">
        <div>
          <p class="cart-modal__product">Autum Limited Edition..</p>
          <p class="cart-modal__price">$125 x0 <span>$0.00</span></p>
        </div>
        <img class="cart-modal__delete" src="images/icon-delete.svg" alt="delete">
      </div>
    <button class="cart-modal__checkout">Checkout</button>`

    confirmButton();
    deleteProduct();
    let priceModal = document.querySelector(".cart-modal__price");
    priceModal.innerHTML=`$125 x${lastValue} <span>$${lastValue*125}.00</span>`
  }

  function changeNextImage(imgContainer){
    if(imgIndex===4){
      imgIndex= 1;
    }
    else{
      imgIndex++;
    }
    
    imgContainer.style.backgroundImage = `url('../../images/image-product-${imgIndex}.jpg')`
  }


  function changePreviousImage(imgContainer){
    if(imgIndex===1){
      imgIndex= 4;
    }
    else{
      imgIndex--;
    }
    
    imgContainer.style.backgroundImage = `url('../../images/image-product-${imgIndex}.jpg')`
  }

  function lala(){
    productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
      lastValue=0;
      cartNotification.style.display='none';
      cartModal.classList.toggle('show');
      userInput.value=0;
      userInputNumber=userInput.value;
      
  }