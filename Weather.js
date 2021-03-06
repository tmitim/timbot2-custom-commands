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
var weather = require("weather-js");
var BotListener_1 = require("timbot2/lib/BotListener");
var Weather = (function (_super) {
    __extends(Weather, _super);
    function Weather() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "weather";
        _this.desc = "Shows weather information";
        _this.hidden = false;
        _this.channels = ['direct_message', 'direct_mention', 'mention'];
        return _this;
    }
    Weather.prototype.start = function () {
        var weatherCommand = this;
        weatherCommand.controller.hears('weather', weatherCommand.channels, function (bot, message) {
            var location = process.env.WEATHER_LOCATION || 'Los Angeles, CA';
            var findLocation = message.text.split(" ");
            if (message.text.indexOf('weather in') != -1) {
                location = message.text.substring(message.text.indexOf('weather in') + 10, message.text.length);
            }
            weather.find({ search: location, degreeType: 'F' }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
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
    };
    return Weather;
}(BotListener_1.BotListener));
exports.Weather = Weather;
