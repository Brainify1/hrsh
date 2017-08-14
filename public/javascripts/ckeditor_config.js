CKEDITOR.replace( 'editor', {
	language: 'zh-cn',
	removePlugins: 'sourcearea, about',
	resize_enabled: false,
    enterMode: CKEDITOR.ENTER_BR,
    entities_additional: CKEDITOR.entities_additional
	}
);



$("#postForm").submit( function(e) {
	var messageLength = CKEDITOR.instances['editor'].getData().replace(/<[^>]*>/gi,'').length;
    	if( !messageLength ) {
            swal( 'Please enter a message ;(' );
                e.preventDefault();
        }
        else{
        swal("Thank you for submitting!");
    	}
});
