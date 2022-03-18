<template>
  <div>
    <h1>{{ title }}</h1>
    <form @submit.prevent="submit()">
      <v-text-field label="First Name" v-model="name" outlined dense></v-text-field>
      <v-text-field label="Username" v-model="username" outlined dense></v-text-field>
      <v-text-field label="Password" type="password" v-model="password" outlined dense></v-text-field>
      <div class="right">
        <v-btn @click="reset()">Reset</v-btn>
        <v-btn color="primary" type="submit">Sumbit</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Hello',

  data () {
    const user = this.$store.state.accounts.user
    return user === null
      ? {
        title: 'Create a New Account',
        name: '',
        username: '',
        password: ''
      }
      : {
        title: 'Update your Account',
        name: user.name,
        username: user.username,
        password: ''
      }
  },

  methods: {
    reset () {
      this.name = ''
      this.username = ''
      this.password = ''
    },

    async submit () {
      if (this.readyToSubmit) {
        const success = await this.$store.dispatch('accounts/createAccount', {
          name: this.name,
          username: this.username,
          password: this.password
        })
        if (success === 'created') {
            this.$store.dispatch('alerts/set', {
                close: true,
                color: 'success',
                duration: 5000,
                text: 'Account created. Please log in.'
            })
            this.$router.push('/login')
        } else if (success === 'conflict') {
          this.$store.dispatch('alerts/set', {
              close: true,
              color: 'error',
              duration: 5000,
              text: 'Account with username already exists.'
          })
        } else if (success === 'failed') {
          this.$store.dispatch('alerts/set', {
              close: true,
              color: 'error',
              duration: 5000,
              text: 'Account creation failed.'
          })
        }
      } else {
        this.$store.dispatch('alerts/set', {
          color: 'error',
          duration: 8000,
          text: 'Please fill out the entire form before submitting.'
        })
      }
    }
  },

  computed: {
    readyToSubmit () {
      return this.name !== '' && this.username !== '' && this.password !== ''
    }
  }
}
</script>

<style scoped>
  .container > div {
    max-width: 500px;
    margin: 0 auto;
  }
  .right {
    text-align: right;
  }
</style>