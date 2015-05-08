$(function() {

// save search results

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
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).find('span').text('Save');
				//remove saved resort
				$(this).find('i').removeClass('fa-check-circle').addClass('fa-plus-circle');
				$(this).css({
					'background-color': '#6EBEE3'
				})
			} else {
				$(this).addClass('active');
				$(this).find('span').text('Saved');
				$(this).find('i').removeClass('fa-plus-circle').addClass('fa-check-circle');
				$(this).css({
					'background-color': '#2F71B0'
				})
				//add saved resort
			}
			update_saved_results();
		})
	}

//number selector

var _selected_rooms = 1;

$('.number-toggle--nav').each(function(){
	var _minus = $(this).find('.fa-minus-circle'),
		_plus = $(this).find('.fa-plus-circle'),
		_number = $(this).find('.number-toggle--number'),
		_current_number = parseInt($(_number).text()),
		_max = $(this).data('max'),
		_min = $(this).data('min'),
		_parent = $(this).parent('.number-toggle'),
		_parent_room = $(this).parents('.room-occupancy'),
		_room_control = $(_parent).hasClass('select-rooms-control') ? true : false,
		_children_control = $(_parent).hasClass('select-children-control') ? true : false,
		_selected_children = 1;

	$(_plus).on('click',function(e){
		if(_current_number < _max){
		_current_number = _current_number+1;
		$(_number).text(_current_number);
		//increment room panel
		if(_room_control){
			$('.room-occupancy').eq(0).clone().appendTo('.rooms');
			$('.room-occupancy .room-title').last().text('Room '+_current_number);
			_selected_rooms++;
		}
		if(_children_control){
			console.log(_parent_room);
			$('.child',_parent_room).eq(0).clone().appendTo('.child-ages',_parent_room);
			_selected_children++;
			$('.child h4',_parent_room).last().text('Age of child '+_selected_children);
		}
		}
	})
	$(_minus).on('click',function(e){
		e.preventDefault();
		if(_current_number > _min){
		_current_number = _current_number-1;
		$(_number).text(_current_number);
		//remove room panel
		if(_room_control) $('.room-occupancy').last().remove();
		_selected_rooms--;
		}
		if(_children_control){
			
		}
	})
})

//gallery slider


$('.gallery-overlay .slider').slick({
    dots: false,
    autoplay: true,
    fade: false,
    autoplaySpeed: 4000,
    speed: 600,
    pauseOnHover: true,
    arrows: true
  });


//back to top button

var _scrollDirection = 'down',
	_document_height = $(document).height(),
	_window_height = $(window).height(),
	_waypoint = _document_height/100 * 30,  //30% of height
	_btt_button = $('.back-to-top'),
	_btn_pos = (_window_height/2) - (_btt_button.outerHeight()/2) + 40;

	$('.back-to-top,#back-to-top').on('click',function(e){
		e.preventDefault();
		var _animationSpeed = 500,
		_target = '0';
	 $.scrollTo( _target, _animationSpeed, {
          easing: 'easeInOutExpo',
          offset: 0
        });
	})

$(window).on('scroll',function(){
	_scroll_top = $(window).scrollTop();
	if(_scroll_top > _waypoint && _scrollDirection == 'up'){
		//show the btt button
		_btt_button.css({
			top:  _btn_pos+'px'
		})
		_btt_button.fadeIn(200);
		console.log('show butt');
	} else {
		_btt_button.fadeOut(200);
			console.log('hide butt');
	}
})

$(window).on( 'DOMMouseScroll mousewheel', function ( event ) {
  if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { 
    //scroll down
    _scrollDirection = 'down';
  } else {
    //scroll up
   	_scrollDirection = 'up';
  }
});

// room occupancy validation

$('a#confirm-rooms').on('click',function(e){
	e.preventDefault();
	console.log('click');
	var _error_messages = [],
		_errors = 0,
		_rooms = $('.room-occupancy'),
		_validate_fields = $('.select-adults-control, .select-children-control');
		_validate_fields.each(function(){
			_var = parseInt($(this).find('.number-toggle--number').text()),
			_title = $(this).data('title');
			if(_var < 1){
				_error_messages.push(_title);
				_errors +=1;
			}
		});
		if(_errors){
			$('.messagebox .content ul').html('');
		$.each( _error_messages, function( i, val ) {
			$('.messagebox .content ul').append('<li>Please select at least one '+val+'</li>');	
		});
		$('.messagebox').slideDown(100);
		}
		/*
	$.each( _rooms, function( i, room ) {
		
	});
	*/
})


// search form validation

$('.messagebox #close').on('click',function(e){
	$('.messagebox').slideUp(100);
});

if($('#fcp-search').length){
$('#fcp-search').on('submit',function(){
	$('.messagebox').hide();
	var _validate_fields = $('.select-departure-airport,.select-destination'),
		_error_messages = [],
		_errors =0;
	_validate_fields.each(function(){
		var _control = $(this).data('control'),
			_title = $(this).data('title');
		if($('.'+_control+ ' li.active').length<1){
			_error_messages.push(_title);
			_errors +=1;
		}
	})
	if(_errors){
		$('.messagebox .content ul').html('');
		$.each( _error_messages, function( i, val ) {
			$('.messagebox .content ul').append('<li>Please select a '+val+'</li>');	
		});
		$('.messagebox').slideDown(100);
		return false;
		}


})
}

});