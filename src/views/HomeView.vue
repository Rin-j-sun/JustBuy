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
export default {
  name: 'HomeView',
  data() {
    return {
      // Список товаров из каталога
      products: [
        {id: 1, name: 'Товар', description: 'Хороший товар', image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 2, name: 'Товар', description: 'Хороший товар', image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 3, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 4, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 5, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 6, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 7, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 8, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 9, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 10, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 11, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 12, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 13, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 14, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 15, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 16, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 17, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
        {id: 18, name: 'Товар', description: 'Хороший товар',image: require('@/assets/img/product.jpeg'), price: 111},
      ],
      // Статус авторизации пользователя
      isLoggedIn: false,
      // Роль пользователя (для демонстрации)
      role: 'client', // Может быть 'client', 'admin' и т.д.
      // Никнейм пользователя
      username: ''
    };
  },
  computed: {
    // Проверка роли пользователя на клиента
    isClient() {
      return this.role === 'client';
    }
  },
  methods: {
    // Добавление товара в корзину (для демонстрации)
    addToCart(product) {
      // Создаем копию товара для корзины
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1 // При добавлении в корзину количество товара устанавливаем равным 1
      };

      // Загружаем корзину из localStorage
      let cartItems = localStorage.getItem('cartItems');
      cartItems = cartItems ? JSON.parse(cartItems) : [];

      // Проверяем, есть ли уже такой товар в корзине
      const existingItemIndex = cartItems.findIndex(item => item.id === cartItem.id);

      if (existingItemIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем его количество
        cartItems[existingItemIndex].quantity++;
      } else {
        // Иначе добавляем новый товар в корзину
        cartItems.push(cartItem);
      }

      // Сохраняем корзину в localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      console.log('Товар добавлен в корзину:', cartItem);
    },
    // Выход из аккаунта
    logout() {
      this.isLoggedIn = false;
      this.username = '';
      console.log('Выход из аккаунта');
    }
  },
  created() {
    // Проверяем, авторизован ли пользователь
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      this.isLoggedIn = true;
      this.username = userData.username;
    }
  }
};
</script>

<!--<style scoped>-->
<!--/* Стили*/-->

<!--</style>-->