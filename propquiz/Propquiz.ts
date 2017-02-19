import {BotListener} from "timbot2/lib/BotListener";
import shell = require("shelljs");

export class Propquiz extends BotListener {
  name = "propquiz";
  desc = "Propquiz server commands";

  hidden = false;
  active = true;

  channels = ['direct_message','direct_mention','mention'];

  start() {
    var prop = this;
    var path = "/home/timothy/workspace/prop-quiz";

    this.controller.hears('git pull propquiz', this.channels, function(bot,message) {
      if (!shell.which('git')) {
        prop.reply(bot, message, "``` Git not installed ```");
      } else {
        shell.pushd(path);
        shell.exec('git fetch');
        prop.reply(bot, message, "``` " + shell.exec('git pull').stdout + "```");
      }
    });

    this.controller.hears('npm install propquiz', this.channels, function(bot,message) {
      shell.pushd(path);
      var cmd = shell.exec('npm install');
      if (cmd.code === 0) {
        prop.reply(bot, message, "``` Propquiz finished installing node_modules ```");
      } else {
        prop.reply(bot, message, "``` " + cmd.stderr + " ```");
      }
    });

    this.controller.hears('build propquiz', this.channels, function(bot,message) {
      shell.pushd(path);
      var cmd = shell.exec('npm run compile');
      if (cmd.code === 0) {
        prop.reply(bot, message, "``` Propquiz finished building ```");
      } else {
        prop.reply(bot, message, "``` " + cmd.stderr + " ```");
      }
    });

    this.controller.hears('restart propquiz', this.channels, function(bot,message) {
      var cmd = shell.exec('forever restart /home/timothy/workspace/prop-quiz/server/index.js');
      if (cmd.code === 0) {
        prop.reply(bot, message, "``` Server restarted ```");
      } else {
        prop.reply(bot, message, "``` " + cmd.stderr + " ```");
      }
    });
  }
}
