<template>
  <div class="login-container">
    <h2>Вход в систему</h2>
    <form @submit.prevent="loginUser" class="login-form">
      <div class="form-group">
        <label for="email">Электронная почта :</label>
        <input type="email" id="email" v-model="email" required :class="{ 'error': emailError }">
        <div v-if="emailError" class="error">Введите корректный адрес электронной почты</div>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required :class="{ 'error': passwordError }">
        <div v-if="passwordError" class="error">Введите пароль</div>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit" class="login-button">Войти</button>
    </form>
    <button @click="goBack" class="back-button">На главную страницу</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      error: ''
    };
  },
  methods: {
    async loginUser() {
      const url = "https://jurapro.bhuser.ru/api-shop";
      // Получаем данные пользователя из локального хранилища
      // const savedUserData = localStorage.getItem('userData');
      const response = await fetch(url  + '/login' ,   {
        method: "POST",
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
      const result = await response.json();
      console.log('response: ', result);
      // if (savedUserData) {
      //   const userData = JSON.parse(savedUserData);
      //   if (userData.email === this.email && userData.password === this.password) {
      //
      //     this.$router.push('/'); // Перенаправляем пользователя на главную страницу
      //   } else {
      //     this.error = 'Неверные учетные данные';
      //   }
      // } else {
      //   this.error = 'Пользователь не найден';
      // }
    },
    goBack() {
      // Переходим на главную страницу
      this.$router.push('/');
    }
  }
};
</script>

<!--<style>-->

<!--</style>-->
