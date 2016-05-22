var answer = function(){

	//获取答案
	var getAnswer = function(){
		var currentPosition = $(".currentPosition").text();
		$.get(currentPosition.concat(".json"),null,function(result){
			console.log(result);
		},function(){
			alert("获取答案失败！");
		})
	}

	//处理答案
	var handleAnswer = function(json){
		var evalData = eval("(" + json + ")");
		var selectData = eval("(" + evalData.select + ")");
		var ifData = eval("(" + evalData.if + ")");

		var inputArr = $("ol[type='A']>li>input");	
		if(selectData.length == inputArr.length){
			inputArr.each(function(i){
				if(selectData[i]){
					$(this)[0].checked = "checked";
				};
			})
		}

		var tempIfArr = $("ol>li>p");

		var ifArr = new Array();

		$("ol>li>div").each(function(){
			var olNode = $(this).find("ol[type='A']");
			if(!olNode.length){
				ifArr.push($(this));
			}
		})
		if(ifData.length == ifArr.length){
			ifArr.each(function(i,value){
				var index = ifData[value] ? 1 : 0;
				console.log(index);
				$(i).find("input[value='"+index+"']")[0].checked = "checked";					
			})
		}
	}

	return {
		init: function(){
			getAnswer();
		}
	}
}

answer().init();