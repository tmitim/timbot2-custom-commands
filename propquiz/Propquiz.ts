import {BotListener} from "timbot2/lib/BotListener";
import shell = require("shelljs");

export class Propquiz extends BotListener {
  name = "propquiz";
  desc = this.getHelp();

  hidden = false;
  active = true;

  channels = ['direct_message','direct_mention','mention'];

  start() {
    var prop = this;
    var repo_path = process.env.REPO_PATH || "/home/timothy/workspace/prop-quiz";
    var server_path = process.env.SERVER_PATH || "/home/timothy/workspace/prop-quiz/server/index.js";

    this.controller.hears('git pull propquiz', this.channels, function(bot,message) {
      if (!shell.which('git')) {
        prop.replyCode(bot, message, "Git not installed");
      } else {
        shell.pushd(repo_path);
        shell.exec('git fetch');
        prop.replyCode(bot, message, shell.exec('git pull').stdout);
      }
    });

    this.controller.hears('npm install propquiz', this.channels, function(bot,message) {
      shell.pushd(repo_path);
      var cmd = shell.exec('npm install');
      if (cmd.code === 0) {
        prop.replyCode(bot, message, "Propquiz finished installing node_modules");
      } else {
        prop.replyCode(bot, message, cmd.stderr);
      }
    });

    this.controller.hears('build propquiz', this.channels, function(bot,message) {
      shell.pushd(repo_path);
      var cmd = shell.exec('npm run compile');
      if (cmd.code === 0) {
        prop.replyCode(bot, message, "Propquiz finished building");
      } else {
        prop.replyCode(bot, message, cmd.stderr);
      }
    });

    this.controller.hears('restart propquiz', this.channels, function(bot,message) {
      var cmd = shell.exec('forever restart ' + server_path);
      if (cmd.code === 0) {
        prop.replyCode(bot, message, "Server restarted");
      } else {
        prop.replyCode(bot, message, cmd.stderr);
      }
    });
  }

  getHelp() {
    var messages = [];
    var leftPad = "- ";

    messages.push("propquiz commands");
    messages.push(leftPad + "git pull propquiz         fetch and pull from git");
    messages.push(leftPad + "npm install propquiz      install npm modules");
    messages.push(leftPad + "build propquiz            webpack and typescript compile");
    messages.push(leftPad + "restart propquiz          restart node");

    return messages.join("\n");
  }
}
