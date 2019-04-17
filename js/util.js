function _select(target){
	var newOption=function(value,text,isSelect){
		return '<option'+(isSelect?' selected="selected"':'')+' value="'+value+'">'+text+'</option>';
	};
	var defaultOption=newOption('','请选择',true);
	var init=function(data,valueFlag,textFlag){
		var htmlStr=[defaultOption];
		if($.isArray(data)&&data.length>0)
			for(var index in data)
				htmlStr.push(newOption(data[index][valueFlag],data[index][textFlag]));
		target.html(htmlStr);
		return this;
	};
	var clear=function(){
		target.find('option').remove();
		target.html(defaultOption);
		return this;
	};
	var val=function(value){
		if(!value){
			return target.find('option:selected').val();
		}else{
			target.val(value);
			return this;
		}
	};
	var text=function(){
		return target.find('option:selected').text();
	};
	var selectpicker=function(){
		target.selectpicker('refresh');
		return this;
	};
	return{
		init:init,
		clear:clear,
		val:val,
		text:text,
		selectpicker:selectpicker
	}
}
function _form(target){
	var elements={};
	var forElement=function(callback){
		var input=$(target.find('[name]'));
		for(var index = 0; index < input.length; index++){
			var domObj=$($(input[index])[0]);
			callback(domObj);
		}
		return this;
	};
	var forInput=function(callback){
		var input=$(target.find('input[name],select[name]'));
		for(var index = 0; index < input.length; index++){
			var domObj=$($(input[index])[0]);
			callback(domObj);
		}
		return this;
	};
	var getElements=function(){
		forElement(function(domObj){
			elements[domObj.attr("name")]=domObj;
		});
		return this;
	};
	getElements();
	var isInnerHTML=function(target){
		var result=false;
		var tagName=target[0].tagName;
		switch (tagName) {
		case 'texterea':
			result = true;
			break;
		default:
		}
		return result;
	};
	var clear=function(){
		forInput(function(domObj){
			if(isInnerHTML(domObj))
				domObj.html("");
			else
				domObj.val("");
		});
		return this;
	};
	var getValue=function(){
		var map={};
		forInput(function(domObj){
			var name=domObj.attr("name");
			var value;
			if(isInnerHTML(domObj))
				value=domObj.html();
			else
				value=domObj.val();
			if(value!=undefined&&value!=null&&value!='')
				map[name]=value;
		});
		return map;
	};
	var setValue=function(map){
		forInput(function(domObj){
			var name=domObj.attr("name");
			var value=map[name];
			if(value!=undefined&&value!=null&&value!=''){
				if(isInnerHTML(domObj))
					domObj.html(value);
				else
					domObj.val(value);
			}
		});
		return this;
	}
	var validate=function(){
		return target.validate().form();
	}
	elements.clear=clear;
	elements.getValue=getValue;
	elements.setValue=setValue;
	elements.validate=validate;
	return elements;
}








function getButtonStr(hrefStr,name){
	return '<a class="btn btn-xs btn-primary" href="javascript:'+hrefStr+';">'+name+'</a>';
}
function total_post(url,params,callback){
	jQuery.post(url,params,function(data) {
		if (data.result == "success") {
			callback(data);
		} else {
			layer.alert("<p style='text-align:center'>"+data.msg+"</p>");
		}
	});
}

function total_post_noCheck(url,params,callback){
	jQuery.post(url,params,function(data) {
		callback(data);
	});
}

function total_post_listData(url,params,callback){
	jQuery.post(url,params,function(data) {
		if ($.isArray(data)) {
			var length=data.length;
			$(data).each(function(index){
				callback($(this),index,length);
			});
		}else {
			layer.alert("<p style='text-align:center'>系统异常</p>");
		}
	});
}

function total_initTable(tableId,map) {
	if(map.columns!=null){
		map.columns.forEach(function(item){
			if(item.align==null)
				item.align='center';
			if(item.valign==null)
				item.valign='middle';
			if(item.field!=null&&item.title==null)
				item.title=item.field;
		});
	}
	var initMap={
		method : 'post',
		contentType : "application/x-www-form-urlencoded",
		striped : true,
		cache : false,
		pagination : true,
		sortable : false,
		sortOrder : "asc",
		pageSize : 10, // 每页显示的记录数
		pageNumber : 1, // 当前第几页
		pageList : [ 5, 10, 15, 20, 25 ], // 记录数可选列表
		queryParamsType : "undefined",
		// 这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据
		queryParams : function(params) {
			var param = {
				page : params.pageNumber,
				rows : params.pageSize
			};
			return param;
		},
		sidePagination : "server",
		strictSearch : true,
		pagination : true
	};
	for(var key in map){
		initMap[key]=map[key];
	}
	$('#' + tableId).bootstrapTable('destroy').bootstrapTable(initMap);
	if (map.hideColumns!=null&&$.isArray(map.hideColumns)) {
		var length=map.hideColumns.length;
		$(map.hideColumns).each(function(index,value){
			$('#' + tableId).bootstrapTable('hideColumn',value);
		});
	}else if (map.hideColumn != null) {
		$('#' + tableId).bootstrapTable('hideColumn',map.hideColumn);
	}
}

function _treeTable(target){
	var initMap_treeTable={};
	var getWidthStr=function(width){
		if(width)
			return ' style="width: '+width+'px;"';
		return '';
	}
	function _sortTree(rows){
		var idName=initMap_treeTable.id;
		var parentIdName=initMap_treeTable.parentId;
		var rootParentId=initMap_treeTable.rootParentId;
		var treeMap={};
		if (rows!=null&&$.isArray(rows)) {
			$(rows).each(function(){
				var row=$(this)[0];
				row.parentIds=[];
				treeMap[row[idName]]=row;
			});
		}
		var result=[];
		var sort=function(parentId){
			if (rows!=null&&$.isArray(rows)) {
				$(rows).each(function(){
					var row=$(this)[0];
					if (parentId==row[parentIdName]) {
						if(parentId!=rootParentId){
							var parentIds_parent=treeMap[parentId].parentIds;
							if(parentIds_parent!=null&&$.isArray(parentIds_parent)){
								$(parentIds_parent).each(function(index){
									row.parentIds.push(parentIds_parent[index]);
								});
							}
						}
						row.parentIds.push(parentId)
						result.push(row);
						sort(row[idName]);
					}
				});
			}
			return result;
		}
		return {
			sort:sort
		};
	}
	var bindCheckbox=function(){
		target.find('input.checkbox_treeTable').click(function(){
			var value=$(this).val();
			if(value && value.indexOf(",") == -1){
				
				if(this.checked){
					target.find('input.checkbox_treeTable.'+value).each(function(){
						this.checked=true;
					});
					if(initMap_treeTable.onCheck){
						initMap_treeTable.onCheck();
					}
					/*var clazz=$(this).prop('class');
					for(var i=1;i<clazz.length;i++){
						
						$(this).parents('input.checkbox_treeTable.'+clazz[i]).eq(0).prop("checked",true);
					}*/
				}else{
					target.find('input.checkbox_treeTable.'+value).removeAttr("checked");
					if(value!=initMap_treeTable.rootParentId)
						target.find('#checkAll').removeAttr("checked");
					if(initMap_treeTable.onUncheck)
						initMap_treeTable.onUncheck();
				}
			}
		});
	}
	var initTable=function(initMap){
		initMap_treeTable=initMap;
		var htmlStr_table=[];
		htmlStr_table.push('<thead><tr>');
		initMap.columns.forEach(function(item,index,length){
			if(item.checkbox)
				htmlStr_table.push('<th style="width: 40px;"><input type="checkbox" id="checkAll" value="'+initMap.rootParentId+'" class="checkbox_treeTable"/></th>');
			else
				htmlStr_table.push('<th'+getWidthStr(item.width)+'>'+item.title+'</th>');
		});
		htmlStr_table.push('</tr></thead><tbody></tbody>');
		target.html(htmlStr_table.join(''));
		$.post(
			initMap.url,
			initMap.queryParams,
		function(data){
			if (data!=null&&$.isArray(data)) {
				var sortTree=new _sortTree(data);
				var rows=sortTree.sort(initMap.rootParentId);
				$(rows).each(function(){
					var row=$(this)[0];
					var htmlStr=[];
					htmlStr.push('<tr>');
					initMap.columns.forEach(function(item,index){
						if(item.checkbox){
							htmlStr.push('<td><input type="checkbox" name="'+item.name+'" value="'+row[item.field]+'"');
							if(item.checked&&item.checked(row))
								htmlStr.push(' checked');
							htmlStr.push(' class="checkbox_treeTable ');
							if(row.parentIds)
								htmlStr.push(row.parentIds.join(' '));
							htmlStr.push('"');
							htmlStr.push('/></td>');
						}else{
							htmlStr.push('<td>');
							if(item.formatter)
								htmlStr.push(item.formatter(row));
							else
								htmlStr.push(data[item.field]);
							htmlStr.push('</td>');
						}
					});
					htmlStr.push('</tr>');
					target.find('tbody').append(htmlStr.join(''));
				});
				target.find('input.checkbox_treeTable').click(function(){
					var value=$(this).val();
					//alert(value);
					if(value && value.indexOf(",") == -1){
						
						if(this.checked){
							target.find('input.checkbox_treeTable.'+value).each(function(){
								this.checked=true;
							});
							if(initMap.onCheck)
								initMap.onCheck();
							
							var classString = $(this).prop("class");
							var classArray = classString.split(" ");
							var temp = "";
							for(var i=1;i<classArray.length-1;i++){
								
								temp += "."+classArray[i];
								var checked = classArray[i+1];
								//alert(temp);
								target.find('input.checkbox_treeTable'+temp).each(function(){
									var val = $(this).val();
									if(val == checked){
										this.checked=true;
									}
								});
							}
						}else{
							target.find('input.checkbox_treeTable.'+value).removeAttr("checked");
							if(value!=initMap.rootParentId)
								target.find('#checkAll').removeAttr("checked");
							if(initMap.onUncheck)
								initMap.onUncheck();
						}
					}else{
						
						var classString = $(this).prop("class");
						var classArray = classString.split(" ");
						var temp = "";
						for(var i=1;i<classArray.length-1;i++){
							
							temp += "."+classArray[i];
							var checked = classArray[i+1];
							//alert(temp);
							target.find('input.checkbox_treeTable'+temp).each(function(){
								var val = $(this).val();
								if(val == checked){
									this.checked=true;
								}
							});
						}
					}
				});
			}
		});
	}
	return {
		initTable:initTable,
		bindCheckbox:bindCheckbox
	};
}

function regCheck(value,regKey){
	var checkMap={
		'number':/^[0-9]+.?[0-9]*$/,
		'email':/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
		'yyyy-MM-dd':/^\d{4}-(?:(?:0[13-9]|1[12])-(?:0[1-9]|[12]\d|30)|(?:0[13578]|1[02])-31|02-(?:0[1-9]|1\d|2[0-8]))|(?:(?:\d{2}(?:[13579][26]|[2468][048])|(?:[13579][26]|[2468][048])00)-02-29)$/,
		'chinese':/^.*[\u4e00-\u9fa5].*$/
	}
	if(value==null||regKey==null||regKey==''||checkMap[regKey]==null)
		return false;
	var reg = new RegExp(checkMap[regKey]);
	return reg.test(value);
}