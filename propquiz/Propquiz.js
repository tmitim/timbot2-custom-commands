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
        var repo_path = process.env.REPO_PATH || "/home/timothy/workspace/prop-quiz";
        var server_path = process.env.SERVER_PATH || "/home/timothy/workspace/prop-quiz/server/index.js";
        this.controller.hears('git pull propquiz', this.channels, function (bot, message) {
            if (!shell.which('git')) {
                prop.replyCode(bot, message, "Git not installed");
            }
            else {
                shell.pushd(repo_path);
                shell.exec('git fetch');
                prop.replyCode(bot, message, shell.exec('git pull').stdout);
            }
        });
        this.controller.hears('npm install propquiz', this.channels, function (bot, message) {
            shell.pushd(repo_path);
            var cmd = shell.exec('npm install');
            if (cmd.code === 0) {
                prop.replyCode(bot, message, "Propquiz finished installing node_modules");
            }
            else {
                prop.replyCode(bot, message, cmd.stderr);
            }
        });
        this.controller.hears('build propquiz', this.channels, function (bot, message) {
            shell.pushd(repo_path);
            var cmd = shell.exec('npm run compile');
            if (cmd.code === 0) {
                prop.replyCode(bot, message, "Propquiz finished building");
            }
            else {
                prop.replyCode(bot, message, cmd.stderr);
            }
        });
        this.controller.hears('restart propquiz', this.channels, function (bot, message) {
            var cmd = shell.exec('forever restart ' + server_path);
            if (cmd.code === 0) {
                prop.replyCode(bot, message, "Server restarted");
            }
            else {
                prop.replyCode(bot, message, cmd.stderr);
            }
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
