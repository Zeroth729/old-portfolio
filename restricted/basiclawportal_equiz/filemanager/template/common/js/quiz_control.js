var resizeEvt;

var quiz = {
	progress:1,
	answers: new Array,
	init:function(){
		$('.answer_box').append('<label class="hide"><select class="dropdown"><option value="">請選擇答案</option></select></label>');
		$.each(options, function(k, v) {
			$('.choices_wrap').append('<div id="choice_'+k+'" class="choice_box">'+k+'. '+v+'</div>');
			$('.dropdown').addClass().append('<option value="'+k+'">'+k+'. '+v+'</option>');
		});
		
		$('.choice_box').draggable({
			revert: 'invalid',
			stack: ".choice_box",
			helper: function(){
				return $(this).clone().width($(this).outerWidth());
			},
		});
		$('.answer_box').droppable({
			drop: function (event, ui) {
				ui.draggable.clone().addClass('isAns').appendTo($(this));
				$(this).find('label').addClass('freeze');
				$(this).data('ans', ui.draggable.attr('id').split('_')[1]).droppable('disable');
				quiz.bindRemoveBtn();
				setTimeout(function(){
					quiz.updateAnswers();
					quiz.isComplete();
				}, 100);
			}
		});
		$('.question_wrap').each(function(index){
			$(this).prepend('<p class="qTitle">問題'+(index+1)+'.</p>');
		});
		$('#q1').addClass('current');

		/* Mobile starts */		
		quiz.bindDropdown();
		/* end */

		quiz.updateAnswers();
		quiz.modeSwitch();
	},
	updateAnswers:function(){
		var cache = [];
		$('.answer_box').each(function(index){
			if ($(this).data('ans') != undefined) {
				cache.push($(this).data('ans'));
			}			
		});
		quiz.answers = cache;
		quiz.updateBasket();
	},
	updateBasket:function(){
		var cache = [];
		$('.choices_wrap > div').removeClass('selected');
		$('.ui-draggable-disabled').draggable('enable');
		$('.choices_wrap > div').each(function(){
			for (i=0;i<quiz.answers.length;i++) {
				if ($(this).attr('id').split('_')[1] == quiz.answers[i]) {
					$(this).addClass('selected');
					$(this).draggable('disable');
				}
			}			
		});
		console.log(quiz.answers);
	},
	updateOptions:function(ans, isRemove){
		if (isRemove) {
			$('.dropdown>option[value="'+ans+'"]').hide();	
		} else {
			$('.dropdown>option[value="'+ans+'"]').show();
		}		
	},
	bindRemoveBtn:function(){
		$('.choice_box.isAns').off('click');
		$('.choice_box.isAns').on('click', function(){
			var delAns = $(this).attr('id').split('_')[1];
			$(this).parent('.answer_box').data('ans', null).droppable('enable');
			$(this).siblings('label').removeClass('freeze');
			$(this).siblings('label').children('.dropdown').val('');
			$(this).remove();
			quiz.updateOptions(delAns, false);
			setTimeout(function(){
				quiz.updateAnswers();
				quiz.modeSwitch();
				quiz.isComplete();
			}, 100);
		});
	},
	bindDropdown:function(){
		$('.dropdown').each(function(){
			$(this).on('change', function(){
				var val = $(this).val();
				if (val.length > 0) {
					$(this).parent('label').addClass('freeze hide');
					$(this).parents('.answer_box').data('ans', val).droppable('disable').prepend('<div id="choice_'+val+'" class="choice_box isAns">'+val+'. '+options[val]+'</div>');
					quiz.updateOptions(val, true);
					quiz.bindRemoveBtn();
					setTimeout(function(){
						quiz.updateAnswers();
						quiz.isComplete();
					}, 100);
				}				
			});
		});
	},
	isComplete:function(){
		var current = $('.question_wrap.current');
		if (current.find('.answer_box').length == current.find('.answer_box > .choice_box').length) {
			$('#btn_submit').removeClass('hide');
			if (quiz.progress == $('.question_wrap').length) {
				$('#btn_submit').addClass('last');
			}
		} else {
			$('#btn_submit').addClass('hide');
		}
	},
	nextStep:function(diff){
		if (quiz.progress == $('.question_wrap').length) {
			var ansString = quiz.answers.join(',')
			alert(ansString);
		} else {
			quiz.progress += diff;
			$('#btn_submit').removeClass('last').addClass('hide'); // for future prev question use
			$('.question_wrap').removeClass('current');
			$('#q'+quiz.progress).addClass('current');

		}
	},
	modeSwitch:function(){		
		if (window.matchMedia("(max-width: 769px)").matches) {
			$('label:not(.freeze)').removeClass('hide');
		} else {
			$('label:not(.freeze)').addClass('hide');
		}
	}
}



$(window).load(function(){
	quiz.init();
});

$(window).resize(function(){
	clearTimeout(resizeEvt);
	resizeEvt = setTimeout(function(){
		quiz.modeSwitch();
	}, 250);
});