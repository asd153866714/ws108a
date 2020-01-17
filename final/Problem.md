# 問題

## 購物車
 
    <script>
    let productsId = 0

    function addItemToCart(productId){
        var productName = document.getElementById("Name-" + productId).textContent
        var productPrice = document.getElementById("Price-" + productId).textContent
        var productQuantity = document.getElementById("Quantity-" + productId).value

        let products = {
            Id : productsId,
            Name : productName,
            Price : productPrice,
            Quantity : productQuantity
        }
        
        localStorage.setItem('products-' + productsId, JSON.stringify(products))
        productsId ++
        console.log('add success', products)  
    }
    </script>
    
切換頁面後再回來，紀錄商品排序的 `productsId` 會歸零，導致`localStorage`從0開始算

