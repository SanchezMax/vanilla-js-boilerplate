import json
import telebot
from telebot import types

bot = telebot.TeleBot('YOUR_TELEGRAM_TOKEN_HERE') # get your token from BotFather

# Command processing (starts with '/')
@bot.message_handler(commands=['start'])
def main(message):
    # making a reply keyboard button
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    btn = types.KeyboardButton('Forecast', web_app=telebot.types.WebAppInfo('https://sanchezmax.github.io/weather-tma/'))
    markup.add(btn)
    bot.send_message(message.chat.id, f'Hello, {message.from_user.first_name}! To start the bot, please tap the \"Forecast\" button and enter the city', reply_markup=markup)

# Mini app data processing
@bot.message_handler(content_types='web_app_data')
def web_app(message):
    res = json.loads(message.web_app_data.data)
    # making an inline keyboard button
    markup = types.InlineKeyboardMarkup()
    btn = types.InlineKeyboardButton('Check the weather', web_app=telebot.types.WebAppInfo('https://sanchezmax.github.io/weather-tma/'))
    markup.add(btn)
    bot.send_message(message.chat.id, f'Thank you for using this bot! Hope the weather in {res["city"]} didn\'t dissapoint you. If you want to know the weather again, tap on the button below', reply_markup=markup)

# Looping work
bot.polling(none_stop=True)