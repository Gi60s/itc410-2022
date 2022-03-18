export const state = () => {
    return {
        notification: {
            active: false,
            close: false,
            color: '',
            start: 0,
            text: ''
        }
    }
}

export const mutations = {
    clear (state) {
        state.notification = Object.assign({}, state.notification, { active: false })
    },

    set (state, alert) {
        state.notification = alert
    }
}

export const actions = {
    set ({ commit }, { close, color, duration, text }) {
        const alert = {
            active: true,
            close: close ?? true,
            color: color ?? '',
            duration: duration ?? 5000,
            text
        }

        commit('set', alert)

        setTimeout(() => {
            commit('clear')
        }, alert.duration)
    }
}