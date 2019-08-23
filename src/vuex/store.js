import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const global = {
    state: {
        // header组件
        HEADER_CONSOLE: false,

        // SIDEBAR组件
        SIDEBAR_INDEX: false,
        SIDEBAR_CONSOLE: false,

        // COVER组件
        COVER: false
    },
    mutations: {
        pageState(state, address) {
            for (let item in state) {
                state[item] = false
            }
        
            switch (address) {
                case 'index':
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'detail':
                    state.SIDEBAR_INDEX = true;
                    break;
                case 'login':
                    break;
                case 'console':
                    state.HEADER_CONSOLE = true;
                    state.SIDEBAR_CONSOLE = true;
                    break;
            }
        },
        menuControl(state, _state) {
            state.COVER = _state;
        }
    }
}

const store = new Vuex.Store({
    modules: {
        global
    }
})

export default store;