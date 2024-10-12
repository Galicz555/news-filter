"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fertőtlenítsd_őket = exports.fertőtlenítsd = void 0;
var Array_1 = require("fp-ts/Array");
var fertőtlenítsd = function (szöveg) { return szöveg.trim(); };
exports.fertőtlenítsd = fertőtlenítsd;
exports.fertőtlenítsd_őket = (0, Array_1.map)(exports.fertőtlenítsd);
