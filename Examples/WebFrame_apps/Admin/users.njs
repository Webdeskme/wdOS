exports.c = function (q) {
    var x = '';
    x += '<div class="jumbotron text-center"><h1>Admin: Users</h1><p>Manage Your Users</p></div>';
    x += '<div class="container">';
		 x += '<form class="card bg-info text-white">';
		 x += '<div class="container"><br>';
		   x += '<div class="form-group">';
		     x += '<label for="nu">Username:</label>';
		     x += '<input type="text" class="form-control" placeholder="Username" id="nu">';
		   x += '</div>';
		   x += '<div class="form-group">';
		     x += '<label for="pwd">Password:</label>';
		     x += '<input type="password" class="form-control" placeholder="Enter password" id="pwd">';
		   x += '</div>';
		   x += '<button type="button" class="btn btn-primary" id="add">Add</button>';
			x += '<br><br></div>';
		 x += '</form>';
		 x += '<br><hr><br>';
		x += '<div class="list-group" id="users">';
		x += '</div>';
    x += '</div>';
    x += '<script src="/apps/Admin/userL.js"></script>';
    x += '<br><br><br><br>';
    return x;
}
