"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gyűjtsd_ki_célzottan_és_fertőtlenítsd_őket = exports.gyűjtsd_ki_és_fertőtlenítsd_őket = void 0;
var function_1 = require("fp-ts/lib/function");
var m_veletek_1 = require("../csiribu/m\u0171veletek");
var fert_tlen_t_1 = require("../sz\u00F6vegek/fert\u0151tlen\u00EDt");
exports.gyűjtsd_ki_és_fertőtlenítsd_őket = (0, function_1.flow)(m_veletek_1.gyűjtsd_ki, fert_tlen_t_1.fertőtlenítsd_őket);
exports.gyűjtsd_ki_célzottan_és_fertőtlenítsd_őket = (0, function_1.flow)(m_veletek_1.gyűjtsd_ki_célzottan, fert_tlen_t_1.fertőtlenítsd_őket);
