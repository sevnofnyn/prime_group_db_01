var gInterval;
var $gUl = $('ul');
$(document).ready(function(){
	var $assignment = $('#assignment-template').html();
	var assignmentTmp = Handlebars.compile($assignment);
	console.log('ready');
	gInterval = setInterval(function () {
		var ajaxCall = $.ajax({
			type: 'GET',
			url: '/assignments',
			dataType: 'json'
		});

		ajaxCall.done(function(res) {
			//console.log(res);

			// map li id's to an array
			var $elems = $.map($('li'), function (elem) {
				return [[elem.id]];
			});
			//console.log("element id", $elems);

			var resToAdd = [];
			res.forEach(function(elem, index) {// loop through response array
				//console.log("response element", elem);
				var exists = false;
				$elems.forEach(function (e, i) {// loop through dom items
					//console.log("res e, dom e", e[0], elem._id);
					if(e[0] == elem._id) {// already in dom, remove rom $elems
						$elems.splice(i, 1);
						exists = true;
						return true;
					}
				});
				if(exists == false) {
					resToAdd.push(elem);
				}
			});
			$gUl.append(assignmentTmp(resToAdd));
			//console.log("stuff to add", resToAdd);
			//for(var i = 0; i < resToAdd.length; i++) {
			//	console.log(resToAdd[i]);
			//
			//	$gUl.append(assignmentTmp(resToAdd[i]));
			//}
			//resToAdd.forEach(function (val, ind, arr) {
			//
			//	$gUl.append(assignmentTmp(arr[ind]));
			//});
		});
	}, 5000);

	$('form').on('submit', function (e) {
		e.preventDefault();
		var ajaxData = {};
		$.each($('form').serializeArray(), function() {
			if(this.name == "date_completed") {// format date to js
				ajaxData[this.name] = new Date(this.value);
			}else {
				ajaxData[this.name] = this.value;
			}
		});
		var ajaxCall = $.ajax({
			type: 'POST',
			url: '/assignments',
			data: ajaxData
		});
		//$gUl.append(assignmentTmp([ajaxData]));// append to DOM right away
	});
});