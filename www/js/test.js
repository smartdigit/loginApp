//var loadingDiv = "$('body').append('<div style=\'width=100%;height=100%;background-image:url(\'img/page-loader.gif\');z-index:999;position:fixed\' id=\'loadingDiv\'></div>')";
var loadingDiv = "$('body').append('<div class=\"spinner\"> <div class=\"bounce1\"></div> <div class=\"bounce2\"></div> <div class=\"bounce3\"></div></div>');"


function injectLoader()
{
	$('body').append('<div class=\"spinner\" style=\"width:100%;height:100%;z-index:999;position:absolute;top:0;\"> <div class=\"bounce1\"></div> <div class=\"bounce2\"></div> <div class=\"bounce3\"></div></div>');
}
function login(user,pass)
{

//var user = $("#uname").val();
//var pass = $("#pass").val();
	$.ajax({
		url:"https://my.monolith-gruppe.com/login?pg=check&redirect=false",
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
				
				var ref = window.open("https://my.monolith-gruppe.com/?pg=login_external&sessionid="+data.Session_id,'_blank',"location=no,toolbar=no,hidden=yes");
				//ref.insertCSS({file:"css/loader.css"});
				//ref.executeScript({file:"js/loader.js"});
				//ref.executeScript({code:"showLoader();"});
				showLoader();
				ref.addEventListener('loadstart', function(event){
					if(event.url.indexOf("index.php?pg=logout") >= 0){
						ref.close();
						event.stopPropagation();
						event.preventDefault();
						return false;
					}
				});
				ref.addEventListener("loadstop",function(){
					//alert("stoppedloading");
					hideLoader();
					ref.show();
					//ref.executeScript({code:"hideLoader();"});
					ref.removeEventListener("loadstop",function(){});
				});
			}
			else
			{
				alert("Wrong login!");
			}
		}
	});
}

function checkWifi()
{
	if(navigator.connection.type == Connection.NONE)
	{
		$.mobile.navigate("#OfflinePage");
	}
	else
	{
		$.mobile.navigate("#loginPage");
	}
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