"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BotListener_1 = require("timbot2/lib/BotListener");
var Blink = require('node-blink1');
var dotenv = require("dotenv");
dotenv.config();
var Blink1 = (function (_super) {
    __extends(Blink1, _super);
    function Blink1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "Blink1";
        _this.desc = "listen to chat and blink the blink(1) when there's a message";
        _this.hidden = false;
        _this.active = process.env.BLINK1 == 1;
        _this.channels = ['ambient'];
        return _this;
    }
    Blink1.prototype.start = function () {
        try {
            var blink1 = new Blink();
            this.controller.hears('', this.channels, function (bot, message) {
                if (Blink.devices().length > 0) {
                    blink1.writePatternLine(200, 255, 255, 255, 0);
                    blink1.writePatternLine(400, 0, 0, 0, 1);
                    blink1.playLoop(0, 1, 1);
                }
            });
        }
        catch (err) {
            console.log("Blink1 needs administrative privileges (sudo) to run");
            console.log(err);
        }
    };
    return Blink1;
}(BotListener_1.BotListener));
exports.Blink1 = Blink1;
