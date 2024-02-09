<template>
  <div class="user-orders">
    <h2>Оформленные заказы</h2>
    <div v-if="orders.length === 0" class="empty-orders">
      Нет оформленных заказов
    </div>
    <div v-else>
      <div class="order" v-for="(order, index) in orders" :key="index">
        <h3>Заказ #{{ order.id }}</h3>
        <p>Дата оформления: {{ order.date }}</p>
        <p>Сумма заказа: {{ order.total }} руб.</p>
        <ul>
          <li v-for="(item, i) in order.items" :key="i">
            {{ item.name }} - {{ item.quantity }} шт.
          </li>
        </ul>
      </div>
    </div>
    <button @click="goBack" class="back-button">Назад</button>
  </div>
</template>

<script >
export default {
  data() {
    return {
      myOrders:[]
    }
  },
  created() {
    this.getProductOrder();
  },
  methods: {
    async getProductOrder(){
      const localToken = localStorage.getItem('userToken');
      if(!localToken){
        console.error('Токен отсутствует');
        return;
      }
      const url = "https://jurapro.bhuser.ru/api-shop/order";
      const response = await fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localToken}`
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.myOrders = result.data
        console.log('Result: ', result)

      } else {
        this.error = "Ошибка получения оформленных заказов";
        console.error(this.error);
      }
    },
  }
}
</script>


<!--<style scoped>-->

<!--</style>-->
