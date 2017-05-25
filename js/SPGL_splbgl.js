function getCookie(name){
	var arr,reg = new RegExp("(^|)" +name+"=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	}
}


$(document).ready(function(){
	var txt = "";//表格中的内容
	var txt1 = [];//查看内容
	var txt2 = []; //修改内容
	var tbody = document.getElementById("tbody");
	var checkContent = document.getElementById("check_content");
	var changeContent = document.getElementById("change_content");
	
	var checks = document.getElementsByClassName("check");
	var changes = document.getElementsByClassName("change");
	var dels = document.getElementsByClassName("del");
	
	var check = document.getElementById("check");
	var change = document.getElementById("change");
	var bgbox = document.getElementById("bgbox");
	
	var checksure = document.getElementById("checksure");
	var changesure = document.getElementById("changesure");
			
	$.ajax({
		url:"../data/news.json",
		dataType:"json",
		type:"get",
		success:function(data){
			
			for(let da in data){
				txt = txt+
					"<tr>"+
						"<td>"+data[da].title+ "</td>"+
						"<td>"+data[da].content+ "</td>"+
						"<td>"+"<button class='check'>查看</button><button class='change'>修改</button><button class='del'>删除</button>"+"</td>"
					"</tr>"
				txt1[da] =  
					"<p>id:</p>"+"<p style='margin-left:50px'>"+data[da].id+"</p>"+
					"<p>title:</p>"+"<p style='margin-left:50px'>"+data[da].title+"</p>"+
					"<p>content:</p>"+"<p style='margin-left:50px'>"+data[da].content+"</p>"					
				txt2[da] = 
					"<label>id:</label><br>"+"<input value="+data[da].id+" style='margin-left:50px;width:250px' type='text' id='id"+da+"'/><br>"+
					"<label>title:</label><br>"+"<input value="+data[da].title+" style='margin-left:50px;width:250px' type='text' id='title"+da+"'/><br>"+
					"<label>content:</label><br>"+"<textarea cols='38' rows='6' style='margin-left:50px' type='text' id='content"+da+"'/>"+data[da].content+"</textarea>"
					
			}
			
			tbody.innerHTML = txt;
			/*点击查看按钮*/
			for(let i = 0;i<checks.length;i++){
				checks[i].onclick = function(){
					checkContent.innerHTML = txt1[i];
					check.style.display = "block";
					bgbox.style.display = "block";
					
				}
				checksure.onclick = function(){
					check.style.display = "none";
					bgbox.style.display = "none";
				}
			}
			/*点击修改按钮*/
			
			for(let i = 0;i<changes.length;i++){
				changes[i].onclick = function(){
					changeContent.innerHTML = txt2[i];
					change.style.display = "block";	
					bgbox.style.display = "block";
					
					
				}
				
				changesure.onclick = function(){
					change.style.display = "none";
					bgbox.style.display = "none";
					var token = getCookie('XSRF-TOKEN');
					$.ajax({
						url:""+"i",
						datatype:"json",
						type:"put",
						data:{title:$("title"+"i").val(),tcontent:$("content"+"i").val()},
						headers:{
							'X-XSRF-TOKEN':token
						},
						success:function(){
							window.location.reload(); 
						},
						error:function(){
							alert("错误");
						}
						
					});
				}
			}
			/*点及删除按钮*/
			for(let i = 0;i<dels.length;i++){
				dels[i].onclick = function(){
					/*$(this).parent().parent().remove();		*/
					$.ajax({
						url:""+"i",
						datatype:"json",
						type:"delete",
						success:function(){
							window.location.reload(); 
						},
						error:function(){
							alert("错误");
						}
						
					});
				};
			}
			/*点击添加按钮*/
			$("#addBtn").click(function(){
				$("#addLB,#bgbox").css({display:"block"});
				$("#addsure").click(function(){
					$("#addLB,#bgbox").css({display:"none"});
					$.ajax({
						url:"",
						datatype:"json",
						type:"post",
						data:{name:$("#addLbName").val(),description:$("#addLbTxt").val()},
						success:function(){
							window.location.reload(); 
						},
						error:function(){
							alert("错误");
						}
					});
				})
				
				
				
			})
			
		},
		error:function(e){
			alert(0);
		}
	})
	
})
	
	
	
	
	

