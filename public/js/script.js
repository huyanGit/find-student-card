var url = 'http://localhost:3000/';
var max_no;
$(function(){
	getMaxNo();
	var page_no = parseInt(getQueryString("page_no"), 10) || 1;
	$('.curr').text(page_no + '/');
	$('.next').click(next);	
	$('.prev').click(prev);
});

function getMaxNo(){
	$.ajax({
		url: url + 'lostedcard/count',
		type: 'GET',
		success: function(count){
			max_no = Math.ceil(count/10);
			$('.max_no').text(max_no);
		},
		error: function(err){
			console.log(err);
		}
	});
}

function next(){
	var page_size = parseInt(getQueryString("page_size"), 10) || 8;
	var page_no = parseInt(getQueryString("page_no"), 10) || 1;
	page_no++;
	if(page_no <= max_no){
		window.location.href = url + 'lostedcard?page_size=' + page_size + '&page_no=' + page_no;
	}else{
		return false;
	}
}

function prev(){
	var page_size = parseInt(getQueryString("page_size"), 10) || 8;
	var page_no = parseInt(getQueryString("page_no"), 10) || 1;
	page_no--;
	if(page_no){
		window.location.href = url + 'lostedcard?page_size=' + page_size + '&page_no=' + page_no;
	}else{
		return false;
	}
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 
