// ======= default data =======
const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const button = document.querySelector("#submit-button");
const URL = 'https://ac-w3-dom-pos.firebaseio.com/products.json'

// 菜單資料
let productData = []
let cartData = []
axios.get(URL).then(function (res) {
  productData = res.data
  // console.log(productData)
  renderPanel(productData)
}).catch(err => console.log(err))
//[
// {
//   id: "product-1",
//   imgUrl:
//     "https://images.unsplash.com/photo-1558024920-b41e1887dc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   name: "馬卡龍",
//   price: 90
// },
// {
//   id: "product-2",
//   imgUrl:
//     "https://images.unsplash.com/photo-1560691023-ca1f295a5173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   name: "草莓",
//   price: 60
// },
// {
//   id: "product-3",
//   imgUrl:
//     "https://images.unsplash.com/photo-1568271675068-f76a83a1e2d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   name: "奶茶",
//   price: 100
// },
// {
//   id: "product-4",
//   imgUrl:
//     "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   name: "冰咖啡",
//   price: 180
// }
//];
// ======= 請從這裡開始 =======

let cardTable = "";

// console.log(productData)
// console.log(productData.[0])
// console.log(productData.[0].id)

function renderPanel(data) {
  data.forEach((product) => {
    cardTable += `
    <div class="col-3">
      <div class="card">
        <img src="${product.imgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.price}</p>
          <a href="#" class="btn btn-primary" id="${product.id}">加入購物車</a>
        </div>
      </div>
    </div>
  `;
  });
  menu.innerHTML = cardTable;
}


// console.log(cardTable);



// function stringSplit(string) {
//   const stringWithoutSpace = string.trim();
//   const split = stringWithoutSpace.split(" ");
//   return split;
// }

function submit(event) {
  let show = " 感謝購買";
  const number = cart.children.length
  for (let i = 0; i < number; i++) {
    show += `
 ${cart.children[i].textContent}`
  }
  show += `
 此次消費總金額為 ${totalAmount.textContent} 元`;
  alert(show);
  cartData.splice(0)
  cart.innerHTML = "";
  totalAmount.textContent = "--";
}


function addToShoppingCart(event) {
  const target = event.target;
  // console.log(target.id);

  let product = productData.find(function (item) {
    return item.id === target.id
  })

  // console.log(product) 

  const addProduct = cartData.find(item => item.id === product.id)

  if (addProduct) {
    addProduct.number += 1
  } else {
    product.number = 1
    cartData.push(product)
  }

  cart.innerHTML = cartData.map(function (item) {
    return `   
    <li class="list-group-item">${item.name} X ${item.number} 小計：${item.price * item.number}</li>
  `}).join('')

  console.log(cart)

  //箭不箭頭差在哪裡= =?????
  // cart.innerHTML = cartData.map(item => `
  //   <li class="list-group-item">${item.name} X ${item.number} 小計：${item.price * item.number}</li>
  // `).join('')

  // console.log(cartData)
  // const name = product.name;
  // let price = product.price;
  // let number = 1;

  let amout = 0;
  for (let i = 0; i < cartData.length; i++) {
    amout += Number(cartData[i].price * cartData[i].number);
    totalAmount.textContent = amout;
  }
}

menu.addEventListener("click", addToShoppingCart);

button.addEventListener("click", submit);