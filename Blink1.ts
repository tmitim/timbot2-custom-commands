import {BotListener} from "timbot2/lib/BotListener";
var Blink = require('node-blink1');

import dotenv = require('dotenv');
dotenv.config();

export class Blink1 extends BotListener {
  name = "Blink1";
  desc = "listen to chat and blink the blink(1) when there's a message";
  hidden = false;
  active = process.env.BLINK1 == 1;
  channels = ['ambient'];

  start() {
    try {
      var blink1 = new Blink();

      this.controller.hears('', this.channels, function(bot,message) {
        if (Blink.devices().length > 0) {
          blink1.writePatternLine(200, 255, 255, 255, 0);
          blink1.writePatternLine(400, 0, 0, 0, 1);
          blink1.playLoop(0,1,1);
        }
      });
    } catch (err) {
      console.log("Blink1 needs administrative privileges (sudo) to run");
      console.log(err);
    }
  }
}
