<template>
  <div>
    <h1>Welcome to the To Do application.</h1>
    <p>To Do: finish this app</p>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  data () {
    return {
      text: ''
    }
  },

  methods: {
    addItem () {
      this.$store.commit('todo/add', this.text)
      this.text = ''
    },

    load () {
      this.$store.dispatch('todo/getList')
    },

    login () {
      this.$store.dispatch('accounts/login', {
        username: 'bob5',
        password: 'theAnswer'
      })
    },

    logout () {
      this.$store.dispatch('accounts/logout')
    }
  },

  computed: {
    list () {
      return this.$store.state.todo.list
    },

    user () {
      return this.$store.state.accounts.user
    }
  }
}
</script>
