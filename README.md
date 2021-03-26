# nodejs與typescript介紹、使用與轉換案例
nodejs與typescript介紹、使用與轉換案例

## 我使用nodejs的經驗

- 我在[io.js](https://blog.chh.tw/posts/what-is-iojs-nodejs-forking/) 出現之前就開始使用
- 在前公司
    - 使用nodejs+mongodb+React開發電能管理系統
    - 使用electron+LevelDB+React 智能電盤嵌入式系統

## 我使用typescript的經驗

- 2012, 十月 01 開始關注 [Anders-Hejlsberg-Introducing-TypeScript](https://channel9.msdn.com/posts/Anders-Hejlsberg-Introducing-TypeScript)
- 在Visual Studio 2013 上應用於前端網頁專案
- VS Code 出現後開始導入到nodejs

## 我使用nodejs的遇到問題

- 當檔案數量超過已百個，程式碼超過上萬行之後，修改資料結構變得越來困難
- 引入套件都要測試輸入的參數與輸出的內容
- 事件驅動模式不知道要收到的事件名稱與內容

## 改用typescript後的好處

- 比較安心
- 容易維護，調整資料結構後會知道哪些程式需要對應修改

## 改用typescript後的壞處

- 寫邏輯前要先定義資料結構
- 要對未支援的套件或js寫定義檔（.d.ts）
- 一些特殊的寫法會無法通過編譯，需要花時間重寫

## JS to TS

1. 將附檔`.js` 改成 `.ts`

## JS 轉換前盡量避免的寫法

- 中途變動參數的型別

```js
function a(b) {
    b++;
    if(b>10){
        b="我是10"
    }
    return b
}
```
換成
```js
function a(b) {
    b++
    if(b>10){
        var c="我是10";
        return c;
    } else {
        return b;
    }
}
```

## 撰寫經驗分享

- 使用事件驅動模式時寫法

```ts
import { EventEmitter } from "events"
const ev = new EventEmitter();
function emit(...args: [e: "a", b: number] | [e: "b", b: string, c: number] | [e: "c", b: string]) {
    ev.emit.apply(ev, args);
    if (args[0] === "a") {
        return args[1]++;
    } else if (args[0] === "b") {
        return args[1].substring(-3) + args[2].toFixed();
    } else {
        return args[1].substring(-3);
    }
}
function on(...args:
    [e: "a", cb: (b: number) => void] |
    [e: "b", cb: (b: string, c: number) => void] |
    [e: "c", cb: (b: string) => void]) {
    ev.addListener(args[0], args[1]);
}
on("a", (b: number) => { });
// on("b", (b: number) => { }); // 無法過編譯
on("b", (b: string, d: number) => { });
// on("c", (b: string, d: number) => { }); // 無法過編譯
emit("a", 100);
emit("b", "cc", 100);
emit("c", "sss");
// emit("d") // 無法過編譯
```

- async/await 很好用，要記的 await 一個async的函式，
否則TS不會自檢查，程式邏輯會不如預期。

- 除非必要少用any或是強制轉型 

    - [TypeScript 3.0 全新 unknown 型別](https://jasperjn.github.io/blog/2018/07/14/typescript-v4-unknown-type/)

- 資料與邏輯要分開定義

```ts
// 資料與邏輯要分開定義
interface IData {
    a: string;
    b: number;
}
class Data implements IData {
    a: string = "aaa";
    b: number = 100;
    click() {
        console.log(this.a, this.b);
    }
}
const d1 = new Data;
console.log(d1); // Data { a: 'aaa', b: 100 }
d1.click(); // aaa 100
const d: IData = JSON.parse(JSON.stringify(d1));
console.log(d); // { a: 'aaa', b: 100 }
(d as Data).click(); // d.click(); TypeError: d.click is not a function
```

- 不確定的資料結構可以用?

```ts
// 不確定的資料結構可以用?

type U = {
    b?: number;
    c?: number | string;
}
const u: U = {}
console.log((u.b ?? 0) + 100)
if (u.c) {
    if (typeof u.c === "number") {
        console.log((u.c) + 100)
    } else {
        console.log((u.c).replace("ss", "ss"))
    }
}
```