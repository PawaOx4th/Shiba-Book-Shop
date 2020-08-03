# SHIBA BOOK SHOP 
###### [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/PawaOx4th/Shiba-Book-Shop) ✉ pawaox4th@gmail.com 

![](https://raw.githubusercontent.com/PawaOx4th/Shiba-Book-Shop/da9bb2237dc926b3014e9c68f6f67ac6eb9238dd/src/assets/shiba-book-icon.svg)
### Project Setup
```
yarn install
```
### Compiles and hot-reloads for development
```
yarn serve
```
### Compiles and minifies for production
```
yarn build
```
### CSS Framework

- [element ui](https://element.eleme.io/#/en-US "element ui")

### Frontend  Framework 
* <a href="https://vuejs.org/" target="_blank">Vue Js</a>


![](https://github.com/PawaOx4th/Shiba-Book-Shop/blob/master/src/Img/screen%20%20web.jpg?raw=true)

## Feature
* Add Book to Cart
* Remove a book  on order
* Calculate Discount
* Calculate Grand total
* Total after discount

## Discount Amount
* Store / index.js

1. กำหนด Array เก็บส่วนลดตามเงื่อนไขที่ระบุ
2. เพื่ม Property ส่วนลดในแต่ละรายการออเดอร์พร้อมทั้งจำนวนส่วนลดของแต่ละเล่มที่ถูกหักลด

```
As we mention about discount, there are special discount only for all Harry Potter book series (7 books);
•	buy 2 unique series books discount 10% of those 2 books
•	buy 3 unique series books discount 11% of those 3 books
•	buy 4 unique series books discount 12% of those 4 books
•	buy 5 unique series books discount 13% of those 5 books
•	buy 6 unique series books discount 14% of those 6 books
•	buy 7 unique series books discount 15% of those 7 books
```

3. คำนวนยอดรวมค่าใช้จ่ายของออเดอร์ทั้งหมด
4. คำนวนส่วนลดทั้งหมด
5. คำนวน ยอดเงินที่ต้องชำระทั้งหมด







