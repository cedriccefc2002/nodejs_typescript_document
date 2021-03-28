"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var a, b, compilerOptions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                a = 100000000000;
                b = 2048 | 128 // 2048 | 128 語法糖
                ;
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./tsconfig.json")); })];
            case 1:
                compilerOptions = (_a.sent()).compilerOptions;
                console.log(compilerOptions);
                return [2 /*return*/];
        }
    });
}); });
// 使用事件時寫法
var events_1 = require("events");
var ev = new events_1.EventEmitter();
function emit() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    ev.emit.apply(ev, args);
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
function on() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    ev.addListener(args[0], args[1]);
}
on("a", function (b) { });
// on("b", (b: number) => { }); // 無法過編譯
on("b", function (b, d) { });
// on("c", (b: string, d: number) => { }); // 無法過編譯
emit("a", 100);
emit("b", "cc", 100);
emit("c", "sss");
var u = {};
var s = (_b = (_a = u.d) === null || _a === void 0 ? void 0 : _a.c) !== null && _b !== void 0 ? _b : "";
console.log(((_c = u.b) !== null && _c !== void 0 ? _c : 0) + 100);
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
