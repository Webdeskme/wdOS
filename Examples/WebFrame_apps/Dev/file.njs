exports.c = function (q) {
    const wd_homedir = require('os').homedir();
    var x = '';
    x += '<div class="jumbotron text-center"><h1>Dev: ' + q.dir + '/' + q.file + '</h1><p>Lets build something!</p></div>';
    x += '<div class="container">';
		x += '<div class="form-group">';
			x += '<label for="edit">Edittor:</label>';
			x += '<textarea class="form-control" rows="10" id="edit">';
			x += fs.readFileSync(wd_homedir + '/Documents/wdOS/WebFrame/' + q.dir + '/' + q.file);
			x += '</textarea>';
		x += '</div>';
		x += '<button type="button" id="submit" class="btn btn-primary">Save</button>';
    x += '</div>';
    x += '<script src="apps/Dev/file.js"></script>';
    x += '<br><br><br><br>';
    return x;
}
