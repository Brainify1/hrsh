$('#ad_form1').submit(function(e) {
    var formData = new FormData(this);
    $.ajax({
        url: '/api/ads/postAd1',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            alert('success!')
        },
        error : function(){
            alert('fail')
        }
    })
})
$('#adSubmit2').click(function(e) {
    var formData = new FormData(document.getElementById('ad_form2')); 
    $.ajax({
        url: '/api/ads/postAd2',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(data){
            alert('success!')
        },
        error : function(){
            alert('fail')
        }
    })
})
$('#adSubmit3').click(function(e) {
    var formData = new FormData($('#ad_form3'));    
    $.ajax({
        url: '/api/ads/postAd3',
        type: 'POST',
        data: formData,
        processData: false,
        success: function(data){
            alert('success!')
            $('#ad_from3').reset();
        },
        error : function(){
            alert('fail')
        }
    })
})
$('#adSubmit4').click(function(e) {
    var formData = new FormData($('#ad_form4'));    
    $.ajax({
        url: '/api/ads/postAd4',
        type: 'POST',
        data: formData,
        processData: false,
        success: function(data){
            alert('success!')
        },
        error : function(){
            alert('fail')
        }
    })
})
