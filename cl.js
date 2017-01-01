var fs = require('fs');
var sleep = require('sleep');

var pipe_exist = false;

// Named Pipe���쐬����Ă��Ȃ��ꍇ�Anamed-pipes.connect�̓n���h���s��
// �G���[���N�����̂ŁAfs.openSync�Ŏ��O�Ƀ`�F�b�N����
for (var i = 0; i < 60 && !pipe_exist; i++) {
	try {
		var fd = fs.openSync('\\\\.\\pipe\\our-pipe-name', 'r+');
		fs.closeSync(fd);
		pipe_exist = true;
	}
	catch (e) {
		sleep.sleep(1);
	}
}

if (!pipe_exist) {
	console.log("server not exist");
	process.exit(1);
}

var readLine = require('readline');
var pipe = require('named-pipes').connect('our-pipe-name');

console.log("type 'exit' to end");

pipe.send('message', 'hello');

pipe.on('message', function(str) {
	console.log("server>" + str);
	if (str == 'exit') {
		process.exit(0);
	}
});

var reader = readLine.createInterface({
	input: process.stdin,
});

reader.on('line', function (line) {
	pipe.send('message', line);
	if (line == 'exit') {
		// ������process.exit���Ăяo���ƁA����Ƀ��b�Z�[�W�����M����Ȃ�
		// �̂ŁA�^�C�}�[���d�|����
		setTimeout(function() {
			process.exit(0);
		}, 100);
	}
});
