import {BotListener} from "timbot2/lib/BotListener";

export class Pizza extends BotListener {
  name = "pizza";
  desc = "Yum, pizza";
  hidden = true;
  channels = ['direct_message','direct_mention','mention','ambient'];

  start() {

    this.controller.hears('pizza', this.channels, (bot,message) => {
      // reply
      this.reply(bot, message, "pizza? I want pizza");
      // reply as code
      // this.replyCode(bot, message, "pizza I want pizza");
    // to use reply
    });
  }
}
