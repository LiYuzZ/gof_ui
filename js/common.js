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
    $("#" + buttonId).click(function () {
        window.location.href = url;
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
    if (obj == null) {
        return true;
    }
    // 如果不为null，需要处理几种特殊对象类型
    if (typeof(obj) == "undefined") {
        return true;
    }

    if (typeof(obj) == "string") {
        return ("null" == obj || "" == obj);
    }

    if (typeof(obj) == "object") {
        if (obj instanceof Array) {
            return obj.length == 0;
        }
    }
    return false;
}


//		是否是数字
function isDigit(str) {
    if (/[^0-9]/.exec(str) != null) {
        return true;
    }
    else {
        return false;
    }
}


//		字符数字，字母下划线
function isCharcterDigit(str) {
    if (/[^A-Za-z0-9_]/.exec(str) != null) {
        return true;
    }
    else {
        return false;
    }
}


//   是否是数字
function checkIsDigit(strng) {
    var illegalChars = /[\D]/;
    if (illegalChars.test(strng)) {
        return true;
    }
    else {
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
    layer.confirm(msg,function(){
    	
    	$("#" + formId).attr("action", url).submit();
    },function(){
    	
    });
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
	layer.confirm("确定删除吗？",function(){
		
		$("#" + formId).attr("action", url).submit();
	},function(){
		
	})
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
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    $.post(url, function (datas) {
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
        check: {
            enable: true
        },
        callback: {
            onCheck: zTreeOnClick
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    $.post(url, function (datas) {
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
        check: {
            enable: true,
            chkStyle: "radio",
            radioType: "all"
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    $.post(url, function (datas) {
        $.fn.zTree.init($(target), setting, datas);
    });
}

/***
 * 树展示
 * @param url
 * @param target
 */
function bindAsyncSelectTree(target, url, subUrl) {
    var setting = {
		async:{
            enable:true,//是否为异步加载
            autoParam:["id"],//异步加载 自动提交
            url: subUrl
        },
        callback: {
            onClick: zTreeOnClick
        },
        data: {
            simpleData: {
                enable : true,//是否之用简单数据
            }
        }
    };
    $.post(url, function (datas) {
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
	showMaskLayer();
    jQuery('#' + formId).ajaxSubmit({
        url: ("#" + formId).action,
        cache: false,
        type: "POST",
        dataType: "JSON",
        success: function (d) {
        	closeMaskLayer();
            var data = StringToJSON(d);
            if (data.result == "success") {
                layer.open({
                    title: '提示信息',
                    btnAlign: 'c',
                    closeBtn: 0,
                    type: 1,
                    area: ["300px", "150px"],
                    shadeClose: false,
                    content: '<\div style="text-align:center;padding: 20px 80px;">' + data.msg + '<\/div>',
                    btn: ['关闭'],
                    yes: function () {
                        jumpUrl(url);
                    }
                });
            } else if (data.code == 200) {
                layer.open({
                    title: '提示信息',
                    btnAlign: 'c',
                    closeBtn: 0,
                    type: 1,
                    area: ["300px", "150px"],
                    shadeClose: false,
                    content: '<\div style="text-align:center;padding: 20px 80px;">' + data.desc + '<\/div>',
                    btn: ['关闭'],
                    yes: function () {
                        jumpUrl(url);
                    }
                });
            } else {
                layer.alert("<p style='text-align:center'>" + data.msg + "</p>");
                return false
            }
        }
    });
}


/**
 * 异步删除
 *
 * @param formId
 * @param url
 * @returns
 */
function delSummaryFormByPost(formId, url, msg) {
    var msgVar = "确定删除吗？";
    if (msg) {
        msgVar = msg;
    }

   layer.confirm(msgVar,function(){
	   
	   jQuery('#' + formId).ajaxSubmit({
	        url: url,
	        cache: false,
	        type: "POST",
	        dataType: "JSON",
	        success: function (d) {
	            var data = StringToJSON(d);
	            if (data.result == "success") {
	            	var msg = data.msg || "操作成功！";
	                layer.alert("<p style='text-align:center'>"+msg+"</p>");
	                initTable();
	            } else {
	            	var msg = data.msg || "操作失败！";
	                layer.alert("<p style='text-align:center'>"+msg+"</p>");
	            }
	        }
	    });
   },function(){
	  
   })
    
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
    for (var i = 0, l = nodes.length; i < l; i++) {
        if (i == 0) {
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
    for (var i = 0, l = nodes.length; i < l; i++) {
        if (nodes[i].name == '根节点') {
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
    $.each(datas, function (i, data) {
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
 * 生成选项并选中指定值(没有请选择选项)
 *
 * @param datas:选项JSON数据
 * @param selectId:Select标签的id
 * @param selected:选中的值
 */
function generationOptionAndSelectedNotNull(datas, selectId, selected) {
    var select = document.getElementById(selectId);
    if (!select) {
        return;
    }
    select.options.length = 0;
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
        url: "/lookupItem/selectData",
        cache: false,
        type: "POST",
        data: {
            'lookupCode': lookupCode,
        },
        dataType: "JSON",
        success: function (d) {
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
    $.post("/lookupItem/selectData", {'lookupCode': lookupCode},
        function (data) {
            var d = StringToJSON(data);
            generationOptionAndSelected(d, selectId, selected);
        }, "json");
}

/**
 * 获取日期格式 xxxx-xx-dd
 * @param value
 * @param row
 * @param index
 * @returns {String}
 */
function gridDate(value, row, index) {
    if (isEmpty(value)) {
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
 * 跳转到列表页面
 * @param url
 */
function toListPage(url) {

    window.location.href = ctx + url;
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
    $("#" + beginTimeId).off("click").on("click", function () {
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
    $("#" + endTimeId).off("click").on("click", function () {
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
    $("#" + id).off("click").on("click", function () {
        var param = new Array();
        //	param["skin"] = "whyGreen";
        if (dateFmt) {
            param["dateFmt"] = dateFmt;
        }
        WdatePicker(param);
        this.blur();
    });
}

/*
 * 初始化编辑器
 * *
 */
function initEditor(inputIds, items) {
    items = items || ['fontname', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
            'removeformat', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
            'image', 'insertunorderedlist', '|', 'emoticons', 'link'];
    var editor1 = KindEditor.create(inputIds, {
        cssPath: ctx + '/js/newEditor/plugins/code/prettify.css',
        uploadJson: ctx + '/notice/uploadImg',
        fileManagerJson: ctx + '/js/newEditor/jsp/file_manager_json.jsp',
        allowFileManager: true,
        newlineTag: 'br',
        items: items,
        afterCreate: function () {
            this.sync();
        },
        afterBlur: function () {
            this.sync();
        }
    });
    return editor1;
}

//统一普通提示框
function alertMsg(msg){
    layer.alert("<p style='text-align:center'>"+msg+"</p>");
}

//统一提示弹出框带跳转
function alertMsgJump(msg,url){
    layer.open({
        title: '提示信息',
        btnAlign: 'c' ,
        closeBtn: 0,
        type: 1,
        area: ["380px", "150px"],
        shadeClose: false,
        content: '<div style="text-align:center;padding: 20px 80px;">'+msg+'<\/div>',
        btn: ['关闭'],
        yes: function(){
            jumpUrl(url);
        }
    });

}

function getSelectCity(inputId) {
    var a1 = [110000, 120000, 310000, 500000, 440000];
    var a2 = [130100, 130200, 130300, 130400, 130500, 130600, 130700, 130800, 130900, 131000, 131100];
    var a3 = [140100, 140200, 140300, 140400, 140500, 140600, 140700, 140800, 140900, 141000, 141100];
    var a4 = [150100, 150200, 150300, 150400, 150500, 150600, 150700, 150800, 150900, 152200, 152500, 152900];
    var a5 = [210100, 210200, 210300, 210400, 210500, 210600, 210700, 210800, 210900, 211000, 211100, 211200, 211300, 211400, 211500];
    var a6 = [220100, 220200, 220300, 220400, 220500, 220600, 220700, 220800, 222400];
    var a7 = [230100, 230200, 230300, 230400, 230500, 230600, 230700, 230800, 230900, 231000, 231100, 231200, 232700];
    var a8 = [320100, 320200, 320300, 320400, 320500, 320600, 320700, 320800, 320900, 321000, 321100, 321200, 321300];
    var a9 = [320100, 320200, 320300, 320400, 320500, 320600, 320700, 320800, 320900, 321000, 321100, 321200, 321300];
    var a10 = [330100, 330200, 330300, 330400, 330500, 330600, 330700, 330800, 330900, 331000, 331100, 331200];
    var a11 = [340100, 340200, 340300, 340400, 340500, 340600, 340700, 340800, 341000, 341100, 341200, 341300, 341500, 341600, 341700, 341800];
    var a12 = [350100, 350200, 350300, 350400, 350500, 350600, 350700, 350800, 350900];
    var a13 = [360100, 360200, 360300, 360400, 360500, 360600, 360700, 360800, 360900, 361000, 361100];
    var a14 = [370100, 370200, 370300, 370400, 370500, 370600, 370700, 370800, 370900, 371000, 371100, 371200, 371300, 371400, 371500, 371600, 371700];
    var a15 = [410100, 410200, 410300, 410400, 410500, 410600, 410700, 410800, 410900, 411000, 411100, 411200, 411300, 411400, 411500, 411600, 411700, 419000];
    var a16 = [420100, 420200, 420300, 420500, 420600, 420700, 420800, 420900, 421000, 421100, 421200, 421300, 422800, 429000];
    var a17 = [430100, 430200, 430300, 430400, 430500, 430600, 430700, 430800, 430900, 431000, 431100, 431200, 431300, 433100];
    var a18 = [440100, 440200, 440300, 440400, 440500, 440600, 440700, 440800, 440900, 441200, 441300, 441400, 441500, 441600, 441700, 441800, 441900, 442000, 445100, 445200, 445300];
    var a19 = [450100, 450200, 450300, 450400, 450500, 450600, 450700, 450800, 450900, 451000, 451100, 451200, 451300, 451400];
    var a20 = [460100, 460200, 460300];
    var a21 = [510100, 510300, 510400, 510500, 510600, 510700, 510800, 510900, 511000, 511100, 511300, 511400, 511500, 511600, 511700, 511800, 511900, 512000, 513200, 513300, 513400];
    var a22 = [520100, 520200, 520300, 520400, 520500, 520600, 522300, 522600, 522700];
    var a23 = [530100, 530300, 530400, 530500, 530600, 530700, 530800, 530900, 532300, 532500, 532600, 532800, 532900, 533100, 533300, 533400];
    var a24 = [540100, 540200, 540300, 542200, 542400, 542500, 542600];
    var a25 = [610100, 610200, 610300, 610400, 610500, 610600, 610700, 610800, 610900, 611000, 611100];
    var a26 = [620100, 620200, 620300, 620400, 620500, 620600, 620700, 620800, 620900, 621000, 621100, 621200, 622900, 623000];
    var a27 = [630100, 630200, 632200, 632300, 632500, 632600, 632700, 632800];
    var a28 = [640100, 640200, 640300, 640400, 640500];
    var a29 = [650100, 650200, 652100, 652200, 652300, 652700, 652800, 652900, 653000, 653100, 653200, 654000, 654200, 654300, 659000];
    var all = a1.concat(a2).concat(a3).concat(a4).concat(a5).concat(a6).concat(a7).concat(a8).concat(a9).concat(a10).concat(a11);
    all = all.concat(a12).concat(a13).concat(a14).concat(a15).concat(a16).concat(a17).concat(a18).concat(a19).concat(a20).concat(a21);
    all = all.concat(a22).concat(a23).concat(a24).concat(a25).concat(a26).concat(a27).concat(a28).concat(a29);
    var showArr = [];
    var varcode = $("#" + inputId).val();
    for (var i = 0; i < all.length; i++) {
        if (varcode.indexOf(all[i]) >= 0) {
            showArr = showArr.concat(all[i]);
        }
    }
    return showArr;
}

function getLogString(){

	var content = '';

	content += '<input type="hidden" id="logType" name="logType" value="" />';
	content += '<input type="hidden" id="businessId" name="businessId" value="" />';
	content += '<div class="row">';
	content += '<div class="col-md-12">';
	content += '	<!-- BOX -->';
	content += '		<div class="box border green">';
	content += '			<div class="" style="background: #fff;border-bottom: 1px solid #9db36a;padding-top:8px;">';
	content += '				<h4 style="padding-left:12px;">';
	content += '					<i class="fa"></i>操作记录';
	content += '				</h4>';
	content += '				<div class="tools">';
	content += '			</div>';
	content += '		</div>';
	content += '		<div class="box-body">';
	content += '			<div role="grid" class="form-horizontal">';
	content += '				<div class="row">';
	content += '					<div class="col-md-12">';
	content += '						<form id="pageListForm" action="/activity/getActivityList"';
	content += '							method="post" class="form-horizontal" role="search">';
	content += '							<input type="hidden" name="pageNum" id="pageNum"';
	content += '								value="" />';
	content += '							<div class="form-group">';
	content += '								<label class="col-md-1 control-label">操作日期：</label>';
	content += '								<div class="col-md-2">';
	content += '									<input type="text" id="logStartTimeDesc" name="logStartTimeDesc"';
	content += '										value="" class="form-control"';
	content += '										placeholder="" readonly="readonly"/>';
	content += '								</div>';
	content += '								<div class="col-md-2">';
	content += '									<input type="text" id="logEndTimeDesc" name="logEndTimeDesc"';
	content += '										value="" class="form-control"';
	content += '										placeholder="" readonly="readonly"/>';
	content += '								</div>';
	content += '								<label class="col-md-1 control-label">操作人</label>';
	content += '								<div class="col-md-2">';
	content += '									<input type="text" id="logCreateUser" name="logCreateUser"';
	content += '										value="" class="form-control"';
	content += '									placeholder=""/>';
	content += '								</div>';
/*	content += '							</div>';
	content += '							<div class="form-group">';*/
	content += '								<label class="col-md-1 control-label">操作内容</label>';
	content += '								<div class="col-md-2">';
	content += '									<input type="text" id="logContent" name="logContent"';
	content += '										value="" class="form-control"';
	content += '									placeholder=""/>';
	content += '									</select>';
	content += '								</div>';
	content += '								<div class="col-md-1">';
	content += '									<button type="button" onclick="initTableLog();" class="btn btn-primary">';
	content += '										<i class="fa fa-search"></i>查询';
	content += '									</button>';
	content += '								</div>';
	content += '							</div>';
	content += '						</form>';
	content += '					</div>';
	content += '					<div class="clearfix"></div>';
	content += '				</div>';
	content += '				<table id="cusTableLog" cellspacing="0" cellpadding="0" border="0" class="datatable table table-striped table-bordered table-hover dataTable" >';
	content += '				</table>';
	content += '			</div>';
	content += '		</div>';
	content += '		<!-- /BOX -->';
	content += '	</div>';
	content += '</div>';
	content += '</div>';

	return content;
}

/** 显示遮罩层 */
function showMaskLayer() {
	$("body:eq(0)").append('<div class="MaskLayer"></div>');
	$("body:eq(0)").append('<div class="loadImg"></div>');
	resetLoadImage();
}
/** 移除遮罩层 */
function closeMaskLayer() {
	$(".MaskLayer").remove();
	$(".loadImg").remove();
}
/** 刷新图片的位置 */
function resetLoadImage() {
	var HALF_BODY_WIDTH = document.body.offsetWidth / 2;
	var HALF_BODY_HEIGHT = document.body.offsetHeight / 2;
	$(".loadImg").css("left", (HALF_BODY_WIDTH - 110) + "px");
	$(".loadImg").css("top", (HALF_BODY_HEIGHT - 9.5) + "px");
}


function gofunConfirm(msg, btn1, btn2, yes, cancel){
    if (null == btn1 || '' == btn1){
        btn1 = "确定";
    }
    if (null == btn2 || '' == btn2){
        btn2 = "取消";
    }
    layer.confirm(msg, {
        btn: [btn1, btn2],	// 按钮
        shade: [0.5, '#000', true]	// 遮罩
    }, yes, cancel);
}

function selfAlert(desc){
	layer.open({
		title: '提示信息',
		btnAlign: 'c' ,
		closeBtn: 0,
		type: 1,
		area: ["300px", "150px"],
		shadeClose: false,
		content: '<\div style="text-align:center;padding: 20px 80px;">'+desc+'<\/div>',
		btn: ['关闭'],
		yes: function(index){
			layer.close(index);
		}
	});
}


	




