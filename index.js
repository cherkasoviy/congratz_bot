var TelegramBot = require('node-telegram-bot-api'); // Тем самым подключаем api 
var CronJob = require('cron').CronJob;
var TOKEN = '387391031:AAExuD8BQubigm-h-crrXk8wurogOtCPWVQ'  
var botOptions = {   polling: true };
var request = require('request'); 
var opts = {
  reply_markup: JSON.stringify({
    keyboard: [
      ['BTC','ETH']
    ],
    resize_keyboard: true
  })
};
var bot = new TelegramBot(TOKEN, botOptions);


bot.on('text', function(msg){
	var messageChatId = msg.chat.id;
	var messageText = msg.text;
	if (messageText === '/start'){
		bot.sendMessage(messageChatId, 'Hear me roar', opts);
	}
	else if (messageText === 'BTC') {
    var url = 'https://btc-e.nz/api/3/ticker/btc_usd';
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var bodyJson = JSON.parse(body);
        var msg = 'Продажа 1 BTC: ' + bodyJson.btc_usd.sell + '$\r\n';
        msg += 'Покупка 1 BTC: ' + bodyJson.btc_usd.buy + '$';
        bot.sendMessage(messageChatId, msg, opts);
      }
    })
  }
  else if (messageText === 'ETH') {
    var url = 'https://btc-e.nz/api/3/ticker/eth_usd';
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var bodyJson = JSON.parse(body);
        var msg = 'Продажа 1 ETH: ' + bodyJson.eth_usd.sell + '$\r\n';
        msg += 'Покупка 1 ETH: ' + bodyJson.eth_usd.buy + '$';
        bot.sendMessage(messageChatId, msg, opts);
      }
    })
  }
  else {
  	var msg = 'Що вы пристали к бедному еврею, я умею только в 2 кнопки.';
  	bot.sendMessage(messageChatId, msg, opts);
  }

})
var job = new CronJob('0 1,31 * * * *', function() {
	var bodyJson1 = 'Empty1', bodyJson2 = 'Empty2';
	var chatId = 34548632;
	var url1 = 'https://api.nicehash.com/api?method=stats.provider.workers&addr=3PEDD1j69uvzp7pP4ncHiyCp1XSehUk6Y7&algo=24';
	var url2 = 'https://api.nicehash.com/api?method=stats.provider.workers&addr=3PEDD1j69uvzp7pP4ncHiyCp1XSehUk6Y7&algo=22'; 
    request(url1, function (error, response, body) {
    	if (!error && response.statusCode == 200) {
        bodyJson1 = JSON.parse(body).result.workers.length;
        //console.log('request url1:'+bodyJson1);  
    request(url2, function (error, response, body) {
    	if (!error && response.statusCode == 200) {
        bodyJson2 = JSON.parse(body).result.workers.length;
        //console.log('request url2:'+bodyJson2);
    if (!bodyJson1 || !bodyJson2) {
    	var alarm = bodyJson1 + ' : ' + bodyJson2;
    	console.log('alarm:'+alarm);
    	bot.sendMessage(chatId, alarm);
    };
    }
})
      }
    })
    
    
});
job.start();