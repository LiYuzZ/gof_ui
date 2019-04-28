$(function () {
    /**回车事件*/
    document.onkeydown = function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            initTable();
            return false;
        }
    }
    var uAgent = navigator.userAgent;
    var isAndroid = uAgent.indexOf("Android") > -1 || uAgent.indexOf("Adr") > -1;
    var isiOS = !!uAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    /**增加兼容*/
    if (isAndroid || isiOS) {
        $(".box-body").css("overflow-x", "auto");
        $(".box-body").css("width", "100%");
    }

});
var ctx = "";
function validateData(from) {
    $.validator.setDefaults({
        submitHandler: function (form) {
            formOnSubmit();
        }
    });
    $(document).ready(function () {
        $("#" + from).validate();
    });
}

function addLogList(type, bussnisId) {

    var dom = $("#addLogList");
    if (dom.length > 0) {

        $(dom).empty();
        $(dom).append(getLogString());
        $("#logType").val(type);
        $("#businessId").val(bussnisId);
        bindTime("logStartTimeDesc", "yyyy-MM-dd HH:mm:ss");
        bindTime("logEndTimeDesc", "yyyy-MM-dd HH:mm:ss");
        initTableLog();
    }
}
function initTableLog() {
    $("#cusTableLog").bootstrapTable('destroy').bootstrapTable({
        //
        method: 'post',
        contentType: "application/x-www-form-urlencoded",
        striped: true,
        cache: false,
        pagination: true,
        sortable: true,
        sortOrder: "asc",
        pageSize: 10,
        pageNumber: 1,
        pageList: [5, 10, 15, 20, 25],
        queryParamsType: "undefined",
        url: ctx + "/commonPage/query",
        queryParams: function (params) {
            var param = {
                page: params.pageNumber,
                rows: params.pageSize,
                startTime: $('#logStartTimeDesc').val(),
                endTime: $('#logEndTimeDesc').val(),
                createUser: $('#logCreateUser').val(),
                content: $('#logContent').val(),
                type: $('#logType').val(),
                businessId: $('#businessId').val(),
                sort: params.sortName,
                order: params.sortOrder
            };
            return param;
        },
        sidePagination: "server",
        strictSearch: true,
        pagination: true,
        idField: "id",
        columns: [
            { field: 'id', title: 'ID', visible: 'False' },
            { field: 'createTime', title: '操作日期', align: 'center' },
            { field: 'createUser', title: '操作人', align: 'center' },
            { field: 'content', title: '操作内容', align: 'center' },
        ]
    });

    $('#cusTableLog').bootstrapTable('hideColumn', 'id');

}
$(function(){  //右上角更多选项
    $('.btn-group-more').on('click',function(){
        var btnLeft = $('.btn-group-more-left').width()-15;
        $('.btn-group-more-left').css('left',-btnLeft);
    })

    $('.btn-group-more').on('click',function(){
        var btnRight = $('.btn-group-more-right').width();
        $('.btn-group-more-right').css('right',btnRight);
    })
})