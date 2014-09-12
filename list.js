$(document).ready(function(){
	// from beginning, hide all but first select
	//$('.setup, .screen_charge, #quantity, #personalization').hide();

	// load all the dropdowns
	for (var i = 0; i < options.length; i++) {
		var element = options[i][0];
		$('.apparel').append('<option value="' + i + '">' + element + '</option>');
	}
	
	/*for (var i = 1; i < 10; i++) {
		$('.setup').append('<option value=' + i + '>' + i + '</option>');
	}*/
	
	for (var i = 1; i < 7; i++) {
		var tmp_value = i-1;
		$('.screen_charge .content').append('<option value=' + tmp_value + '>' + i + '</option>');
	} // end of loads
	
	
	// CHOOSE YOUR APPAREL
	$(".apparel").change(function() {
		var price_position = $('.apparel option:selected').val();
		price = options[price_position][1];
		static_item = $('.apparel option:selected').text();
		static_garment_price = price;
		get_total();
		$('#quantity_box').show('fast');
	});
	
	// CHOOSE YOUR QUANTITY
	
	$( "#quantity" ).slider({
		range: "min",
		value: 37,
		min: 1,
		max: 999,
			slide: function( event, ui ) {
				$( "#quantity_amount" ).val(ui.value + " garments");
				static_quantity = ui.value;
				get_total();
				$('#setup_box').show('fast');
			}
	});
	$( "#quantity_amount" ).val($( "#quantity" ).slider( "value" ) + " garments");
	
	// CHOOSE HOW MANY GRAPHICS (SETUPS)

	$( "#setup" ).slider({
		range: "min",
		value: 0,
		min: 0,
		max: 10,
			slide: function( event, ui ) {
				$( "#setup_amount" ).val(ui.value + " graphics");
				static_extra_setup = [];
				static_numOfSetup = ui.value;
				get_total();
				generate_screen_box(ui.value);
			}
	});
	$( "#setup_amount" ).val($( "#setup" ).slider( "value" ) + " graphics");
	
	// generate screen_boxes based on number of graphics 
	function generate_screen_box(num_graphics) {
		$('.screen_charge_boxes').html(''); // clears the boxes if # of graphics change
		for (var i = 0; i < num_graphics; i++) {
			var str = '';
			var j = i + 1;
			str += '<h3>Number of colours on Graphic #' + j + '</h3>';
			str += '<div class="screen_charge">';
			//str += '<select class="content"></select>';
			str += '<input type="text" id="SC'+i+'" name="SC'+i+'" disabled style="border: 0; color: #f6931f; font-weight: bold;" />';
			str += '<div class="sc_DIV" id="SC'+i+'slider"></div>';
			str += '</div>';
			$('.screen_charge_boxes').append(str);
			$('#SC'+i).val('1 colour');
			generate_sliders(i);
		}
		//staticPrice(num_graphics);
		$('#personalization').show('fast');
	}
	
	function generate_sliders() {
		var position = '';
		$( '.sc_DIV' ).each(function(idx, elm) {
			//alert('omg');
			var name = elm.id.replace('slider', '');
			position = name.replace('SC', '');
			console.log(elm.id);
			$('#' + elm.id).slider({
				range: "min",
				value: 1,
				min: 0,
				max: 6,
				slide: function( event, ui ) {
					$( '#' + name ).val(ui.value + " colour(s)");
					screen_price_array[idx] = ui.value;
					get_screen_charge(idx,ui.value);
					var tmp_value = ui.value;
					if (ui.value > 1) {
						static_extra_setup[idx] = (ui.value - 1);
					} else {
						static_extra_setup[idx] = 0;
					}
					console.log('changes to idx ' + idx + ' and positions is ' + position + ' and colours are ' + ui.value);
					get_total();
				}
			});
		});
		static_extra_setup[position] = 0;
		get_screen_charge(position,1);
		get_total();
	}
	

	/// inefficient way of checking the price every time... needs improvement
	function get_screen_charge(screen_position, num_colours) {
		var total_screencharge;
		var determined_sc;
		num_colours--;
		if (static_quantity < 12) {
			determined_sc = total_screencharge = 20 / static_quantity;
		}
		else if (static_quantity >= 12 && static_quantity <= 24) {
			determined_sc = total_screencharge = twelve[num_colours]; }
		else if (static_quantity >= 25 && static_quantity <= 50) {
			determined_sc = total_screencharge = twenty_five[num_colours];}
		else if (static_quantity >= 51 && static_quantity <= 99) {
			determined_sc = total_screencharge = fifty_one[num_colours]; }
		else if (static_quantity >= 100 && static_quantity <= 149) {
			determined_sc = total_screencharge = hundred[num_colours]; }
		else if (static_quantity >= 150 && static_quantity <= 249) {
			determined_sc = total_screencharge = hundred_fifty[num_colours]; }
		else if (static_quantity >= 250 && static_quantity <= 499) {
			determined_sc = total_screencharge = two_fifty[num_colours]; }
		else if (static_quantity >= 500 && static_quantity <= 999) {
			determined_sc = total_screencharge = five_hundred[num_colours]; }
		else if (static_quantity > 999) {
			alert('Sorry, we do not accept orders over 999 of the same garment'); }
		total_screencharge = determined_sc * static_quantity;
		screen_price_unit[screen_position] = determined_sc;
		static_screen_array[screen_position] = Math.round(total_screencharge*100)/100;
		get_total();
	}

	// PERSONALIZATION?!

	$( "#personalize" ).slider({
		range: "min",
		value: 0,
		min: 0,
		max: 700,
			slide: function( event, ui ) {
				$( "#personalize_amount" ).val(ui.value + " garments personalized");
				static_personalization = ui.value;
				get_total();
			}
	});
	$( "#personalize_amount" ).val($( "#personalize" ).slider( "value" ) + " garments personalized");
	
});
	