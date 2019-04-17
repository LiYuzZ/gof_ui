$(function() {
    initTable();
    $("#addresseeName").blur(function(){
        if(!$("#addresseeName").val()){
            $("#addressee").val("");
        }
        $("#addresseeSelected").hide();
    });
});

//列表
function initTable() {
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#cusTable',
            url: '/systemMsg/query', //数据接口
            method:"post",
            page: true, //开启分页
            limit:5,
            limits:[5,10,20,50],
            toolbar:'#barDemo',
            cols: [[ //表头
                { field: 'state',         title: '状态',  width: '82', sort: true,    align: 'center' ,templet:funState},
                { field: 'createTime', 		title: '时间', width: '167', sort: true,     align: 'center'},
                { field: 'addresser', 	title: '发件人', width: '138',      align: 'center'},
                { field: 'content', 	title: '内容',    width: '400'}
            ]]
        });

        //监听行双击事件
        table.on('row(msgFilter)', function(obj){
            var state = obj.data.state;
            if(state==0){
                var id = obj.data.id;
                getMsgAndUpdate(id);
                //修改值
                obj.tr.find("img").attr("src","/images/yidu.png");
            }
        });
    });
}

//状态格式化
function funState(row) {
    if(row.state==0){
        return "<img src='/images/weidu.png'/>";
    }else{
        return "<img src='/images/yidu.png' />";
    }
}

//查看消息
function getMsgAndUpdate(id) {
    $.ajax({
        url: "/systemMsg/getMsgAndUpdate",
        type: "post",
        dataType: "json",
        data: {
            "id": id
        },
        success: function (data) {
            var code = data.code;
            if (code == "200") {
                //不做刷新操作
            }
        }
    });
}

//弹出发送消息框
function showSendMsgDiv() {
    $("#sendMsgDiv").show();
    $("#msgListDiv").hide();
}

//查询用户
function getAdminUserByName(){
    var addresseeName = $("#addresseeName").val();
    $.ajax({
        url:"/systemMsg/getAdminUserByName",
        type:"post",
        dataType : "json",
        data:{"name": addresseeName},
        success: function(data){
            var adminUserList = data.modelData.adminUserList;
            if(null != adminUserList){
                var str = '';
                $("#addresseeSelected").css("display", "block");
                $.each(adminUserList,function (index,item) {
                    str += '<span data-id="' + item.loginName + '">' + item.name +"("+ item.loginName +")"+ '</span>';
                });
                $("#addresseeSelected").html(str);
                addClickToSelected();
            }
        }
    });
}
function addClickToSelected(){//选中span中的一条内容
    $("#addresseeSelected").find("span").each(function(){
        $(this).on("mousedown",function(){
            $("#addressee").val($(this).attr("data-id") );
            $("#addresseeName").val($(this).html() );
            $("#addresseeSelected").css("display","none");
        });
    });
}

//发送消息
function sendMsg() {
    var addressee = $("#addressee").val();
    var content = $("#content").val();
    if(addressee==null || addressee=='' || addressee=='undefined'){
        layer.alert("请输入发件人！");
        return false;
    }
    if(content==null || content=='' || content=='undefined'){
        layer.alert("请输入内容！");
        return false;
    }
    layer.confirm("确定发送信息吗?",function () {
        $.ajax({
            url: "/systemMsg/save",
            type: "post",
            dataType: "json",
            data: {
                "addressee": addressee,
                "content": content
            },
            success: function (data) {
                var code = data.result;
                if (code == "success") {
                    layer.alert("发送消息成功！",function () {
                        location.reload(true);
                        $("#sendMsgDiv").hide();
                        $("#msgListDiv").show();
                    });
                } else {
                    layer.alert(data.msg);
                }
            }
        });
    });
}

function goMsgListDiv() {
    $("#sendMsgDiv").hide();
    $("#msgListDiv").show();
}