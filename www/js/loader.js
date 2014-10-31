function showLoader()
{
	$('body').append('<div class=\"spinner\" id=\"loaderDiv\"> <div class=\"bounce1\"></div> <div class=\"bounce2\"></div> <div class=\"bounce3\"></div></div>');
}

function hideLoader()
{
	$("#loaderDiv").hide();
}