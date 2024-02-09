<template>
  <div class="shopping-cart">
    <h2>Корзина</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      Нет товаров в корзине
    </div>
    <div v-else>
      <div class="cart-item" v-for="(item, index) in cartItems" :key="index">
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>Цена за шт.: {{ item.price }} руб.</p>
          <p>Количество: {{ item.quantity }}</p>
          <p>Общая стоимость: {{ item.quantity * item.price }} руб.</p>
        </div>
        <div class="item-controls">
          <button @click="incrementItem(index)">+</button>
          <button @click="decrementItem(index)">-</button>
          <button @click="removeItem(index)">Удалить</button>
        </div>
      </div>
      <button @click="checkout" class="checkout-button">Оформить заказ</button>
    </div>
    <router-link to="/" class="back-button">Назад</router-link>
  </div>
</template>

<script >

export default {
  name: 'Cart',
  data() {
    return {
      productsCart: [],
      myOrder:[]
    };
  },
  created() {
    this.getProductCart();
  },
  methods: {
    async getProductCart(){
      const localToken = localStorage.getItem('userToken');
      if(!localToken){
        console.error('Токен отсутствует');
        return;
      }
      const url = "https://jurapro.bhuser.ru/api-shop/cart";
      const response = await fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localToken}`
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.productsCart = result.data

        console.log('Result: ', result)

      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }


    },
    async removeFromCart(product) {

      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        console.error('Токен отсутствует');
        return;
      }

      const url = `https://jurapro.bhuser.ru/api-shop/cart/${product.id}`;
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {

            "Authorization": `Bearer ${userToken}`
          }
        });
        if (response.ok) {
          this.productsCart = this.productsCart.filter(cartItem => cartItem.id !== product.id);
          console.log("Товар успешно удален!");
          const data = await response.json();
          console.log(data.data.message);
        } else {
          console.error("Ошибка удаления товара из корзины:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка удаления товара из корзины:", error);
      }
    },

    async addToMyOrder(product) {
      const url = 'https://jurapro.bhuser.ru/api-shop/order';
      const userToken = localStorage.getItem('userToken');
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          }
        });
        if (response.ok) {
          const existingItemIndex = this.myOrder.findIndex(item => item.id === product.id);
          if (existingItemIndex !== -1 && this.productExists(this.myOrder[existingItemIndex], product)) {
            this.myOrder[existingItemIndex].quantity++;
          } else {
            this.myOrder.push({...product});
          }
          const data = await response.json();
          console.log(data.data.message);
          this.$router.push('/order');
        } else {
          console.error("Ошибка добавления товара в мои заказы:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка добавления товара в мои заказы:", error);
      }
    },
    productExists(item1, item2) {
      return item1.id === item2.id && item1.name === item2.name && item1.description === item2.description && item1.price === item2.price;
    },
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
