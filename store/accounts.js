export const state = () => {
    return {
        user: null
    }
}

export const getters = {
    isAuthenticated (state) {
        return state.user !== null
    }
}

export const mutations = {
    setUser (state, user) {
        state.user = user
    }
}

export const actions = {
    async createAccount ({ commit }, { name, username, password }) {
        try {
            const res = await this.$axios.post('/api/accounts', {
                name,
                username,
                password
            })
            return 'created'
            
        } catch (e) {
            const status = e.response.status
            if (status === 409) {
                return 'conflict'
            } else {
                return 'failed'
            }
        }
    },

    async load ({ commit }) {
        try {
            const res = await this.$axios.get('/api/accounts')
            if (res.status === 200) {
                commit('setUser', res.data)
            }
        } catch (e) {
            commit('setUser', null)
        }
    },

    async login ({ dispatch }, { username, password }) {
        const res = await this.$axios.put('/api/authentication/login', {
            username,
            password
        })
        if (res.status === 200) {
            await dispatch('load')
            return true
        } else {
            return false
        }
    },

    async logout ({ commit }) {
        const res = await this.$axios.put('/api/authentication/logout')
        if (res.status === 200) {
            commit('setUser', null)
        }
    }
}