var answer = function(){

	var workForm = $("form[name='workForm']");

	//获取答案
	var getAnswer = function(){
		var currentPosition = $(".currentPosition").text();
		console.log("获取答案中...")
		$.getJSON("https://rawgit.com/yumemor/subentry/gh-pages/scude-answer/"+currentPosition+".json",null,function(result){
			console.log("答案获取成功，开始自动填写...")
			handleAnswer(result);
		},function(){
			alert("获取答案失败！");
		})
	}

	//处理答案
	var handleAnswer = function(data){
		var selectData = eval("(" + data.select + ")");
		var ifData = eval("(" + data.if + ")");

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

		alert("试卷已经全部完成！点击确定自动提交试卷...");

		workForm.submit();

	}

	return {
		init: function(){
			getAnswer();
		}
	}
}

answer().init();