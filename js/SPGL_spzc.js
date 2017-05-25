$(document).ready(function(){
	
	$.ajax({
		url:"data/goods.json",
		dataType:"json",
		type:"get",
		success:function(data){
			var g1= document.getElementById("goodsNum");
			var optionTxt = "";
			for(var da in data){
				 optionTxt = optionTxt + "<option value='"+data[da].id+"'>"+data[da].id+"</option>"
			}
 			g1.innerHTML = optionTxt;
 		},
		error:function(e){
			alert("404s");
		}
	})
 })
