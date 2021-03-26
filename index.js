"use strict";
// 使用事件時寫法
var _a;
function emit() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args[0] === "a") {
        return args[1]++;
    }
    else if (args[0] === "b") {
        return args[1].substring(-3) + args[2].toFixed();
    }
    else {
        return args[1].substring(-3);
    }
}
emit("a", 100);
emit("b", "cc", 100);
emit("c", "sss");
var u = {};
console.log(((_a = u.b) !== null && _a !== void 0 ? _a : 0) + 100);
if (u.c) {
    if (typeof u.c === "number") {
        console.log((u.c) + 100);
    }
    else {
        console.log((u.c).replace("ss", "ss"));
    }
}
var Data = /** @class */ (function () {
    function Data() {
        this.a = "aaa";
        this.b = 100;
    }
    Data.prototype.click = function () {
        console.log(this.a, this.b);
    };
    return Data;
}());
var d1 = new Data;
console.log(d1); // Data { a: 'aaa', b: 100 }
d1.click(); // aaa 100
var d = JSON.parse(JSON.stringify(d1));
console.log(d); // { a: 'aaa', b: 100 }
d.click(); // d.click(); TypeError: d.click is not a function
