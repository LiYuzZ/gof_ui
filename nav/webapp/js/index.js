/*低版本手机延迟*/
$(function() {
    FastClick.attach(document.body);
    
    jQuery.validator.addMethod("isPassword", function(value, element) {
        var password = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&amp;*])[\da-zA-Z~!@#$%^&amp;*]{8,}$/);
        return this.optional(element) || password.test(value);
    }, "密码格式不正确,必须包含数字、英文字母、特殊符号且大于等于8位");
    jQuery.validator.addMethod("confirmPassword", function(value, element) {
        var newPwd = $("#newPwd").val();
        return this.optional(element) || value == newPwd;
    }, "两次密码输入不一致");
    
    getSystemMsgCount();
    setInterval(getSystemMsgCount, 300000);
    
});
$(function() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button"; //again because google chrome don't insert first hash into history
    window.location.hash = "Again-No-back-button";
    window.onhashchange = function() {
        window.location.hash = "no-back-button";
    }
    window.setTimeout(function() {
        window.location.hash = "Again-No-back-button";
    }, 1000);
    var innerH = document.body.clientHeight;
    // 设置本页iframe的高度为可是区域剩余高度
    var uAgent = navigator.userAgent;
    var isAndroid = uAgent.indexOf("Android") > -1 || uAgent.indexOf("Adr") > -1;
    var isiOS = !!uAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    if(isAndroid || isiOS) {
        document.querySelector(".td-hidden").style.display = "none";
        document.querySelector(".showbtn").style.display = "none";
        document.querySelector("#menu-model").style.display = "none";
        document.querySelector(".index_skin").style.display = "none";
        setTimeout(function() {
            document.getElementById("left").contentWindow.document.getElementById("tree").style.width = "200px";
        }, 300);

        //隐藏换肤
        $(".home-header-usr").addClass("setting_index_hide");
        //默认显示修改密码，退出
        $(".setting_index").on("click", function() {
            $("#home-header-usr-ul").show();
            $(".home-logo").toggle();
        });
        $(".left_model").contents().find("#tree").removeClass("new_customized"); //console.log("hide");
        $(".home-logo a").html("<img alt=\"\" src=\"/images/logo-crm2.png\">")
    } else {
        $("#menu-btn").hide();
    }
    // $.ajax({
    //     url: '/queryAdminUser',
    //     type: 'post',
    //     success: function(data) {
    //         $("#topLoginName").html(data.name);
    //         $("#userName").val(data.name);
    //         $("#loginName").val(data.loginName);
    //         $("#userSim").val(data.sim);
    //         $("#userTypeDesc").val(data.userTypeDesc);
    //         $("#userType").val(data.userType);
    //         $("#cityName").val(data.cityName);
    //         $("#roleName").val(data.roleName);
    //         $("#userEmail").val(data.email);
    //         if (data.headImg != "") {
    //         	$("#index_headImg").prop("src",data.headImg);
    //         	$("#imagesUrl").prop("src",data.headImg);
    //         }
    //     }
    // });
    
    getNewVersion();
    
});

//获取最大版本号
function getNewVersion(){
	// $.ajax({
    //     url: '/osVersion/getMaxPublicOsVersion?kind=1',
    //     type: 'post',
    //     success: function(data) {
    //         $(".sys_version").attr('title',data.newVersion);
    //     }
    // });
}

//自有  不需要显示外包商
window.onload=function(){
    if ($("#userType").val() == 1) {
		$("#outsourcerName").parent().hide();
	} 
}

document.querySelector("#menu-btn").onclick = function() {
    var dis = window.getComputedStyle(document.querySelector("#menu-model"))["display"];
    if(!dis || dis == "none") {
        document.querySelector("#menu-model").style.display = "block";
        $(".left_model").contents().find(".close_model_left").show();
    } else {
        document.querySelector("#menu-model").style.display = "none";
    }
}
// document.querySelector("#menu-model").onclick = function(e) {
//     if(e.target.getAttribute("id") == "menu-model") {
//         this.style.display = "none";
//     }
// }

// if(parent.location.href == location.href) {
//     var url = sessionStorage.url;
//     if(url != undefined || url != "") {
//         $("#right").prop("src", url);
//     }
// }

window.onhashchange = function() {}

function saveCallRecordTag() {
    if(confirm("确定保存吗?")) {
        jQuery('#callRecordTagForm').ajaxSubmit({
            url: "/phone/updateCallRecordForTag",
            type: "POST",
            dataType: "JSON",
            success: function(data) {
                if(data.code == 200) {
                    alert("保存成功!");
                    $("#phoneTag").hide();
                } else {
                    alert(data.modelData.msg);
                }
            },
            error: function(data) {
                alert('网络连接异常，请检查后重试！');
            }
        });
    }
}

/*字数限制*/
$("#callRecordTagText").on("input propertychange", function() {
    var $this = $(this),
        _val = $this.val(),
        count = "";
    if(_val.length > 300) {
        $this.val(_val.substring(0, 300));
    }
    count = 300 - $this.val().length;
    $("#text-count").text(count);
});


function cancel() {
	$("#modifyPwd").hide();
}
function cancelUser(){
	$("#modifyUserInfo").hide();
}
function cancelSuggest(){
	$("#modifySuggestInfo").hide();
}
//查询反馈历史
function getSuggestList(){
	cancelSuggest();
    var url = "/toSuggestView";
    layer.open({
        type: 2,
        area: ['800px', '460px'],
        fixed: false, // 不固定
        maxmin: false,
        scrollbar: false,
        scrollbar: true,
        title: "建议反馈历史",
        content: [url]
    });
}

function modifyPwd() {
    if(!validateModifyPassword()) return false;
    $("#modifyPwdForm").ajaxSubmit({
        url: "/updatePWD",
        data: $("#modifyPwdForm").serialize(),
        dataType: "json",
        error: function(data) {
            layer.alert(data);
        },
        success: function(data) {
            if(200 == data.code) {
                layer.alert("修改成功");
                $("#modifyPwd").hide();
            } else {
                layer.alert(data.desc);
            }
        }
    });
}

function validateModifyPassword() {
    var oldPwd = $("#oldPwd").val();
    var newPwd = $("#newPwd").val();
    var confirmPwd = $("#newPasswordConfirm").val();
    if(null == oldPwd || "" == oldPwd) {
        layer.alert("请输入原密码！");
        return false;
    }
    if(null == newPwd || "" == newPwd) {
        layer.alert("请输入新密码！");
        return false;
    }
    var reg = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&amp;*])[\da-zA-Z~!@#$%^&amp;*]{8,}$/);
    if(!reg.test(newPwd)) {
        layer.alert("密码格式不正确,必须包含数字、英文字母、特殊符号且大于等于8位");
        return false;
    }
    if(null == confirmPwd || "" == confirmPwd) {
        layer.alert("请确认新密码！");
        return false;
    }
    if(confirmPwd != newPwd) {
        layer.alert("两次输入密码不一致！");
        return false;
    }
    return true;
}

function showUpdatePwd() {
    $("#modifyPwd").show();
    $("#modifyUserInfo").hide();
    $("#modifySuggestInfo").hide();
}

// 个人信息
// function showUserInfo() {
// 	$.ajax({
//         url: '/queryAdminUser',
//         type: 'post',
//         success: function(data) {
//             $("#userName").val(data.name);
//             $("#loginName").val(data.loginName);
//             $("#userSim").val(data.sim);
//             $("#userTypeDesc").val(data.userTypeDesc);
//             $("#cityName").val(data.cityName);
//             $("#roleName").val(data.roleName);
//             $("#userEmail").val(data.email);
//             $("#outsourcerName").val(data.outsourcerName);
//             $("#index_headImg").prop("src",data.headImg);
//         }
//     });
// 	$("#modifyUserInfo").show();
// 	$("#modifySuggestInfo").hide();
// 	$("#modifyPwd").hide();
// }

// 建议反馈
function showSuggest() {
	$("#modifySuggestInfo").show();
	$("#modifyPwd").hide();
	$("#modifyUserInfo").hide();
}

// 保存建议信息
function saveSuggestInfo(){
	var content = $("#content").text();
	var title = $("#title").val();
	if (content== ""||title=="") {
		layer.open({
            title: '提示信息',
            btnAlign: 'c',
            closeBtn: 0,
            type: 0,
            area: ["300px", "150px"],
            shadeClose: false,
            content: '<\div style="text-align:center;">' + '反馈标题或内容均不能为空' + '<\/div>',
            btn: ['关闭'],
            yes: function () {
                layer.closeAll();
            }
        });
		return false;
	}
	$.ajax({
		type:"POST",
		url:"/saveSuggest",
		data: {
			"title":$("#title").val(),
			"content":$("#content").text()
		},
		success: function (data) {
			if(data.code == 200) {
                alert("保存成功!");
                $("#modifySuggestInfo").hide();
                $("#title").val("");
                $("#content").text("");
            } else {
                alert("保存失败");
            }
		},
		error: function(data) {
            alert('网络连接异常，请检查后重试！');
        }
	});
}

// 选择图片
var loadImg = function(obj){
  $(obj).parent().find(".upload_input").click();
}
// upload
function preview(file) {
	// 校验图片格式
    var path = $("#index_fileInput").val();
    if (path.length == 0) {
        // alert("请上传图片!");
        return false;
    } else {
        var extStart = path.lastIndexOf('.'),
            ext = path.substring(extStart, path.length).toUpperCase();
        if (ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG' && ext !== '.GIF') {
            alert("图片格式错误!");
            return false;
        }
    }
    //校验图片大小
    var size = file.files[0].size / 1024;
    console.log(size);
    if(size > 1024){
        alert('图片大小不能超过1M');
        return false;
    }
	  
	var formData = new FormData(); 
	formData.append('urlFile', file.files[0]);  //添加图片信息的参数
	$.ajax({
		type:"POST",
		url:"/uploadStaticFile",
		cache: false, //上传文件不需要缓存
		data:formData,
		processData: false, // 告诉jQuery不要去处理发送的数据
	    contentType: false, // 告诉jQuery不要去设置Content-Type请求头
		success:function(data){
			if(data.code == 200){
				
				
				$.ajax({
					type:"POST",
					url:"/modifyUser",
					data: {
						"headImg":data.desc
					},
					success: function (data1) {
						if(data.code == 200) {
							$("#index_headImg").prop("src",data.desc);
							//$("#headImages").val(data.desc);
							$("#imagesUrl").prop("src",data.desc);
			            } else {
			                alert(data.modelData.msg);
			            }
					},
					error: function(data) {
			            alert('网络连接异常，请检查后重试！');
			        }
				});
			}
		}
	});
}

function logout() {
    top.window.location.href = "/userLogout";
}

// //存储导航和背景设置 -
// var storage = window.localStorage;
// $(window).load(function() {
//     if(storage.showbtn == "show") { //横向
//         $(".td-hidden").addClass("nav_pos_iframe");
//         $(".showbtn").addClass("showbtn_top showbtn_i");
//         $(".left_web").contents().find("#tree").removeClass("nav_customized").addClass("nav_cus_tree"); // console.log("show");
//         //导航居左居右 显示隐藏
//         var bwith = $(".left_web").contents().find(".left_body").width(); //导航区域显示宽度
//         var navwidth = $(".left_web").contents().find(".tree-box").width(); //导航条实际宽度
//         if(navwidth > bwith) {
//             $(".left_web_nav_l").show();
//             // $(".left_web").contents().find(".nav_pos_left").show();
//             $(".left_web").contents().find(".tree-box").removeClass("tree_box_right");
//         } else {
//             $(".left_web_nav_l,.left_web_nav_r"),hide();
//             // $(".left_web").contents().find(".nav_pos_left,.nav_pos_right").hide();
//         }
//     } else {  //纵向

//         $(".td-hidden").removeClass("nav_pos_iframe");
//         $(".showbtn").removeClass("showbtn_top showbtn_i");
//         $(".left_web").contents().find("#tree").addClass("nav_customized").removeClass("nav_cus_tree"); //console.log("hide");
//     }

//     //导航左右点击
//     var nav_box = $(".left_web").contents().find(".nav_cus_tree .tree-box");
//     $(".left_web_nav_r").on("click",function() { //居右
//         $(".left_web").contents().find(".nav_cus_tree .tree-box").addClass("tree_box_left");
//         $(".left_web").contents().find(".nav_cus_tree .tree-box").removeClass("tree_box_right");
//         $(".left_web").contents().find(".left_web_nav_r").removeClass("left_web_nav_r");
//         $(".left_web_nav_l").show();
//         $(".left_web_nav_r").hide();
//     })

//     $(".left_web_nav_l").on("click",function() {  //居左
//         $(".left_web").contents().find(".nav_cus_tree .tree-box").removeClass("tree_box_left");
//         $(".left_web").contents().find(".nav_cus_tree .tree-box").addClass("tree_box_right");
//         $(".left_web_nav_r").show();
//         $(".left_web_nav_l").hide();
//     })

//     //存储的背景图
//     if(storage.skin_bg == "bg.jpg") {

//     } else {
//         if(storage.skin_bg == undefined){  //默认加载
//             $(".old_sty").removeClass("bg_default").attr("background", "./images/bg.jpg");
//         }else {		//储存的背景
//             $(".old_sty").removeClass("bg_default").attr("background", "./images/" + storage.skin_bg + "");
//         }
//     }

//     if( storage.skin_bg == "bg_old"){	//旧主题
//         $(".old_sty").removeClass("old_style");
//         $(".home-header").addClass("home-header_old");
//         $(".showbtn").addClass("showbtn_old");
//         $(".left_web").load(function() {
//             $(".left_web").contents().find("#tree").removeClass("nav_customized"); //console.log("hide");
//         });
//     }
// });

// /*切换上部导航*/
// $(".showbtn").click(function() {
//     //切换到横导航
//     $(".td-hidden").toggleClass("nav_pos_iframe");
//     $(".showbtn em").toggleClass("to-right");
//     $(".showbtn").toggleClass("showbtn_top showbtn_i");
//     //$(".td-hidden .left_web").toggleClass("nav_pos_iframe");
//     //$("#iframe的ID").contents().find("#iframe中的控件ID").click();
//     $(".left_web").contents().find("#tree").toggleClass("nav_cus_tree nav_customized");
//     $(".nav_pos_iframe").removeClass("nav_pos_iframe_height"); //删除高度

//     if($(".nav_cus_top ").hasClass("nav_customized")) {
//         //$(".home-header-usr").removeClass("setting_index_hide");
//     } else {
//         //$(".home-header-usr").addClass("setting_index_hide");
//         $(".td-hidden").removeClass("nav_pos_iframe_pad");
//     }

//     //loca本地存储切换状态
//     if($(".showbtn").hasClass("showbtn_top")) {
//         storage.setItem("showbtn", "show");
//     } else {
//         storage.setItem("showbtn", "hide");
//     }

//     //导航居左居右 显示隐藏
//     var bwith = $(".left_web").contents().find(".left_body").width(); //导航区域显示宽度
//     var navwidth = $(".left_web").contents().find(".tree-box").width(); //导航条实际宽度
//     if(navwidth > bwith && storage.showbtn == "show") {
//         $(".left_web_nav_l").show();
//         $(".left_web").contents().find(".tree-box").removeClass("tree_box_right");
//     } else {
//         $(".left_web_nav_l,.left_web_nav_r").hide();
//     }

//     //切换旧主题删除 样式
//     if($(".showbtn").hasClass("showbtn_old")) {
//         $(".left_web").contents().find("#tree").removeClass("nav_customized");
//         if(navwidth > bwith) {  //判断显示隐藏左点击
//             $(".left_web_nav_l").show();
//             $(".left_web").contents().find(".tree-box").removeClass("tree_box_right");
//         } else {
//             $(".left_web_nav_l,.left_web_nav_r").hide();
//         }
//     }

// });

// /*更改背景*/
// $(".skin_bg .skin_img").on("click", function() {

//     $("body").addClass("old_style bg_default");
//     $(".home-header").removeClass("home-header_old");
//     $(".showbtn").removeClass("showbtn_old");
//     if(!$(".left_web").contents().find(".nav_cus_tree ")) {
//         $(".left_web").contents().find("#tree").addClass("nav_customized");
//     }
//     var isc = $(this).attr("src");
//     var iss = isc.slice(15);
//     //记录背景图
//     storage.setItem("skin_bg", "bg");
//     storage.skin_bg = iss;

//     $(".old_sty").removeClass("bg_default");
//     $(".old_sty").attr("background", "./images/" + iss + "");
//     $(".old_sty").css("background-size", "100%");

//     //切换新主题 添加透明样式
//     if(!$(".showbtn").hasClass("showbtn_old")) {
//         $(".left_web").contents().find("#tree").addClass("nav_customized");
//     }

//     //横版去除nav_customized
//     if($(".showbtn").hasClass("showbtn_top")) {
//         $(".left_web").contents().find("#tree").removeClass("nav_customized");
//     } else {
//         $(".left_web").contents().find(".nav_pos_left").hide();
//         $(".left_web").contents().find(".nav_pos_right").hide();
//     }
// });

// /*更改旧主题*/
// $(".old_style_img").on("click", function() {
//     $("body").removeClass("old_style bg_default");
//     $(".home-header").addClass("home-header_old");
//     $(".left_web").contents().find("#tree").removeClass("nav_customized");
//     $(".showbtn").toggleClass("showbtn_old");
//     //记录背景图
//     storage.setItem("skin_bg", "bg_old");
// });

// //导航隐藏横向滚动条
// $(function(){
//     if(document.compatMode == "BackCompat") {   //浏览器嗅探，混杂模式
//         var widthback = document.body.clientHeight;
//             $(".left_web").height(widthback+20);
//             $("#right").height(widthback-59);
//     } else {
//         var widthcss = document.documentElement.clientHeight;
//             $(".left_web").height(widthcss+20);
//             $("#right").height(widthcss-59);
//     }
// });

// //删除导航透明层
// $("#menu-btn").on("click", function() {
//     $(".left_model").contents().find("#tree").removeClass("nav_customized");
// });

// //删除导航透明层
// $(".tree-item-h3").on("click", function() {
//     $("#right").contents().find("#page").addClass("nav_customized");
// });

function toHomePage() {
    $("#right").attr("src", "./index.html ");
    return false;
}

/******************站内信***********************/

//登录用户未读信息条数
function getSystemMsgCount() {
    // $.ajax({
    //     url:"/systemMsg/getSystemMsgCount",
    //     type:"post",
    //     dataType : "json",
    //     success: function(data){
    //         if (data != null && data.modelData != null) {
    //             var msgNum = data.modelData.msgNum;
    //             if(msgNum==0){
    //                 $("#msgSpan").hide();
    //                 $("#msgSpan1").hide();
    //             }else{
    //                 $("#msgSpan").show();
    //                 $("#msgSpan1").show();
    //                 $("#msgSpan").html(msgNum);
    //                 $("#msgSpan1").html(msgNum);
    //             }
    //         }else{
    //             $("#msgSpan").hide();
    //             $("#msgSpan1").hide();
    //         }
    //     }
    // });
}

//跳转到站内信列表页面
function showSystemMsg() {
    var url = "/systemMsg/getList";
    $("#msgSpan").hide();
    $("#msgSpan1").hide();
    layer.open({
        type: 2,
        area: ['800px', '460px'],
        fixed: false, // 不固定
        maxmin: false,
        scrollbar: false,
        scrollbar: true,
        title: "系统消息",
        content: [url]
    });
}

//  UI_Revision

$(function(){
    //左侧导航隐藏显示
    if(sessionStorage.showbtn == 'hide'){
        $('.td-left,#right,.home_show,.home-header,.showbtn,.home-logo').css('transition','0s');
        $(".showbtn").trigger("click",showbtnClick());
    }
    function showbtnClick(){
        $('.showbtn').toggleClass('toggle_show');
        $('.td-left').toggleClass('left_show');
        $('#right').toggleClass('right_show');
        $('.home-header').toggleClass('home_show');
        if($('.home-header').hasClass('home_show')){
            sessionStorage.showbtn = 'hide';
        }else{
            sessionStorage.showbtn = 'show';
        }
    }
    $('.showbtn').on('click',function(){
        showbtnClick();
    })
})


