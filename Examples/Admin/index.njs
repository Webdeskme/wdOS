exports.c = function (q) {
    var x = '';
    x += '<div class="jumbotron text-center"><h1>Admin</h1><p>Manage Your Users</p></div>';
    x += '<div class="container">';
		x += '<div class="list-group">';
				x += '<a href="desktop.html?app=Admin&sec=set" class="list-group-item list-group-item-action">Settings</a>';
                x += '<a href="desktop.html?app=Admin&sec=users" class="list-group-item list-group-item-action">Users</a>';
				x += '<a href="desktop.html?app=Admin&sec=permiisons" class="list-group-item list-group-item-action">Permissions</a>';
                x += '<a href="desktop.html?app=Admin&sec=logs" class="list-group-item list-group-item-action">Logs</a>';
		x += '</div>';
    x += '</div>';
    x += '<br><br><br><br>';
    return x;
}
