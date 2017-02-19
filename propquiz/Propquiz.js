"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BotListener_1 = require("timbot2/lib/BotListener");
var shell = require("shelljs");
var Propquiz = (function (_super) {
    __extends(Propquiz, _super);
    function Propquiz() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "propquiz";
        _this.desc = "Propquiz server commands";
        _this.hidden = false;
        _this.active = true;
        _this.channels = ['direct_message', 'direct_mention', 'mention'];
        return _this;
    }
    Propquiz.prototype.start = function () {
        var prop = this;
        var path = "/home/timothy/workspace/prop-quiz";
        this.controller.hears('git pull propquiz', this.channels, function (bot, message) {
            if (!shell.which('git')) {
                prop.reply(bot, message, "``` Git not installed ```");
            }
            else {
                shell.pushd(path);
                shell.exec('git fetch');
                prop.reply(bot, message, "``` " + shell.exec('git pull').stdout + "```");
            }
        });
        this.controller.hears('npm install propquiz', this.channels, function (bot, message) {
            shell.pushd(path);
            var cmd = shell.exec('npm install');
            if (cmd.code === 0) {
                prop.reply(bot, message, "``` Propquiz finished installing node_modules ```");
            }
            else {
                prop.reply(bot, message, "``` " + cmd.stderr + " ```");
            }
        });
        this.controller.hears('build propquiz', this.channels, function (bot, message) {
            shell.pushd(path);
            var cmd = shell.exec('npm run compile');
            if (cmd.code === 0) {
                prop.reply(bot, message, "``` Propquiz finished building ```");
            }
            else {
                prop.reply(bot, message, "``` " + cmd.stderr + " ```");
            }
        });
        this.controller.hears('restart propquiz', this.channels, function (bot, message) {
            var cmd = shell.exec('forever restart /home/timothy/workspace/prop-quiz/server/index.js');
            if (cmd.code === 0) {
                prop.reply(bot, message, "``` Server restarted ```");
            }
            else {
                prop.reply(bot, message, "``` " + cmd.stderr + " ```");
            }
        });
    };
    return Propquiz;
}(BotListener_1.BotListener));
exports.Propquiz = Propquiz;
