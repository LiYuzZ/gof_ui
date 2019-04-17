function jumpUrl(url) {
		location.href = url;
		return false;
}



/**
 * 绑定按钮window
 * 
 * @param buttonId
 * @param url
 * @return
 */
function bindJumpEvent(buttonId, url) {
	$("#" + buttonId).click(function() {
		window.location.href =  url;
	});
}



/**
 * 在指定IFrame中跳转到指定页面
 * 
 * @param iframeId:IFrame的id
 * @param url:跳转路径
 */
function jumpOnIFrame(iframeId, url) {
	$(parent.document.getElementById(iframeId)).attr("src", url);
}

/**
 * 是否为空
 * @param str
 * @returns {Boolean}
 */
function isEmpty(obj) {
    if (obj == null){
        return true;
	}
    // 如果不为null，需要处理几种特殊对象类型
    if (typeof(obj) == "undefined"){ 
		return true;
	}
    
    if (typeof(obj) ==  "string") {
    		return  ("null" == obj || "" == obj);
    }
    
    if (typeof(obj) ==  "object") {
        if(obj instanceof Array){
        		return obj.length==0;
        }
    }
    return false;
}


//		是否是数字
function isDigit(str){
	if(/[^0-9]/.exec(str)!=null)
	{
		return true;
	}
	else
	{
		return false;
	}
}


//		字符数字，字母下划线
function isCharcterDigit(str){
	if(/[^A-Za-z0-9_]/.exec(str)!=null)
	{
		return true;
	}
	else
	{
		return false;
	}
}


//   是否是数字
function checkIsDigit(strng)
{
	var illegalChars = /[\D]/;
	if(illegalChars.test(strng))
	{
		return true;
	}
	else
	{
		return false;
	}
}



/**
 * 删除，提示信息
 * 
 * @param buttonId
 * @param formId
 * @param url
 * @param mgs
 * @return
 */
function jumpMsgEvent(formId, url, msg) {
	if(!confirm(msg)){
		return;
	}
	$("#" + formId).attr("action", url).submit();
}


/**
 * 删除，提示信息
 * 
 * @param buttonId
 * @param formId
 * @param url
 * @param mgs
 * @return
 */
function jumpMsgEvent(formId, url) {
	if(!confirm("确定删除吗？")){
		return;
	}
	$("#" + formId).attr("action", url).submit();
}


/**
 * 页面跳转
 * 
 * @param buttonId
 * @param formId
 * @param url
 * @param mgs
 * @return
 */
function jumpUrlEvent(formId, url) {
	$("#" + formId).attr("action", url).submit();
}

/***
 * 树展示
 * @param url
 * @param target
 */
function bindSelectTree(url, target) {
	var setting = {
			callback: {
				onClick: zTreeOnClick
			},
			data : {
				simpleData : {
					enable : true
				}
			}
	};
	$.post(url, function(datas) {
		$.fn.zTree.init($(target), setting, datas);
	});
}


/***
 * 树展示| checkbox
 * @param url
 * @param target
 */ 
function bindCheckSelectTree(url, target) {
	var setting = {
			check : {
				enable : true
			},
			callback: {
				onCheck: zTreeOnClick
			},
			data : {
				simpleData : {
					enable : true
				}
			}
	};
	$.post(url, function(datas) {
		$.fn.zTree.init($(target), setting, datas);
	});
}
/**
 * radio
 * @param url
 * @param target
 */
function bindRadioSelectTree(url, target) {
	var setting = {
			check : {
				enable : true,
				chkStyle : "radio",
				radioType : "all" 
			},
			data : {
				simpleData : {
					enable : true
				}
			}
	};
	$.post(url, function(datas) {
		$.fn.zTree.init($(target), setting, datas);
	});
}

/**
 * 异步提交
 * @param formId
 * @param url|  成功返回返回的url
 * @returns
 */
function submitSummaryFormByPost(formId, url) {
	jQuery('#' + formId).ajaxSubmit({
		url : ("#" + formId).action,
		cache : false,
		type : "POST",
		dataType : "JSON",
		success : function(d) {
			var data = StringToJSON(d);
			if (data.result == "success") {
				layer.open({
					title: '提示信息',
					btnAlign: 'c' ,
					closeBtn: 0,
					type: 1,
					area: ["300px", "150px"],
					shadeClose: false,
					content: '<\div style="text-align:center;padding: 20px 80px;">'+data.msg+'<\/div>',
					btn: ['关闭'],
					yes: function(){
						jumpUrl(url);
			        }
				});
			} else {
				layer.alert("<p style='text-align:center'>"+data.msg+"</p>");
				return false
			}
		}
	});
}

/**
 * 异步删除
 * @param formId
 * @param url
 * @returns
 */
function delSummaryFormByPost(formId, url, msg) {
	var msgVar = "确定删除吗？";
	if(msg) {
		msgVar = msg;
	}
	
	if(!confirm(msgVar)){
		return;
	}
	jQuery('#' + formId).ajaxSubmit({
		url : url,
		cache : false,
		type : "POST",
		dataType : "JSON",
		success : function(d) {
			var data = StringToJSON(d);
			if (data.result == "success") {
				layer.alert("<p style='text-align:center'>操作成功！</p>");
				initTable();
			} else {
				layer.alert("<p style='text-align:center'>操作失败!</p>");
			}
		}
	});
}

/**
 * 拼接节点选择
 * @param treeId
 * @param targetId
 */
function getCheckedNodeIds(treeId, targetId) {
	var targetTree = $.fn.zTree.getZTreeObj(treeId)
	var nodes = targetTree.getCheckedNodes();
	var ids = "";
	for ( var i = 0, l = nodes.length; i < l; i++) {
		if(i==0) {
			ids = nodes[i].id;
		} else {
			ids = ids + "," + nodes[i].id;
		}
		
	}
	$("#" + targetId).val(ids);
}

/**
 * 针对2个参数
 * 
 * @param treeId:tree鐨刬d
 * @param targetId:IDS鐨刬d
 */
function getCheckedNodeIds(treeId, targetId, targetName) {
	var targetTree = $.fn.zTree.getZTreeObj(treeId)
	var nodes = targetTree.getCheckedNodes();
	var ids = "";
	var names = "";
	for ( var i = 0, l = nodes.length; i < l; i++) {
		if(nodes[i].name == '根节点') {
			continue;
		}
		ids = ids + "," + nodes[i].id;
		names = names + "," + nodes[i].name;
	}
	/**去掉第一个；*/
	ids = isEmpty(ids) ? ids : ids.substring(1);
	names = isEmpty(names) ? names : names.substring(1);
	$("#" + targetId).val(ids);
	$("#" + targetName).val(names).change();
}

/**
 * 生成选项并选中指定值
 * 
 * @param datas:选项JSON数据
 * @param selectId:Select标签的id
 * @param selected:选中的值
 */
function generationOptionAndSelected(datas, selectId, selected) {
	var select = document.getElementById(selectId);
	if (!select) {
		return;
	}
	select.options.length = 0;
	select.options.add(new Option("请选择", ""));
	$.each(datas, function(i, data) {
		if (selected != null && selected == data.id) {
			select.options.add(new Option(data.name, data.id, i + 1, true));
		} else {
			select.options.add(new Option(data.name, data.id));
		}
	});
	if (!selected) {
		$(select).find("option:eq(0)").attr("selected", "selected");
	}
	var flag = $("#"+selectId).hasClass("selectpicker");
	if(flag){
		
		$("#"+selectId).selectpicker('refresh');
	}
}

/**
 * 字符转JSON
 * 
 * @param jsonStr:SON格式的字符串
 * @returns JSON对象(JSONObject;JSONArray)
 */
function StringToJSON(jsonStr) {
	json = jsonStr;
	if (typeof jsonStr == 'string') {
		json = eval("(" + jsonStr + ")")
	}
	return json;
}

/**
 * 异步加载下拉选择
 * @param formId
 * @param selectId
 * @param selected
 * url  y由于系统url固定，后期可以增加
 */
function getLookupSelectData(formId, lookupCode, selectId, selected) {
	jQuery('#' + formId).ajaxSubmit({
	url : "/lookupItem/selectData",
	cache : false,
	type : "POST",
	data: {
        'lookupCode': lookupCode,
    },
	dataType : "JSON",
	success : function(d) {
		var data = StringToJSON(d);
		generationOptionAndSelected(data, selectId, selected);
	}
   });
}
/**
 * 查詢下拉選擇
 * @param lookupCode
 * @param selectId
 * @param selected
 */
function getSelectData(lookupCode, selectId, selected) {
	$.post("/common/selectData",{'lookupCode': lookupCode},
		function(data){
			var d = StringToJSON(data);
			generationOptionAndSelected(d, selectId, selected);
		},"json");
}

/**
 * 获取日期格式 xxxx-xx-dd
 * @param value
 * @param row
 * @param index
 * @returns {String}
 */
function gridDate(value,row,index) {
	if(isEmpty(value)) {
		return "";
	}
	return value.substr(0, 10);
}

/**
 * 绑定日期控件样式
 * 
 * @param id
 */
function bindDataClass(id) {
	var dClass = $("#" + id).attr("class");
	dClass = dClass ? (dClass.indexOf("Wdate") == -1 ? dClass + " Wdate"
			: dClass) : "Wdate";
	$("#" + id).attr("class", dClass);
}

/**
 * 绑定起始结束时间
 * 
 * @param beginTimeId:起始时间Id
 * @param endTimeId:结束时间Id
 * @param dateFmt:日期格式
 * @param beginMinDateId:起始时间最小值参照Id
 * @param endMaxDateId:结束时间最大值参照Id
 */
function bindBeginEndTime(beginTimeId, endTimeId, dateFmt, beginMinDateId,
		endMaxDateId) {
	bindDataClass(beginTimeId);
	bindDataClass(endTimeId);
	$("#" + beginTimeId).off("click").on("click", function() {
		var param = new Array();
		param["skin"] = "whyGreen";
		param["maxDate"] = "#F{$dp.$D('" + endTimeId + "')}";
		if (beginMinDateId) {
			param["minDate"] = "#F{$dp.$D('" + beginMinDateId + "')}";
		}
		if (dateFmt) {
			param["dateFmt"] = dateFmt;
		}
		WdatePicker(param);
		this.blur();
	});
	$("#" + endTimeId).off("click").on("click", function() {
		var param = new Array();
		param["skin"] = "whyGreen";
		param["minDate"] = "#F{$dp.$D('" + beginTimeId + "')}";
		if (endMaxDateId) {
			param["maxDate"] = "#F{$dp.$D('" + endMaxDateId + "')}";
		}
		if (dateFmt) {
			param["dateFmt"] = dateFmt;
		}
		WdatePicker(param);
		this.blur();
	});
}

/**
 * 绑定日期控件
 * 
 * @param id:时间控件ID
 * @param dateFmt:日期格式
 */
function bindTime(id, dateFmt) {
	bindDataClass(id);
	$("#" + id).off("click").on("click", function() {
		var param = new Array();
	//	param["skin"] = "whyGreen";
		if (dateFmt) {
			param["dateFmt"] = dateFmt;
		}
		WdatePicker(param);
		this.blur();
	});
}
