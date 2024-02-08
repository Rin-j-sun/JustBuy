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
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Повторите пароль:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <!-- Error messages -->
      <div v-if="error" class="error">{{ error }}</div>
      <!-- Registration button -->
      <button type="submit" class="registration-button">Регистрация</button>
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
      password: '',
      confirmPassword: '',
      error: ''
    };
  },
  methods: {
    registerUser() {
      // Проверяем, есть ли пользователь с таким же никнеймом или почтой уже зарегистрирован
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        if (userData.username === this.username) {
          // Если пользователь с таким же никнеймом уже зарегистрирован, выводим сообщение об ошибке
          this.error = 'Пользователь с таким никнеймом уже зарегистрирован';
          return; // Прерываем выполнение метода, чтобы избежать сохранения нового пользователя
        }
        if (userData.email === this.email) {
          // Если пользователь с такой же почтой уже зарегистрирован, выводим сообщение об ошибке
          this.error = 'Пользователь с такой почтой уже зарегистрирован';
          return; // Прерываем выполнение метода, чтобы избежать сохранения нового пользователя
        }
      }

      // Сохраняем данные нового пользователя в локальное хранилище
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      localStorage.setItem('userData', JSON.stringify(userData));

      // Очищаем поля формы после регистрации
      this.username = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';

      // После успешной регистрации перенаправляем пользователя на страницу авторизации
      this.$router.push('/login');
    },
    goBack() {
      // Переходим на главную страницу
      // Здесь необходимо реализовать навигацию с помощью маршрутизатора Vue Router
      console.log('Перенаправлен на главный экран');

      // Пример перехода на главную страницу с использованием маршрутизатора Vue Router
      this.$router.push('/');
    },
  }
};
</script>

<!--<style scoped>-->

<!--</style>-->
