import weather = require('weather-js');
import {BotListener} from "timbot2/lib/BotListener";


export class Weather extends BotListener {
  name = "weather";
  desc = "Shows weather information";
  hidden = false;
  channels = ['direct_message','direct_mention','mention'];

  start(){
    var weatherCommand = this;
    weatherCommand.controller.hears('weather', weatherCommand.channels, function(bot,message) {
      var location = process.env.WEATHER_LOCATION || 'Los Angeles, CA';
      var findLocation = message.text.split(" ");
      if (message.text.indexOf('weather in') != -1) {
        location = message.text.substring(message.text.indexOf('weather in') + 10, message.text.length);
      }

      weather.find({search: location, degreeType: 'F'}, function(err, result) {
        if(err) {
          console.log(err);
        } else {
          var botMessage = "Feels like " + result[0].current.feelslike + result[0].location.degreetype + " here in " +
            result[0].location.name + ". (" + result[0].forecast[0].high + "/" + result[0].forecast[0].low + ")";

          weatherCommand.reply(bot, message, botMessage);

          for (var day = 1; day < result[0].forecast.length; day++) {
            if (result[0].forecast[day].precip >= 50) {
              (day === 1) ?
                weatherCommand.reply(bot, message, "Looks like it might rain today") :
                weatherCommand.reply(bot, message, "Looks like it might rain on " + result[0].forecast[day].day);

              break;
            }
          }
        }
      });
    });
  }
}
