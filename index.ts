// 使用事件時寫法

function emit(...args: [e: "a", b: number] | [e: "b", b: string, c: number]) {
    if (args[0] === "a") {
        return args[1]++;
    } else {
        return args[1].substring(-3) + args[2].toFixed();
    }
}
emit("a", 100);
emit("b", "cc", 100);
// emit("c") 無法過編譯

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