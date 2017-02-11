"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
                    this.reply(bot, message, botMessage);
                    console.log(new Date().toUTCString() + ": " + botMessage);
                    for (var day = 1; day < result[0].forecast.length; day++) {
                        if (result[0].forecast[day].precip >= 50) {
                            (day === 1) ?
                                this.reply(bot, message, "Looks like it might rain today") :
                                this.reply(bot, message, "Looks like it might rain on " + result[0].forecast[day].day);
                            break;
                        }
                    }
                }
            });
        }.bind(this));
    };
    return Weather;
}(BotListener_1.BotListener));
exports.Weather = Weather;
