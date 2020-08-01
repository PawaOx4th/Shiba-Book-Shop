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
    // โหลด หนังสือมาเก็บไว้
    SET_BOOKSHELF(state, payload) {
      state.bookShelf = payload.data.books;
    },

    // เก็บรายการของแต่ละ Order
    SET_BASKET(state, payload) {
      state.basket.push(payload);
    },

    // แก้ไขจำนวนหนังสือในแต่ละรายการ ในตะกร้าสินค้า
    EDIT_BASKET_BOOK_COUNT(state, { data, index }) {
      state.basket[index].count += data.count;
    },

    SET_ORDERCOUNT(state) {
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
      // เช็ค ว่าในตะกร้าสินค้า ว่างหรือไม่
      if (state.basket.length === 0) {
        // ถ้าไม่มี ทำการเรียก mutations ทำการเพิ่มหนังสือเข้าตะกร้าสินค้า
        commit("SET_BASKET", data);

        // เรียก mutations นับจำนวนรายการสินค้า ใน ตะกร้าสินค้า
        commit("SET_ORDERCOUNT", data);
      } else {
        // ถ้ามีหนังสือในตะกร้าสินค้า
        // (1) ทำการเรียก Function checkBookInBasKet
        this.dispatch("checkBookInBasKet", data);

        // (2) เรียก mutations นับจำนวนรายการสินค้า ใน ตะกร้าสิน้คา
        commit("SET_ORDERCOUNT", data);
      }
    },

    // ตรวจสอบ หนังสือที่กำลังจะเพิ่มล่าสุด ซ้ำกับหนังสือในตะกร้าสินค้าหรือไม่
    async checkBookInBasKet({ commit, state }, data) {
      // หาตำแหน่งข้อมูลของหนังสือในตะกร้าสินค้า ที่ซ้ำกับหนังสือที่เพิ่มล่าสุด
      const index = state.basket.map(books => books.id).indexOf(data.id);

      // -1 ไม่มีตำแหน่งที่ซ้ำ หรือคือไม่มีหนังสือซ้ำ กับ ในตะกร้าสินค้า
      //  เป็นจริง : ทำการเรียก mutations ทำการเพิ่มหนังสือเข้าตะกร้าสินค้า
      //  เป็นเท็จ : ทำการเรียก mutations แก้ไขจำนวนหนังสือในตะกร้าสินค้า
      if (index === -1) {
        commit("SET_BASKET", data);
      } else {
        commit("EDIT_BASKET_BOOK_COUNT", {
          data,
          index
        });
      }
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
