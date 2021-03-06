import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookShelf: null,
    bookCount: 0,
    basket: [],

    bookArrayFilter: [],

    harryBookName: [],

    discountResult: 0,
    amountPrice: 0,
    discountMapping: [],
    fixedDiscountValueList: []
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
    // แก้ไข จำนวนราคารวม ของแต่ละรายการ
    EDIT_BASKET_BOOK_COUNT(state, { data, index }) {
      state.basket[index].count += data.count;
      state.basket[index].amount = state.basket[index].count * state.basket[index].price;
    },

    SET_ORDERCOUNT(state, payload) {
      state.bookCount += payload;
    },

    // Remove Object in Array
    REMOVE_ORDER_BASKET(state, payload) {
      // เช็คว่า ใน Order มี จำนวน count น้อยกว่า 1 หรือไม่
      if (state.basket[payload].count < 1) {
        //  true  : ทำการ ลบ Array ที่ต้องการนั้นด้วย payload = ตำแหน่งของ Array
        state.basket.splice(payload, 1);
      } else {
        //  false : ทำการ ลด count ใน Order นั้นลงที่ละ 1 , และ ลดจำนวนสิ้นค้าในตะกร้าที่ละ 1
        state.basket[payload].count -= 1;
        state.bookCount -= 1;
        //  คำนวนยอดรวมของแต่ละ Order ใหม่
        state.basket[payload].amount = state.basket[payload].count * state.basket[payload].price;

        // // เช็คว่า ใน Order มี จำนวน count น้อยกว่า 1 หรือไม่
        if (state.basket[payload].count < 1) {
          //  true  : ทำการ ลบ Array ที่ต้องการนั้นด้วย payload = ตำแหน่งของ Array
          state.basket.splice(payload, 1);
        }
      }
      state.discountResult = 0;
      state.fixedDiscountValueList = [];
      state.discountMapping = [];
      state.bookArrayFilter = [];
      state.harryBookName = [];
    },

    SET_HARRYPOTTER_BOOKID(state, basketArray) {
      const bookRegEx = /^Harry/;
      state.bookArrayFilter = basketArray.filter(book => {
        return bookRegEx.test(book.title);
      });
      return true;
    },

    SET_DISCOUNT_VALUE_LIST(state, harryBooklist) {
      let discountData = 0.1;
      const toFixedDiscountValueList = [];
      const discountValueList = [];
      for (let index = 2; index <= harryBooklist.length; index++) {
        discountValueList.push(discountData);
        discountData += 0.01;
      }
      discountValueList.forEach(discountValue => {
        const value = discountValue;
        const discount = parseFloat(Number.parseFloat(value).toFixed(2));
        toFixedDiscountValueList.push(discount);
      });

      state.fixedDiscountValueList = toFixedDiscountValueList;
      return true;
    },

    SET_DISCOUNT_MAPPING(state) {
      const harryBookList = state.bookArrayFilter;
      const discountValueList = state.fixedDiscountValueList;

      switch (discountValueList.length) {
        case 1:
          const harryBookName = harryBookList.filter(book => {
            if (book.count >= 2) {
              return Object.assign(book, { discount: discountValueList[0], discountList: 2 });
            }
          });
          state.discountMapping = harryBookName;
          return harryBookName;
        case 2:
          const harryBookName2 = harryBookList.filter(book => {
            if (book.count >= 3) {
              return Object.assign(book, { discount: discountValueList[1], discountList: 3 });
            }
            if (book.count === 2) {
              return Object.assign(book, { discount: discountValueList[0], discountList: 2 });
            }
          });
          state.discountMapping = harryBookName2;
          return harryBookName2;
        case 3:
          const harryBookName3 = harryBookList.filter(book => {
            if (book.count >= 4) {
              return Object.assign(book, { discount: discountValueList[2], discountList: 4 });
            }
            if (book.count === 3) {
              return Object.assign(book, { discount: discountValueList[1], discountList: 3 });
            }
            if (book.count === 2) {
              return Object.assign(book, { discount: discountValueList[0], discountList: 2 });
            }
          });
          state.discountMapping = harryBookName3;
          return harryBookName3;
        case 4:
          const harryBookName4 = harryBookList.filter(book => {
            if (book.count >= 5) {
              return Object.assign(book, { discount: discountValueList[3], discountList: 5 });
            }
            if (book.count === 4) {
              return Object.assign(book, { discount: discountValueList[2], discountList: 4 });
            }
            if (book.count === 3) {
              return Object.assign(book, { discount: discountValueList[1], discountList: 3 });
            }
            if (book.count === 2) {
              return Object.assign(book, { discount: discountValueList[0], discountList: 2 });
            }
          });
          state.discountMapping = harryBookName4;
          return harryBookName4;
        case 5:
          const harryBookName5 = harryBookList.filter(book => {
            if (book.count >= 6) {
              return Object.assign(book, { discount: discountValueList[4], discountList: 6 });
            }
            if (book.count === 5) {
              return Object.assign(book, { discount: discountValueList[3], discountList: 5 });
            }
            if (book.count === 4) {
              return Object.assign(book, { discount: discountValueList[2], discountList: 4 });
            }
            if (book.count === 3) {
              return Object.assign(book, { discount: discountValueList[1], discountList: 3 });
            }
            if (book.count === 2) {
              return Object.assign(book, { discount: discountValueList[0], discountList: 2 });
            }
          });
          state.discountMapping = harryBookName5;
          return harryBookName5;
        case 6:
          const harryBookName6 = harryBookList.filter(book => {
            if (book.count >= 7) {
              return Object.assign(book, { discount: discountValueList[5], discountList: 7 });
            }
            if (book.count === 6) {
              return Object.assign(book, { discount: discountValueList[4], discountList: 6 });
            }
            if (book.count === 5) {
              return Object.assign(book, { discount: discountValueList[3], discountList: 5 });
            }
            if (book.count === 4) {
              return Object.assign(book, { discount: discountValueList[2], discountList: 4 });
            }
            if (book.count === 3) {
              return Object.assign(book, { discount: discountValueList[1], discountList: 3 });
            }
            if (book.count === 2) {
              return Object.assign(book, { discount: discountValueList[0], discountList: 2 });
            }
          });
          state.discountMapping = harryBookName6;
          return harryBookName6;

        default:
          break;
      }
      return true;
    },
    SET_DISCOUNT_VALUE(state) {
      const { discountMapping } = state;
      const discountResult = discountMapping.reduce((discountValue, harryPotterBook) => {
        return (
          discountValue +
          harryPotterBook.price * harryPotterBook.discountList * harryPotterBook.discount
        );
      }, 0);
      state.discountResult = discountResult;
      return true;
    },
    SET_AMOUNT(state) {
      const priceResult = state.basket.reduce((sumPrice, allBookList) => {
        return sumPrice + allBookList.amount;
      }, 0);
      state.amountPrice = priceResult - state.discountResult;
    }
  },
  actions: {
    // โหลดข้อมูลหนังสือทั้งหมด
    async setBooks({ commit }) {
      const bookUrl = process.env.VUE_APP_API;
      const data = await axios.get(bookUrl);
      commit("SET_BOOKSHELF", data);
    },

    setBasketCount({ commit, data }) {
      commit("SET_ORDERCOUNT", data);
    },

    // เก็บรายการ Order ของหนังสือที่ถูกเลือก
    setBasket({ commit, state }, data) {
      // เรียก mutations นับจำนวนรายการสินค้า ใน ตะกร้าสิน้คา

      // เช็ค ว่าในตะกร้าสินค้า ว่างหรือไม่
      if (state.basket.length === 0) {
        // ถ้าไม่มี ทำการเรียก mutations ทำการเพิ่มหนังสือเข้าตะกร้าสินค้า
        commit("SET_BASKET", data);
      } else {
        // ถ้ามีหนังสือในตะกร้าสินค้า
        // (1) ทำการเรียก Function checkBookInBasKet
        this.dispatch("checkBookInBasKet", data);
      }
    },

    // ตรวจสอบ หนังสือที่กำลังจะเพิ่มล่าสุด ซ้ำกับหนังสือในตะกร้าสินค้าหรือไม่
    async checkBookInBasKet({ commit, state }, data) {
      // หาตำแหน่งข้อมูลของหนังสือในตะกร้าสินค้า ที่ซ้ำกับหนังสือที่เพิ่มล่าสุด
      const index = await state.basket.map(books => books.id).indexOf(data.id);

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
    },

    // ลบจำนวนสินค้าออกจากแต่ละ order
    // หากจำนวนสินค้าในแต่ละ order เหลือ 0 order จะถูกลบออกจากตะกร้าสินค้า
    async removeOrderInBasket({ commit, state }, data) {
      // หาตำแหน่งข้อมูลของหนังสือในตะกร้าสินค้า ที่ซ้ำกับหนังสือที่เพิ่มล่าสุด
      const position = state.basket.map(books => books.id).indexOf(data.id);

      await commit("REMOVE_ORDER_BASKET", position);

      this.dispatch("calculeateBookDiscount");
    },

    // คำนวน ราคา ส่วนลด และยอดที่ต้องชำระ ทั้งหมด
    async calculeateBookDiscount({ commit, state }) {
      // ค้นหาหนังสือเฉพาะ "Harry ..."
      await commit("SET_HARRYPOTTER_BOOKID", state.basket);

      // กำหนดจำนวนส่วนลดของแต่ละ series
      await commit("SET_DISCOUNT_VALUE_LIST", state.bookArrayFilter);

      // กำหนดส่วนลด ในแต่ละเล่ม
      await commit("SET_DISCOUNT_MAPPING");

      // คำนวนส่วนลดทั้งหมด
      await commit("SET_DISCOUNT_VALUE");

      // คำนวน ค่าใช้จ่ายทั้งหมด
      await commit("SET_AMOUNT");
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
    getBasket(state) {
      return state.basket;
    },

    getDiscountResult(state) {
      return state.discountResult;
    },

    getAmountPrice(state) {
      return state.amountPrice;
    }
  }
});
