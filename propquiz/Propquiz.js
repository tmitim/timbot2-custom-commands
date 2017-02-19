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
        _this.desc = _this.getHelp();
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
        this.controller.hears('propquiz commands', this.channels, function (bot, message) {
            var messages = [];
            messages.push("```");
            messages.push("git pull propquiz         fetch and pull from git");
            messages.push("npm install propquiz      install npm modules");
            messages.push("build propquiz            webpack and typescript compile");
            messages.push("restart propquiz          restart node");
            messages.push("```");
            prop.reply(bot, message, messages.join("\n"));
        });
    };
    Propquiz.prototype.getHelp = function () {
        var messages = [];
        var leftPad = "- ";
        messages.push("propquiz commands");
        messages.push(leftPad + "git pull propquiz         fetch and pull from git");
        messages.push(leftPad + "npm install propquiz      install npm modules");
        messages.push(leftPad + "build propquiz            webpack and typescript compile");
        messages.push(leftPad + "restart propquiz          restart node");
        return messages.join("\n");
    };
    return Propquiz;
}(BotListener_1.BotListener));
exports.Propquiz = Propquiz;
