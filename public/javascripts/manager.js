function videoManager() {
    $.ajax({
        url: "/api/manager/video/all/?key=YGJnH2mWYHw4CU3pJEQGjdNzVeL9qKfm", success: function (result) {
            //for (var i = 0; result.length <i; i++) {
                $('#video_display').html('')
                $('#video_display').append(`
                    <tr>
                                                        <td>gfvabjshlgfhvabjc123123asd</td>
                                                        <td>title</td>
                                                        <td>View</td>
                                                        <td>Date</td>
                                                        <td><a href="#" onclick="videoDelete">删除视频</a></td>
                                                    </tr>
                `)
           //}
        }
    })
}
function CKupdate() {
    for (instance in CKEDITOR.instances)
        CKEDITOR.instances[instance].updateElement();
}
$('#createNewsForm').submit(function (e) {
    e.preventDefault();
    CKupdate()
    var self = $(this)
    $.ajax({
        url: '/api/postNews',
        data: self.serialize(),
        method: 'post',
        success: function (result) {
            console.log(`${result.title} 发布成功！`)
        },
        error: function (err) {
            console.log('发布失败')
        }
    })
}) 