"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gyűjtsd_ki_célzottan = exports.gyűjtsd_ki = void 0;
var gyűjtsd_ki = function ($, selector) {
    return $(selector)
        .map(function (_, el) { return $(el).text(); })
        .get();
};
exports.gyűjtsd_ki = gyűjtsd_ki;
var gyűjtsd_ki_célzottan = function ($, selector, cél) {
    return $(selector)
        .filter(function (_, el) { return $(el).closest(cél).length > 0; })
        .map(function (_, el) { return $(el).text(); })
        .get();
};
exports.gyűjtsd_ki_célzottan = gyűjtsd_ki_célzottan;
