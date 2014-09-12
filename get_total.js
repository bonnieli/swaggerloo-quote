function get_total() {
	if (static_quantity == 0) {
		total = '-';
		tax = '-';
	} else {
		total = static_quantity * static_garment_price;
		total += setup_price * static_numOfSetup;
		for (var i = 0; i < static_numOfSetup; i++) {
			//alert(static_screen_array[i]);
			total += static_screen_array[i];
		}
		total += static_personalization * personalization;
		get_extrasetup();
		total += static_extra_setup_total;
		total *= 1.05; // 5% profit
		var results = Math.round(total*100)/100;
		var after_tax = total * 1.13; 
		var tax = Math.round(after_tax*100)/100;
	}
	print_form();
	$('.table_total').text(results);
	$('.table_tax').text(tax);
}

function get_extrasetup() {
	var x = static_extra_setup.length;
	//console.log('length of extra setup' + x);
	var total_extra_setup = 0;
	for (var k = 0 ; k < x; k++) {
		total_extra_setup += static_extra_setup[k];
	}
	static_extra_setup_total = total_extra_setup * setup_price;
}

function print_form() {
	var str = '<table>';
	
	str += '<tr><td class="left">' + static_item + '</td>';
	str += '<td>$' + Math.round(static_garment_price*1.05*100)/100 + ' per unit</td></tr>';
	
	str += '<tr><td class="left">Quantity</td><td>' + static_quantity + '</td></tr>';
	
	var tmp_setup = static_numOfSetup * setup_price * 1.05;
	var tmp_setup_price = setup_price * 1.05;
	var tmp_str = '$' + Math.round(tmp_setup_price*100)/100 + ' x ' + static_numOfSetup + ' = $' + tmp_setup;
	str += '<tr><td class="left">Number of graphics</td><td>' + tmp_str + '</td></tr>';
	
	for (var i = 0; i < static_numOfSetup; i++) {
		var j = i + 1;
		var tmp_spu = screen_price_unit[i] * 1.05;
		var tmp_ssa = static_screen_array[i] * 1.05;
		var tmp_str = '$' + Math.round(tmp_spu*100)/100 + ' x ' + static_quantity + ' = $' + Math.round(tmp_ssa*100)/100;
		str += '<tr><td class="left">Number of colours for Graphic #' + j + '</td><td>' + tmp_str + '</td></tr>';
	}
	
	var tmp_extrasetup = static_extra_setup_total * 1.05;
	str += '<tr><td class="left">Extra Set-ups</td><td>$' + Math.round(tmp_extrasetup*100)/100 + '</td></tr>';
	
	var total_personalization = personalization * static_personalization * 1.05;
	var tmp_personalization_total = Math.round(total_personalization * 100)/100;
	var tmp_personalization = personalization * 1.05;
	var tmp_str = '$' + Math.round(tmp_personalization*100)/100 + ' x ' + static_personalization + ' = $' + tmp_personalization_total;
	str += '<tr><td class="left">Personalization</td><td>' + tmp_str + '</td></tr>';
	
	str += '<tr><td class="left">Total</td><td class="table_total"></td></tr>';
	str += '<tr><td class="left">Total After Tax (HST 13%)</td><td class="table_tax"></td></tr>';
	
	str += '</table>';
	$('.form').html(str);
}