exports.c = function (req){
	const wd_homedir = require('os').homedir();
	fs.writeFileSync(wd_homedir + '/Documents/wdOS/WebFrame/' + req.body.dir + '/' + req.body.file, req.body.con);
	return "Saved";
}
