"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BotListener_1 = require("timbot2/lib/BotListener");
var Pizza = (function (_super) {
    __extends(Pizza, _super);
    function Pizza() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "pizza";
        _this.desc = "Yum, pizza";
        _this.hidden = true;
        _this.channels = ['direct_message', 'direct_mention', 'mention', 'ambient'];
        return _this;
    }
    Pizza.prototype.start = function () {
        this.controller.hears('pizza', this.channels, function (bot, message) {
            this.reply(bot, message, "pizza? I want pizza.");
        }.bind(this));
    };
    return Pizza;
}(BotListener_1.BotListener));
exports.Pizza = Pizza;
