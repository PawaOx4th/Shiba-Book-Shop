import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookshelf: {}
  },
  mutations: {
    SET_BOOKSHELF(state, payload) {
      state.bookshelf = {
        ...state.bookshelf,
        ...payload
      };
    }
  },
  actions: {
    async setBooks({ commit }) {
      const bookUrl =
        "https://api.jsonbin.io/b/5e69b564d2622e7011565547?fbclid=IwAR1k4-q8kdVUvRncqd2TYzHQT3SFVHvHYhWZate_GLeEr0BwB84Go6kjq5w";
      const data = await axios.get(bookUrl);
      commit("SET_BOOKSHELF", data);
    }
  },
  getters: {
    getBookshelf(state) {
      return state.bookshelf;
    }
  }
});
