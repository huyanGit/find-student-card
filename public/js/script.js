var url = 'http://localhost:3000/api';
var max_no;
var page_size = 8;
var page_no = 1;
$(function(){
	getMaxNo();
	$('.curr').text(page_no + '/');
	$('.next').click(next);	
	$('.prev').click(prev);
	$('.sub').click(addCard);
});

function getMaxNo(){
	$.ajax({
		url: url + '/lostedcard/count',
		type: 'GET',
		success: function(count){
			max_no = Math.ceil(count/8);
			if(!max_no) max_no = 1;
			$('.max_no').text(max_no);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function addCard () {
	var obj = {
		studentId: $('#studentId').val(),
		email: $('#email').val()
	}
	$.ajax({
		url: url +'/notfoundcard',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(obj),	
		success: function(){
			alert('提交成功！');
			$('#studentId').val('');
			$('#email').val('');
		},
		error: function(err){
			console.log(err);
		}
	});
}

function getData(page_no, page_size){
	$.ajax({
		url: url + '/lostedcard?page_size=' + page_size + '&page_no=' + page_no,
		type: 'GET',
		success: function(lostedcards){
			var html = '';
			for(var i = 0; i < lostedcards.length; i++){
				html += convertToStr(lostedcards[i]);
			}
			$('tbody tr').remove();
			$('tbody').append(html);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function convertToStr(data){
	return '<tr>' +
	'<td>' + data.cardid + '</td>' +
	'<td>' + data.create_at.slice(0,10) + '</td>' +
	'<td>' + data.lostedplace + '</td>' +
  '</tr>'
}

function next(){
	if(page_no == max_no) return false;
	page_no++;
	getData(page_no, page_size);
	$('.curr').text(page_no + '/');
}

function prev(){
	if(page_no == 1) return false
	page_no--;
	getData(page_no, page_size);
	$('.curr').text(page_no + '/');
}

