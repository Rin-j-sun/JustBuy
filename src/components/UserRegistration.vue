<template>
  <div class="registration-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="registerUser" class="registration-form">
      <!-- Input fields for registration -->
      <div class="form-group">
        <label for="username">Имя пользователя:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="email">Электронная почта :</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Пароль:</label>
        <input type="confirmPassword" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <div class="form-group">
        <label for="confirmconfirmPassword">Повторите пароль:</label>
        <input type="confirmPassword" id="confirmconfirmPassword" v-model="confirmconfirmPassword" required>
      </div>
      <!-- Error messages -->
      <div v-if="error" class="error">{{ error }}</div>
      <!-- Registration button -->
      <button type="submit" class="registration-button">Зарегестрироваться</button>
    </form>
    <!-- Back button -->
    <button @click="goBack" class="back-button">На главную страницу</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      confirmPassword: '',
      error: ''
    }
  },
  methods: {
    async register() {
      const url = "https://jurapro.bhuser.ru/api-shop/signup";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          confirmPassword: this.confirmPassword
        })
      });
      if (response.ok) {
        this.$router.push('/login'); // Перенаправляем пользователя на авторизацию
      } else {
        this.error = "Ошибка при регистрации";
        console.error('Ошибка:', this.error);
      }


    },
    goBack(){
      this.$router.push('/');
    }

  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
