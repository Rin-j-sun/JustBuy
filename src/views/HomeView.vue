<template>
  <div class="home-container">
    <!-- Кнопки регистрации и авторизации -->
    <div class="auth-buttons" v-if="!isLoggedIn">
    <div class="buttons_aut" v-if="!isLoggedIn">
      <button class="other_button"><router-link to="/registration" class="auth-button">Регистрация</router-link></button>
      <button class="other_button"><router-link to="/login" class="auth-button">Авторизация</router-link></button>
    </div>
    </div>

    <!-- Никнейм и кнопка выхода -->
    <div v-else class="user-info">
      <p>Пользователь: {{ username }}</p>
      <div class="nav_but">
      <button @click="logout" class="logout-button">Выход</button>
      <!-- Кнопка перехода в корзину -->
      <button class="other_button"><router-link v-if="isLoggedIn" to="/cart" class="cart-button">Корзина</router-link></button>
      <button class="other_button"><router-link v-if="isLoggedIn" to="/orders" class="orders-button">Оформленные заказы</router-link></button>
    </div>
    </div>
    <h1>Каталог товаров</h1>
    <!-- Список товаров из каталога -->
    <div class="prod_containeer">
    <div class="product" v-for="product in products" :key="product.id">
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <img :src="product.image" alt="Product" class="product-image">
        <p>{{ product.description }}</p>
        <p class="product-price">Цена: {{ product.price }} руб.</p>
      </div>
      <!-- Показывать кнопку "Добавить в корзину" только для авторизованных пользователей-клиентов -->
      <button v-if="isClient && isLoggedIn" @click="addToCart(product)" class="add-to-cart-button">Добавить в корзину</button>
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
      productsInCart: []
    }

  },
  created() {
    this.getProduct();
  },
  methods:{
    async getProduct(){
      const url = "https://jurapro.bhuser.ru/api-shop/products";
      const response = await fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.products = result.data
        console.log('Result: ', result)
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }


    },
    async addToCart(product) {
      const productId = product.id;
      const url = `https://jurapro.bhuser.ru/api-shop/cart/${productId}`;
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
          const existingItemIndex = this.productsInCart.findIndex(item => item.id === product.id);
          if (existingItemIndex !== -1 && this.productExists(this.productsInCart[existingItemIndex], product)) {
            this.productsInCart[existingItemIndex].quantity++;
          } else {
            this.productsInCart.push({...product, quantity: 1});
          }
          const data = await response.json();
          console.log(data.data.message);
        } else {
          console.error("Ошибка добавления товара в корзину:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка добавления товара в корзину:", error);
      }
    },
    productExists(item1, item2) {
      // Функция для проверки идентичности товаров
      return item1.id === item2.id && item1.name === item2.name && item1.description === item2.description && item1.price === item2.price;
    },

    logout(){
      localStorage.removeItem('userToken');
      this.$router.push('/');

    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('userToken');
    }
  }

}
</script>
<!--<style scoped>-->
<!--/* Стили*/-->

<!--</style>-->