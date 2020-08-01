/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
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

    SET_BASKET_CHANG_COUNT(state, { data, index }) {
      console.log("SET_BASKET_CHANG_COUNT");
      state.basket[index].count += data.count;
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
    setBasket({ commit, state }, data) {
      if (state.basket === null) {
        commit("SET_BASKET", data);
        commit("SET_ORDERCOUNT", data);
      } else {
        this.dispatch("checkBookInBasKet", data);
        commit("SET_ORDERCOUNT", data);
      }
    },

    async checkBookInBasKet({ commit, state }, data) {
      let index = state.basket.map(books => books.id).indexOf(data.id);
      index === -1 ? commit("SET_BASKET", data) : commit("SET_BASKET_CHANG_COUNT", { data, index });
    }
  },
  getters: {
    // แสดงข้อมูลหนังสือทั้งหมด
    getBookShelf(state) {
      return state.bookShelf;
    },

    // แสดงข้อมูล จำนวน หนังสือที่อยู่ในรายการรอชำระเงิน
    getBookCount(state) {
      return state.bookCount;
    },

    // แสดงข้อมูลหนังสือ ใน Order
    getBookOrder(state) {
      return state.basket;
    }
  }
});
