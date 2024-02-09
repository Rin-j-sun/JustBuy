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
        <label for="confirmPassword">Пароль:</label>
        <input type="confirmPassword" id="confirmPassword" v-model="confirmPassword" required :class="{ 'error': confirmPasswordError }">
        <div v-if="confirmPasswordError" class="error">Введите пароль</div>
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
      confirmPassword: '',
      error: '',
      isAuthenticated: false,
    }
  },
  methods: {
    async login() {
      const url = "https://jurapro.bhuser.ru/api-shop/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          confirmPassword: this.confirmPassword
        })
      });
      if (response.ok) {
        const userToken = await response.json();
        localStorage.setItem('userToken', userToken.data.user_token);
        this.$router.push('/'); // Перенаправляем пользователя на главную страницу
      } else {
        this.error = "Неверные учетные данные";
        console.error('Ошибка:', this.error);
      }
      this.isAuthenticated = true
    },
    goBack(){
      this.$router.push('/');
    }

  }
}
</script>

<!--<style>-->

<!--</style>-->
