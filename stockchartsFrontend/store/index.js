// holds your root state
export const state = () => ({
    candles: []
  })
  
  // contains your actions
  export const actions = {
    addCandle({ state, commit },payload){
      commit('setCandle', payload)
    }
  }
  // contains your mutations
  export const mutations = {
    setCandle(state, value){
      state.candles.push(value)
    }
  }
  // your root getters
  export const getters = {
      myGetter(state){ return state.candles}
  }
