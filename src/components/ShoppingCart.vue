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

<script>
export default {
  data() {
    return {
      cartItems: [] // Список товаров в корзине
    };
  },
  methods: {
    incrementItem(index) {
      this.cartItems[index].quantity++;
      this.saveCart();
    },
    decrementItem(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
        this.saveCart();
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    },
    checkout() {
      // Добавление текущего заказа в список оформленных заказов
      const newOrder = {
        id: Math.floor(Math.random() * 1000), // Генерация временного ID
        date: new Date().toLocaleDateString(),
        total: this.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0),
        items: this.cartItems.map(item => ({id: item.id, name: item.name, quantity: item.quantity}))
      };
      // Получение списка заказов из localStorage
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      // Добавляем новый заказ в список
      orders.push(newOrder);
      // Сохраняем обновленный список заказов в localStorage
      localStorage.setItem('orders', JSON.stringify(orders));
      // Очистка корзины после оформления заказа
      this.cartItems = [];
      this.saveCart();
      // Переход на страницу с заказами
      this.$router.push('/orders');
    },
    saveCart() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  },
  created() {
    // Загружаем корзину из localStorage при создании компонента
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
    }
  }
};
</script>

<!--<style scoped>-->

<!--</style>-->
