var CronJob = require('cron').CronJob; 
var job = new CronJob('* * * * * *', function() {
  var url = 'https://api.nicehash.com/api?method=stats.provider.workers&addr=3PEDD1j69uvzp7pP4ncHiyCp1XSehUk6Y7&algo=24';
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var bodyJson = JSON.parse(body);
        var msg = 'Воркеры: ' + bodyJson.result.workers; 
        bot.sendMessage(messageChatId, msg);
      }
    })
  }, null,
  true, /* Start the job right now */
  'Asia/Vladivostok' /* Time zone of this job. */
);
console.log(bodyJson1.result.workers[0][0]);
bot.sendMessage(chatId, bodyJson1.result.workers[0][0]);