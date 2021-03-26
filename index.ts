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