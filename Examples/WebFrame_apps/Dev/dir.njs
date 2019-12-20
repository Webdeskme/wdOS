exports.c = function (q) {
    var x = '';
    x += '<div class="jumbotron text-center"><h1>Dev: ' + q.dir + '</h1><p>Lets build something!</p></div>';
    x += '<div class="container">';
		x += '<div class="list-group">';
		files = fs.readdirSync(dh_homedir + '/Documents/wdOS/WebFrame/' + q.dir);
			for (i = 0; i < files.length; i++) {
				x += '<a href="desktop.html?app=Dev&sec=file&dir=' + q.dir + '&file=' + files[i] + '" class="list-group-item list-group-item-action">' + files[i] + '</a>';
			}
		x += '</div>'; 
    x += '</div>';
    x += '<br><br><br><br>';
    return x;
}
