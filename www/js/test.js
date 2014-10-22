function login(user,pass)
{

//var user = $("#uname").val();
//var pass = $("#pass").val();
	$.ajax({
		url:"http://11.99.99.41:81/login?pg=check&redirect=false",
		type:"POST",
		data:"username="+user+"&password="+pass,
		crossDomain:true,
		success: function(data,statusCode,xhr)
		{
			console.log('data:'+data);
			data = JSON.parse(data);
			if(data.Logged)
			{
				if(getRemember())
				{
					//saveRemember(remember);
					saveUser(user,pass);
				}
				
				var ref = window.open("http://11.99.99.41:81/?pg=login_external&sessionid="+data.Session_id,'_blank',"location=no");
				ref.addEventListener('loadstart', function(event){
					if(event.url.indexOf("index.php?pg=logout") >= 0){
						ref.close();
						event.stopPropagation();
						event.preventDefault();
						return false;
					}
				});
			}
			else
			{
				alert("Wrong login!");
			}
		}
	});
}

function saveUser(user,pass)
{
	var userObj = {'user':user,'pass':pass};
	window.localStorage.setItem("user", JSON.stringify(userObj)) ;
}

function loadUser()
{
	var userObj = JSON.parse(window.localStorage.getItem("user"));
	if(userObj)
	{
		$("#uname").val(userObj.user);
		$("#pass").val(userObj.pass);
	}
}

function saveRemember(remember)
{
	window.localStorage.setItem("rememberme",remember);
	if(!remember)
	{
		window.localStorage.setItem("user", {}) ;
	}
}

function getRemember()
{
	return  window.localStorage.getItem("rememberme") == "true";
}