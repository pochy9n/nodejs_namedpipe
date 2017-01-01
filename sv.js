var readLine = require('readline');

var server = require('named-pipes').listen('our-pipe-name');

server.on('connect', function(client) {
	console.log("type 'exit' to end");

	client.send('message', 'welcome');

	var reader = readLine.createInterface({
		input: process.stdin,
	});

	client.on('message', function(str) {
		console.log("client>" + str);
		if (str == 'exit') {
			process.exit(0);
		}
	});
 
	reader.on('line', function (line) {
		client.send('message', line);
		if (line == 'exit') {
			// 直ぐにprocess.exitを呼び出すと、相手にメッセージが送信され
			// ないので、タイマーを仕掛ける
			setTimeout(function() {
				process.exit(0);
			}, 100);
		}
	});
});
