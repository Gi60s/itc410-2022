<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" id="toolbar-title" />
      <v-btn text @click="$router.push('/')">Home</v-btn>
      <v-btn text @click="$router.push('/accounts')">Account</v-btn>
      <v-spacer />
      <v-btn v-if="isAuthenticated" @click="logout()">Log Out</v-btn>
      <v-btn v-else @click="$router.push('/login')">Log In</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    
    <v-snackbar :value="notification.active" :color="notification.color" top>
      {{ notification.text }}
      <template v-slot:action="{ attrs }" v-if="notification.close">
        <v-btn text v-bind="attrs" @click.prevent="clearNotification()">Close</v-btn>
      </template>
    </v-snackbar>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'To Do App'
    }
  },

  methods: {
    clearNotification () {
      this.$store.commit('alerts/clear')
    },
    logout () {
      this.$store.dispatch('accounts/logout')
    }
  },

  computed: {
    isAuthenticated () {
      return this.user !== null
    },
    notification () {
      return this.$store.state.alerts.notification
    },
    user () {
      return this.$store.state.accounts.user
    }
  }
}
</script>

<style scoped>
  #toolbar-title {
    margin-right: 20px;
  }
</style>