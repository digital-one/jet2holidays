$(function() {

	update_saved_results = function(){
		var _saved_total = $('.hotel-result--btn.save.active').length;
		if(_saved_total>0){
			$('#saved-counter,#nav-saved span').text(_saved_total).fadeIn(100);
		} else {
			$('#saved-counter,#nav-saved span').hide().text('0');
		}
	}

	if($('.hotel-result--btn.save').length){

		$('.hotel-result--btn.save').on('click',function(e){
			e.preventDefault();
			console.log('click');
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).find('span').text('Save');
				//remove saved resort
				$(this).find('i').removeClass('fa-check-circle').addClass('fa-plus-circle');
			} else {
				$(this).addClass('active');
				$(this).find('span').text('Saved');
				$(this).find('i').removeClass('fa-plus-circle').addClass('fa-check-circle');
				//add saved resort
			}
			update_saved_results();
		})
	}



});