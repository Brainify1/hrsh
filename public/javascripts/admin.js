$('#dash-tab').show()
$('#dash-tab').siblings().hide()
$('#dash-anchor').click(function(){
    if (!$(this).hasClass('active')) {
        $(this).toggleClass('active')
    }
    $(this).siblings().removeClass('active')
    $('.dash-tab').show()
    $('.dash-tab').siblings().hide()
})
$('#news-anchor').click(function() {
    if (!$(this).hasClass('active')) {
        $(this).toggleClass('active')
    }
    $(this).siblings().removeClass('active')
    $('.news-tab').show()
    $('.news-tab').siblings().hide()
})
$('#acc-anchor').click(function() {
    if (!$(this).hasClass('active')) {
        $(this).toggleClass('active')
    }
    $(this).siblings().removeClass('active')
    $('.acc-tab').show()
    $('.acc-tab').siblings().hide()
})
$('#news-anchor').click(function() {
    if (!$(this).hasClass('active')) {
        $(this).toggleClass('active')
    }
    $(this).siblings().removeClass('active')
    $('.news-tab').show()
    $('.news-tab').siblings().hide()
})
$('#listings-anchor').click(function() {
    if (!$(this).hasClass('active')) {
        $(this).toggleClass('active')
    }
    $(this).siblings().removeClass('active')
    $('.listings-tab').show()
    $('.listings-tab').siblings().hide()
})
$('#ads-anchor').click(function() {
    if (!$(this).hasClass('active')) {
        $(this).toggleClass('active')
    }
    $(this).siblings().removeClass('active')
    $('.ads-tab').show()
    $('.ads-tab').siblings().hide()
})
$('#users-anchor').click(function() {
    if (!$(this).hasClass('active')) {
        $(this).toggleClass('active')
    }
    $(this).siblings().removeClass('active')
    $('.users-tab').show()
    $('.users-tab').siblings().hide()
})
$('#video-anchor').click(function() {
    if (!$(this).hasClass('active')) {
        $(this).toggleClass('active')
    }
    $(this).siblings().removeClass('active')
    $('.video-tab').show()
    $('.video-tab').siblings().hide()
})