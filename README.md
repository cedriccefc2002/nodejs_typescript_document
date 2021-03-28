# nodejs與typescript介紹、使用與轉換案例

目標：
- nodejs的坑
- typescript `安麗`
- js 轉 ts 大致流程分享

預備知識：
- 會javascript程式語言，對 ecmascript 規範 有一定了解
- 使用`VS CODE` 且會使用`VS CODE`的終端機功能，對於`下命令列指令`不會恐懼(所有步驟都不會有圖形化界面，也不會有截圖)

## 我使用nodejs的經驗

- 我在[io.js](https://blog.chh.tw/posts/what-is-iojs-nodejs-forking/) 出現之前就開始使用
- 在前公司
    - 使用nodejs+mongodb+React開發電能管理系統
    - 使用electron+LevelDB+React 智能電盤嵌入式系統

## nodejs 的套件管理
[Node.js 開發之父：「十個Node.js 的設計錯誤」](https://m.oursky.com/node-js-%E9%96%8B%E7%99%BC%E4%B9%8B%E7%88%B6-%E5%8D%81%E5%80%8Bnode-js-%E7%9A%84%E8%A8%AD%E8%A8%88%E9%8C%AF%E8%AA%A4-%E4%BB%A5%E5%8F%8A%E5%85%B6%E7%B5%82%E6%A5%B5%E8%A7%A3%E6%B1%BA%E8%BE%A6%E6%B3%95-f0db0afb496e)

![https://i.redd.it/tfugj4n3l6ez.png](https://i.redd.it/tfugj4n3l6ez.png)

`對windows的開發者有時候會出現路徑過長的問題，需要將專案方在[D:\]底下`

### JavaScript 模組化

[參考資料](https://ithelp.ithome.com.tw/articles/10219340)

- CommonJS 規範 nodejs
- ES6 Modules 

### package.json

- version：
https://docs.npmjs.com/cli/v7/configuring-npm/package-json#version

- dependencies：https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies

預設是相容模式("^x.y.z")，但是會有開發者不遵守語意化版本規範，所以改成指定版號"x.y.z"

### require 的規則

- 在 slot-test/node_modules/@ag-slots/slot 目錄中 執行 `module.paths` 會出現引入套件的順序

```sh
slot-test/node_modules/@ag-slots/slot$ node
Welcome to Node.js v14.15.1.
Type ".help" for more information.
> module.paths
[
  'slot-test/node_modules/@ag-slots/slot/repl/node_modules',
  'slot-test/node_modules/@ag-slots/slot/node_modules',
  'slot-test/node_modules/@ag-slots/node_modules',
  'slot-test/node_modules',
  '../node_modules',
  '../../node_modules',
  '../../node_modules', 
  '/node_modules',
]
```
- 自己寫的程式要使用"相對路徑"引用，來確保引用到真正想要的東西

```js
require("../../lib")
```

- 不建議手動變動 `node_modules` 應該要由套件管理工具去管理
- @XXXXX/套件 = 解決不同團隊確有相同名稱套件問題

### npm 與 yarn pnpm

### npm

### npmrc 

- Scoped packages

## [electron](https://www.electronjs.org/)

- 安裝

```sh
npm i -D electron
```

- 執行 [create app](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file)

- 可以將node與chrome整合在一起，做單機板開發。
    
    - [visual-studio-code](https://www.electronjs.org/apps/visual-studio-code)
    - [Microsoft Teams](https://www.electronjs.org/apps/cocos-creator)
    - [cocos-creator](https://www.electronjs.org/apps/cocos-creator)
    - [mongodb-compass](https://www.electronjs.org/apps/mongodb-compass)

## 我使用nodejs的遇到問題

- require("套件a") 但是卻沒有寫到 package.json 中 
(目前執行`npm i`時如果有`package.json`時，已經預設會寫入，但是沒有的話也不會自動產生)
- 當檔案數量超過已百個，程式碼超過上萬行之後，修改資料結構變得越來困難
- 引入套件都要測試輸入的參數與輸出的內容
- 事件驅動模式不知道要收到的事件名稱與內容

## 我使用typescript的經驗

- 2012, 十月 01 開始關注 [Anders-Hejlsberg-Introducing-TypeScript](https://channel9.msdn.com/posts/Anders-Hejlsberg-Introducing-TypeScript)
- 在Visual Studio 2013 上應用於前端網頁專案
- VS Code 出現後開始導入到nodejs

## 改用typescript後的好處

- 比較安心
- 可以使用ES新的語法，又可以兼容舊版JS執行環境
- 容易維護，調整資料結構後會知道哪些程式需要對應修改
- 兼容JS
- vs code 本身就是用typescript寫成（使用[electron](https://www.electronjs.org/)），可以說是為了寫typescript而開發的

## 改用typescript後的壞處

- 寫邏輯前要先定義資料結構
- 要對未支援的套件或js寫定義檔（.d.ts）
- 一些特殊的寫法會無法通過編譯(但是還是會產生js檔)，需要花時間重寫

## JS to TS

1. 安裝相關套件
    ```sh
    npm i -D typescript
    npm i -D @types/node
    ```
1. 執行初始化
    ```sh
    npx tsc --init
    ```
1. 視需要調整 `tsconfig.json`
    - compilerOptions.target 設成 "ES2015" 或以上
1. 將附檔名由`.js` 改成 `.ts`
1. 執行 `npx tsc` 進行編譯，此時會出現很多錯誤訊息，但是還是會轉換成成功
1. 可以看一下編譯的js檔與之前應該一樣
1. 修改 ts 檔，知道型別就定義，不知道的就先用`unknow`或是`any`型別後編譯
1. 重複上面步驟直到所有`unknow`或是`any`型別都被正確定義 [參考資料](https://angular.tw/guide/typescript-configuration#noimplicitany-and-suppressimplicitanyindexerrors)
1. 轉成 `ES6 Modules` 寫法
1. 替換不支援的套件，或是手動寫定義檔：
    - [https://www.typescriptlang.org/dt/search?search=](https://www.typescriptlang.org/dt/search?search=)

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

- 動態匯入
- 匯入json tsconfig.json 中 "resolveJsonModule": true,
- 當沒有使用匯出的變數時檔案不會真的匯入

```ts
// 動態匯入
// 匯入json tsconfig.json 中 "resolveJsonModule": true,
// 當沒有使用匯出的變數時檔案不會真的匯入
// ES 新的語法糖
import { name } from "./package.json";
async () => {
    const a = 100_000_000_000; // 100000000000 語法糖
    const b = 0b0000_1000_0000_0000 | 0b0000_0000_1000_0000 // 2048 | 128 語法糖
    // console.log(name); 當沒有使用匯出的變數時檔案不會真的匯入
    const { compilerOptions } = await import("./tsconfig.json");
    console.log(compilerOptions);
}
```
- 使用事件驅動模式時寫法

```ts
// 使用事件時寫法
import { EventEmitter } from "events"
const ev = new EventEmitter();
function emit(...args: 
    [e: "a", b: number] | 
    [e: "b", b: string, c: number] | 
    [e: "c", b: string]
) {
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
// 不確定的資料結構可以用? 與 ??

type U = {
    b?: number;
    c?: number | string;
    d?: { c: string }
}
const u: U = {}
let s = u.d?.c ?? ""; 
console.log((u.b ?? 0) + 100)
if (u.c) {
    if (typeof u.c === "number") {
        console.log((u.c) + 100)
    } else {
        console.log((u.c).replace("ss", "ss"))
    }
}
```