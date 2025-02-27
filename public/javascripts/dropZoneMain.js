var myDropzone = new Dropzone("div#dropzone",{
  url: '/postList/images',
  uploadMultiple:true,
  parallelUploads:4,
  dictDefaultMessage: "点击/拖曳图片",
    maxFilesize: 2,
    addRemoveLinks: true,
    dictResponseError: 'Server not Configured',
    acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
    autoProcessQueue: false,
    maxFiles:3,
    init:function(){
      var self = this;
      // config
      self.options.addRemoveLinks = true;
      self.options.dictRemoveFile = "Delete";
      //New file added
      self.on("addedfile", function (file) {
        console.log('new file added ', file);
      });
      // Send file starts
      self.on("sending", function (file) {
        console.log('upload started', file);
        $('.meter').show();
      });
      
      // File upload Progress
      self.on("totaluploadprogress", function (progress) {
        console.log("progress ", progress);
        $('.roller').width(progress + '%');
      });

      self.on("queuecomplete", function (progress) {
        $('.meter').delay(999).slideUp(999);
        setTimeout(uploadInfo,1000)
      });
      
      // On removing file
      self.on("removedfile", function (file) {
        console.log(file);
      });
    }
  })

function uploadInfo(){
    $("#postForm").submit();
}

//  $("#postForm").submit(function(e) {
//   var messageLength = CKEDITOR.instances['editor'].getData().replace(/<[^>]*>/gi,'').length;
//       if( !messageLength ) {
//             swal( 'Please enter a message ;(' );
//                 e.preventDefault();
//         }
//         else{
//         swal("Thank you for submitting!");
//       }
// })
