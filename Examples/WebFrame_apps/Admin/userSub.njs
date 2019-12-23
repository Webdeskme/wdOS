exports.c = function (req){
	$.post("/get",
  {
    name: "Donald Duck",
    city: "Duckburg"
  },
  function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
	return "Saved";
}
