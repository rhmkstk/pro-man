<template>
  <div class="wrapper">
    <div class="form">
      <div class="head" :class="formView.class">
        <h3>{{ formView.head }}</h3>
      </div>
      <p
        class="authMessage"
        :class="getAuthMessage.error ? 'errorMes' : 'successMes'"
      >
        {{ getAuthMessage.message }}
      </p>
      <section class="input">
        <input type="text" placeholder="Email" v-model="authInfo.user.email" />
        <input
          type="text"
          placeholder="Password"
          v-model="authInfo.user.password"
        />
      </section>
      <button :class="formView.class" @click="sign">{{ formView.head }}</button>
      <span @click="isActiveFormLogin = !isActiveFormLogin">{{
        formView.bottom
      }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      isActiveFormLogin: true,
      authInfo: {
        user: {
          email: '',
          password: '',
          returnSecureToken: true
        }
      }
    }
  },
  methods: {
    sign() {
      if (this.isActiveFormLogin) {
        this.$store.dispatch('login', this.authInfo)
        return
      }
      this.$store.dispatch('signIn', this.authInfo)
    }
  },
  computed: {
    ...mapGetters(['getAuthMessage']),
    formView() {
      return this.isActiveFormLogin
        ? { head: 'LOGIN', bottom: 'Sign in', class: 'login' }
        : { head: 'SIGN IN', bottom: 'Login', class: 'sign' }
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.form {
  height: 55vh;
  width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: var(--c-dark);
  border-radius: 10px;
  padding-bottom: 12px;
  /* padding: 0 2vw; */
}
.head {
  width: 100%;
  height: 9vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 0px 0px;
}
.head h3 {
  color: var(--c-light);
}
.input {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
}
.input input {
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  background: var(--c-text);
  width: 100%;
}
.input input + input {
  margin-top: 15px;
}
.form button {
  padding: 8px;
  border-radius: 4px;
  color: var(--c-light);
  width: 70%;
  font-size: 1rem;
}
.form span {
  color: var(--c-text);
  cursor: pointer;
}
.login {
  background: var(--c-primary);
}
.sign {
  background: var(--c-add);
}
.authMessage {
  text-align: center;
  margin: 0px 5px;
}
.errorMes {
  color: var(--c-danger);
}
.successMes {
  color: var(--c-add);
}
</style>
