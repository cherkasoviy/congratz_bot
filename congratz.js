var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');
var CronJob = require('cron').CronJob;
var token = '447409197:AAFRWjJgU-TuyEP_097c6wEPRRsWm7Ed9lE';
var bot = new TelegramBot(token, {polling: true});
function writeLog(filename, data) {	
  var dataString = JSON.stringify(data, null, 2);
  var curDate = new Date();   
  fs.readFile(filename, function (err, logData) {
    var text = logData.toString();
    curDate = curDate.getDate() + '.' + curDate.getMonth() + '.' + curDate.getFullYear()
    + " " + curDate.getHours() + ":" + curDate.getMinutes() + ":" + curDate.getSeconds();
    text += "\r\n#-------------------------------\r\n" + curDate + "\r\n#-------------------------------\r\n" +dataString;
 
    fs.writeFile(filename, text, function(err) {
      if(err) throw err;
    });
  });
}; 
function writemembers(filename, data) {
	var member = {
		chatId: data.chat.id,
		id: data.from.id,
		first_name: data.from.first_name,	
    	username: data.from.username,
    	BirthDay: 'BLANK',
    	BirthMonth: 'BLANK'
	};
	fs.readFile(filename, function(err, members) {
		var existingMembers = JSON.parse(members);
		for(key in existingMembers.members){
			if(existingMembers.members[key].id === member.id){
				break;	
			}
			else if(existingMembers.members.length - 1 == key ) {
				existingMembers.members.push(member);
				bot.sendMessage(34548632, 'В ' + data.chat.title + ' новый пользователь - ' + member.first_name);
				writeLog('all.log', data);
				fs.writeFile(filename, JSON.stringify(existingMembers, null, 2), function(err) {
					if(err) throw err;
				});
			}
			else {
				console.log('Searching...');
				console.log(existingMembers.members.length);
			}
		
	}
	})	
}
bot.on('text', function(msg) {
	writemembers('data.json', msg);
	if(msg.from.id === 34548632 && msg.chat.id > 0) {
		bot.sendMessage(-1001048446549, msg.text);
		bot.sendSticker(-1001048446549, 'CAADAgADkAEAAhmGAwABS5c7xXaQRRYC');
	}
});
var job = new CronJob('00 01 00 * * *', function() {
	var curDate = new Date();
	console.log(curDate.getDate(), curDate.getMonth());
	fs.readFile('data.json', function(err, members) {
		var existingMembers = JSON.parse(members);
		for(key in existingMembers.members){
			if(existingMembers.members[key].BirthDay == curDate.getDate() && existingMembers.members[key].BirthMonth == curDate.getMonth()+1){
					bot.sendMessage(existingMembers.members[key].chatId, 'Воу-воу-воу, говорят сегодня празднует день рождения ' + existingMembers.members[key].first_name + ' aka @' + existingMembers.members[key].username + ', поздравления!');
					bot.sendSticker(existingMembers.members[key].chatId, 'CAADAgADkAEAAhmGAwABS5c7xXaQRRYC');
			}
	}
	})
});
job.start();
/*
existingMembers.members.push(member);
				console.log('New member found!');
				console.log(existingMembers.members[key].first_name + ' уже существует');
bot.getChatMembersCount(messageChatId).then(function(data){
	fs.readFile('data.json', function (err, data2) {
	var text = data2.toString();
	text += "\r\n#-------------------------------\r\n" + data;
	fs.writeFile('data.json', text, function (err) {
		if(err) throw err;
	})
})	
});

fs.writeFile(filename, JSON.stringify(member, null, 2), function (err) {
		if(err) throw err;
	});

*/