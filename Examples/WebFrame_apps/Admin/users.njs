exports.c = function (q) {
    var x = '';
    x += '<div class="jumbotron text-center"><h1>Admin: Users</h1><p>Manage Your Users</p></div>';
    x += '<div class="container">';
		x += '<div class="list-group" id="users">';
		x += '</div>';
    x += '</div>';
    x += '<script src="/apps/Admin/userL.js"></script>';
    x += '<br><br><br><br>';
    return x;
}
