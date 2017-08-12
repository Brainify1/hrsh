// carousel
var boxheight = $('.carousel-inner').height();
	var itemlength = $('.item').length;
	var triggerheight = Math.round(boxheight/itemlength+1);
	$('.list-group-item').height(triggerheight);
	
	var clickEvent = false;
	$('#myCarousel').carousel({
		interval:   4000	
	}).on('click', '.list-group li', function() {
			clickEvent = true;
			$('.list-group li').removeClass('active');
			$(this).addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.list-group').children().length -1;
			var current = $('.list-group li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.list-group li').first().addClass('active');	
			}
		}
		clickEvent = false;
	});
// carousel ended

// news block
$('li#tlHot').click(function(){
	$('li#tlNew').removeClass('focus');
	$('li#tlHot').addClass('focus');
	$('div.newList').css('display', 'none');
	$('div.hotList').css('display', 'initial');
});

$('li#tlNew').click(function(){
	$('li#tlHot').removeClass('focus');
	$('li#tlNew').addClass('focus');
	$('div.hotList').css('display', 'none');
	$('div.newList').css('display', 'initial');
});
// news block end

$("#triggerSignup").click(function(){
  $('#myModal').modal('hide');
  $('#myModal2').modal('show');
});

$("#triggerLogin").click(function(){
  $('#myModal2').modal('hide');
  $('#myModal').modal('show');
});

if ($('#authStatus').val() == "true"){
	$('#loginStatus').hide();
	$('#loginStatus2').hide();
	$('#loginStatus3').show();
}
if ($('#authStatus').val() == "false"){
	$('#loginStatus').show();
	$('#loginStatus2').show();
	$('#loginStatus3').hide();

}


var onDragEnter = function (event) {
    //event.preventDefault();
    $(".br_dropzone").addClass("dragover");
},
 
onDragOver = function (event) {
    event.preventDefault();
    if (!$(".br_dropzone").hasClass("dragover"))
        $(".br_dropzone").addClass("dragover");
},
 
onDragLeave = function (event) {
    event.preventDefault();
    $(".br_dropzone").removeClass("dragover");
},
 
onDrop = function (event) {
    //event.preventDefault();
    $(".br_dropzone").removeClass("dragover");
    $(".br_dropzone").addClass("dragdrop");
    console.log(event.originalEvent.dataTransfer.files);
};
 
$(".br_dropzone")
.on("dragenter", onDragEnter)
.on("dragover", onDragOver)
.on("dragleave", onDragLeave)
.on("drop", onDrop);

Dropzone.options.br_dropzone = {
        acceptedFiles: 'image/*',
        maxFiles: 1,

        init: function () {
            this.on("complete", function (data) {
                var res = eval('(' + data.xhr.responseText + ')');
                $('#newImage').text(res.Message);
            });
            this.on("maxfilesexceeded", function (data) {
                this.removeFile(data);
            });
        }
    };
