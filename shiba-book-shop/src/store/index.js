import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookShelf: null,
    bookCount: 0
  },
  mutations: {
    SET_BOOKSHELF(state, payload) {
      state.bookShelf = payload.data.books;
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
    getBookShelf(state) {
      return state.bookShelf;
    },
    getBookCount(state) {
      return state.bookCount;
    }
  }
});
