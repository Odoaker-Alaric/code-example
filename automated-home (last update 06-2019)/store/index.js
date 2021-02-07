import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const createStore = () => {
    return new Vuex.Store({
        state,
        getters,
        mutations,
        actions,
    })
}

export default createStore