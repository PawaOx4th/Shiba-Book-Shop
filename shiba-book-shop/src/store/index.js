import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookShelf: null,
    bookCount: 0,
    basket: []
  },
  mutations: {
    //
    SET_BOOKSHELF(state, payload) {
      state.bookShelf = payload.data.books;
    },

    // เก็บรายการของแต่ละ Order
    SET_BASKET(state, payload) {
      state.basket.push(payload);
    },

    SET_ORDERCOUNT(state) {
      // eslint-disable-next-line no-shadow
      state.bookCount = state.basket.reduce((sum, counts) => sum + counts.count, 0);
    }
  },
  actions: {
    // โหลดข้อมูลหนังสือทั้งหมด
    async setBooks({ commit }) {
      const bookUrl =
        "https://api.jsonbin.io/b/5e69b564d2622e7011565547?fbclid=IwAR1k4-q8kdVUvRncqd2TYzHQT3SFVHvHYhWZate_GLeEr0BwB84Go6kjq5w";
      const data = await axios.get(bookUrl);
      commit("SET_BOOKSHELF", data);
    },

    // เก็บรายการ Order ของหนังสือที่ถูกเลือก
    setBasket({ commit }, data) {
      commit("SET_BASKET", data);
      commit("SET_ORDERCOUNT");
    }
  },
  getters: {
    // ส่งข้อมูลหนังสือทั้งหมด
    getBookShelf(state) {
      return state.bookShelf;
    },

    // ส่งข้อมูล จำนวน หนังสือที่อยู่ในรายการรอชำระเงิน
    getBookCount(state) {
      return state.bookCount;
    }
  }
});
