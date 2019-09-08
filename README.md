inputter
---

提供可序列化輸入的 Node.js 庫。

+ Developer: FloatFlower.Huang
+ Email: zxc110888asd@gmail.com

## 安裝
```bash
npm install https://github.com/floatflower/inputter.git --save
```

## 使用說明
```javascript
const Inputter = require('inputter');

let lengthValidator = {
    validate: (data) => {
        return data.length >= 12;
    },
    message: '長度必須大於 12。'
};

let formatValidator = {
    validate: (data) => {
        return data.match(/^[a-z0-9]+$/)
    },
    message: '僅能包含小寫英文字或數字'
};

let inputter = new Inputter();

inputter
    .hint("Question1: ")
    .input([lengthValidator, formatValidator])
    .hint("Question2: ")
    .input()
    .end()
    .then(data => {
        console.log(data); // data from input.
    });
```

### 執行結果
```
Question1: 
abc
長度必須大於 12。
I am a good boy 
僅能包含小寫英文字或數字
GOOGLE
長度必須大於 12。
僅能包含小寫英文字或數字
floatflower1029
Question2: 
No limit
[ 'floatflower1029', 'No limit' ]
```

## API
### hint(message)
傳入 `message` 作為輸入提示，會以 `console.log` 的方式顯示於控制台。

### input(validators = [])
當 `input` 被使用之後，就會產生一個輸入的等待，
`input` 函數可以傳入一個字串校驗函數的陣列，格式如下：

```javascript
let formatValidator = {
    validate: (data) => {
        return data.match(/^[a-z0-9]+$/)
    },
    message: '僅能包含小寫英文字或數字'
};
```

+ `validate` 函數會傳入一個字串型態的 data，為當前輸入的字串，
這個函數應該要回傳布林值，顯示字串是否通過校驗。
+ `message` 為錯誤訊息，當發生錯誤的時候，會用紅字顯示該訊息，
這個字串將會從頭到尾經過一次所有指定的校驗器，因此無法通過校驗而產生的錯誤訊息，
會一次性的產生。

### end()

當 `end()` 被調用之後就會開始序列化執行這個函數以上定義的所有動作，
並會透過一個 `Promise` 回傳回來，因此只要使用 `.then(data => {})` 就可以得到資料。
