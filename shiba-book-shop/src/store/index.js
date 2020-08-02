/* eslint-disable no-await-in-loop */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
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
    discountArray: [],
    harryBookName: [],
    sumPrice: 0,
    discountAll: 0,
    amountPrice: 0,
    DiscountMapping: []
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
    },

    // SET HEARRY BOOK DISCOUNT
    // SET_HARRYPOTTER_BOOKID(state) {
    //   const bookRegEx = /^Harry/;
    //   const bookArrayHarry = state.basket.filter(book => bookRegEx.test(book.title));
    //   state.bookArrayFilter = bookArrayHarry;

    //   this.commit("SET_DISCOUNT_VALUE_LIST", bookArrayHarry);
    // },

    //  SET DISCOUNT VALUE LIST
    SET_DISCOUNT_VALUE_LIST(state, payload) {
      console.log("SET_DISCOUNT_VALUE_LIST -> payload", payload);
      // const discountArray = [];
      const seriesList = state.bookArrayFilter.length;
      console.log("SET_DISCOUNT_VALUE_LIST -> seriesList", seriesList);

      switch (seriesList) {
        case 2:
          state.discountArray.push(0.1);
          break;
        case 3:
          state.discountArray.push(0.1);
          state.discountArray.push(0.11);
          break;
        case 4:
          state.discountArray.push(0.1);
          state.discountArray.push(0.11);
          state.discountArray.push(0.12);
          break;
        case 5:
          state.discountArray.push(0.1);
          state.discountArray.push(0.11);
          state.discountArray.push(0.12);
          state.discountArray.push(0.13);
          break;
        case 6:
          state.discountArray.push(0.11);
          state.discountArray.push(0.1);
          state.discountArray.push(0.13);
          state.discountArray.push(0.14);
          break;
        case 7:
          state.discountArray.push(0.1);
          state.discountArray.push(0.11);
          state.discountArray.push(0.13);
          state.discountArray.push(0.14);
          state.discountArray.push(0.15);
          break;
        default:
          break;
      }
      this.commit("SET_DICDOUNT_MAPDISCOUNT");
    },

    // SET_DICDOUNT_MAP_DISCOUNT
    SET_DICDOUNT_MAPDISCOUNT(state) {
      const harryBookList = state.bookArrayFilter;
      const discountValueList = state.discountArray;
      switch (harryBookList.length) {
        case 1:
          const harryBookName = harryBookList
            .filter(order => order.count >= 2)
            .map(booklist => ({ ...booklist, discount: discountValueList[0], discountList: 2 }));
          console.log("SET_DICDOUNT_MAPDISCOUNT CASE  1 ");
          this.commit("SET_DISCOUNT_VALUE", harryBookName);
          break;
        case 2:
          const harryBookName2 = harryBookList.filter(x => {
            if (x.count >= 3) {
              // return (x.discount = discountValueList[1]), (x.discountList = 3);
              return Object.assign(x, { discount: discountValueList[1], discountList: 3 });
            }
            if (x.count === 2) {
              // return (x.discount = discountValueList[0]), (x.discountList = 2);
              return Object.assign(x, { discount: discountValueList[0], discountList: 2 });
            }
          });
          this.commit("SET_DISCOUNT_VALUE", harryBookName2);
          break;
        case 3:
          const harryBookName3 = harryBookList.filter(x => {
            if (x.count >= 4) {
              return (x.discount = discountValueList[2]), (x.discountList = 4);
            }
            if (x.count === 3) {
              return (x.discount = discountValueList[1]), (x.discountList = 3);
            }
            if (x.count === 2) {
              return (x.discount = discountValueList[0]), (x.discountList = 2);
            }
          });
          this.commit("SET_DISCOUNT_VALUE", harryBookName3);
          break;
        case 4:
          const harryBookName4 = harryBookList.filter(x => {
            if (x.count >= 5) {
              return (x.discount = discountValueList[3]), (x.discountList = 5);
            }
            if (x.count === 4) {
              return (x.discount = discountValueList[2]), (x.discountList = 4);
            }
            if (x.count === 3) {
              return (x.discount = discountValueList[1]), (x.discountList = 3);
            }
            if (x.count === 2) {
              return (x.discount = discountValueList[0]), (x.discountList = 2);
            }
          });
          this.commit("SET_DISCOUNT_VALUE", harryBookName4);
          break;
        case 5:
          const harryBookName5 = harryBookList.filter(x => {
            if (x.count >= 6) {
              return (x.discount = discountValueList[4]), (x.discountList = 6);
            }
            if (x.count === 5) {
              return (x.discount = discountValueList[3]), (x.discountList = 5);
            }
            if (x.count === 4) {
              return (x.discount = discountValueList[2]), (x.discountList = 4);
            }
            if (x.count === 3) {
              return (x.discount = discountValueList[1]), (x.discountList = 3);
            }
            if (x.count === 2) {
              return (x.discount = discountValueList[0]), (x.discountList = 2);
            }
          });
          this.commit("SET_DISCOUNT_VALUE", harryBookName5);
          break;
        case 6:
          const harryBookName6 = harryBookList.filter(x => {
            if (x.count >= 7) {
              return (x.discount = discountValueList[5]), (x.discountList = 7);
            }
            if (x.count === 6) {
              return (x.discount = discountValueList[4]), (x.discountList = 6);
            }
            if (x.count === 5) {
              return (x.discount = discountValueList[3]), (x.discountList = 5);
            }
            if (x.count === 4) {
              return (x.discount = discountValueList[2]), (x.discountList = 4);
            }
            if (x.count === 3) {
              return (x.discount = discountValueList[1]), (x.discountList = 3);
            }
            if (x.count === 2) {
              return (x.discount = discountValueList[0]), (x.discountList = 2);
            }
          });
          this.commit("SET_DISCOUNT_VALUE", harryBookName6);
          break;
        default:
          break;
      }
    },

    // SETDISCOUNTVALUE
    SET_DISCOUNT_VALUE(state, payload) {
      console.log("SET_DISCOUNT_VALUE -> payload", payload);

      state.discountAll = payload.reduce((discountValue, harryPotterBook) => {
        const y = harryPotterBook.price * harryPotterBook.discountList;
        return discountValue + y * harryPotterBook.discount;
        // return (
        //   discountValue +
        //   harryPotterBook.price * harryPotterBook.discountList * harryPotterBook.discount
        // );
      }, 0);
      console.log("SET_DISCOUNT_VALUE -> discountResult", state.discountAll);

      this.commit("SET_SUM_VALUE");
    },

    // SET_SUM_VALUE
    SET_SUM_VALUE(state) {
      state.sumPrice = state.basket.reduce((sumPrice, basket) => {
        return sumPrice + basket.amount;
      }, 0);
      console.log("SET_SUM_VALUE -> state.sumPrice ", state.sumPrice);

      this.commit("RESULT_PRICE");
    },

    RESULT_PRICE(state) {
      state.amountPrice = state.sumPrice - state.discountAll;
      console.log("RESULT_PRICE ->  state.amountPrice", state.amountPrice);
      console.log("------------------------------------------------");
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

    removeOrderInBasket({ commit, state }, data) {
      // หาตำแหน่งข้อมูลของหนังสือในตะกร้าสินค้า ที่ซ้ำกับหนังสือที่เพิ่มล่าสุด
      const position = state.basket.map(books => books.id).indexOf(data.id);

      commit("REMOVE_ORDER_BASKET", position);
    },

    async calculeateBookDiscount({ state }) {
      console.log("calculeateBookDiscount -> state", state);
      const getHarryBookList = await this.dispatch("setHarryPotterBookId");

      const getDiscountValueList = await this.dispatch("setDiscountValueList", getHarryBookList);
      console.log("calculeateBookDiscount -> getDiscountValueList", getDiscountValueList);

      const getDiscountMapping = await this.dispatch("setDiscountMapping");
      console.log("calculeateBookDiscount -> getDiscountMapping", getDiscountMapping);

      // const getDiscountValue = await this.dispatch("setDiscountValue", getDiscountMapping);
      // const getSumValue = await this.dispatch("setSumValue", state.basket);

      // console.log("Default Value : ", getSumValue);
      // console.log("Discount Value : ", getDiscountValue);
      // console.log("Result Value : ", getSumValue - getDiscountValue);
    },

    async setHarryPotterBookId({ state }) {
      const bookRegEx = /^Harry/;
      const bookArrayFilter = state.basket.filter(book => {
        return bookRegEx.test(book.title);
      });

      return bookArrayFilter;
    },

    async setDiscountValueList({ state }, harryBookList) {
      let discountData = 0.1;
      const discountValueList = [];
      const toFixedDiscountValueList = [];

      // eslint-disable-next-line no-plusplus
      for (let x = 2; x <= harryBookList.length; x++) {
        await discountValueList.push(discountData);
        discountData += 0.01;
      }
      discountValueList.forEach(discountValue => {
        discountValue = parseFloat(Number.parseFloat(discountValue).toFixed(2));
        toFixedDiscountValueList.push(discountValue);
      });
      state.DiscountMapping = discountValueList;
      return discountValueList;
    },

    async setDiscountMapping({ state }) {
      console.log("setDiscountMapping -> discountValueList");
      const harryBookList = state.bookArrayFilter;
      const discountValueList = state.discountArray;
      switch (discountValueList.length) {
        case 1:
          const harryBookName = await harryBookList
            .filter(order => order.count >= 2)
            .map(booklist => ({ ...booklist, discount: discountValueList[0], discountList: 2 }));
          console.log("SET_DICDOUNT_MAPDISCOUNT CASE  1 ");

          return (state.harryBookName = harryBookName);

        case 2:
          const harryBookName2 = await harryBookList.filter(x => {
            if (x.count >= 3) {
              return (x.discount = discountValueList[1]), (x.discountList = 3);
            }
            if (x.count === 2) {
              return (x.discount = discountValueList[0]), (x.discountList = 2);
            }
          });
          return (state.harryBookName = harryBookName2);
        case 3:
          const harryBookName3 = await harryBookList.filter(x => {
            if (x.count >= 4) {
              return (x.discount = discountValueList[2]), (x.discountList = 4);
            }
            if (x.count === 3) {
              return (x.discount = discountValueList[1]), (x.discountList = 3);
            }
            if (x.count === 2) {
              return (x.discount = discountValueList[0]), (x.discountList = 2);
            }
          });
          return (state.harryBookName = harryBookName3);
        case 4:
          const harryBookName4 = await harryBookList.filter(x => {
            if (x.count >= 5) {
              return (x.discount = discountValueList[3]), (x.discountList = 5);
            }
            if (x.count === 4) {
              return (x.discount = discountValueList[2]), (x.discountList = 4);
            }
            if (x.count === 3) {
              return (x.discount = discountValueList[1]), (x.discountList = 3);
            }
            if (x.count === 2) {
              return (x.discount = discountValueList[0]), (x.discountList = 2);
            }
          });
          return (state.harryBookName = harryBookName4);
        case 5:
          const harryBookName5 = await harryBookList.filter(x => {
            if (x.count >= 6) {
              return (x.discount = discountValueList[4]), (x.discountList = 6);
            }
            if (x.count === 5) {
              return (x.discount = discountValueList[3]), (x.discountList = 5);
            }
            if (x.count === 4) {
              return (x.discount = discountValueList[2]), (x.discountList = 4);
            }
            if (x.count === 3) {
              return (x.discount = discountValueList[1]), (x.discountList = 3);
            }
            if (x.count === 2) {
              return (x.discount = discountValueList[0]), (x.discountList = 2);
            }
          });
          return (state.harryBookName = harryBookName5);
        case 6:
          const harryBookName6 = await harryBookList.filter(x => {
            if (x.count >= 7) {
              return (x.discount = discountValueList[5]), (x.discountList = 7);
            }
            if (x.count === 6) {
              return (x.discount = discountValueList[4]), (x.discountList = 6);
            }
            if (x.count === 5) {
              return (x.discount = discountValueList[3]), (x.discountList = 5);
            }
            if (x.count === 4) {
              return (x.discount = discountValueList[2]), (x.discountList = 4);
            }
            if (x.count === 3) {
              return (x.discount = discountValueList[1]), (x.discountList = 3);
            }
            if (x.count === 2) {
              return (x.discount = discountValueList[0]), (x.discountList = 2);
            }
          });
          return (state.harryBookName = harryBookName6);

        default:
          break;
      }
    },

    async setDiscountValue(getDiscountMapping) {
      const discountResult = getDiscountMapping.reduce((discountValue, harryPotterBook) => {
        return (
          discountValue +
          harryPotterBook.price * harryPotterBook.discountList * harryPotterBook.discount
        );
      }, 0);
      return discountResult;
    },

    async setSumValue(bookArray) {
      const priceResult = bookArray.reduce((sumPrice, allBookList) => {
        return sumPrice + allBookList.amount;
      }, 0);
      return priceResult;
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
    }
  }
});
