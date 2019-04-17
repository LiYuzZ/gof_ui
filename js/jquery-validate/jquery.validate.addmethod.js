$.validator.addMethod('mobile', function( value, element ){
    // /^1\d{10}$/ 来自支付宝的正则
    return this.optional( element ) || /^1\d{10}$/.test( value );
}, '请输入正确的手机号码');


$.validator.addMethod('zcFormart', function( value, element ){
    return this.optional( element ) || /^[0-9a-zA-Z_]{1,}$/.test( value );
}, '由数字、字母、下划线组成');

/**密码格式*/
$.validator.addMethod('passwdFormart', function( value, element ){
    return this.optional( element ) || /^(?![^a-zA-Z]+$)(?!\D+$)(?![^_]+$).{6,15}$/.test( value );
}, '必须包含数字、字母大小写、符号至少三种！');

$.validator.addMethod('zcTextLength4', function( value, element ){
    return this.optional( element ) || value.replace(/[^\x00-\xff]/g,"aa").length <= 8;
}, '不得超过4个字，数字、英文及标点符号算半个字符');

$.validator.addMethod('zcTextLength8', function( value, element ){
    return this.optional( element ) || value.replace(/[^\x00-\xff]/g,"aa").length <= 16;
}, '不得超过8个字，数字、英文及标点符号算半个字符');

$.validator.addMethod('zcTextLength9', function( value, element ){
    return this.optional( element ) || value.replace(/[^\x00-\xff]/g,"aa").length <= 18;
}, '不得超过9个字，数字、英文及标点符号算半个字符');

$.validator.addMethod('zcTextLength18', function( value, element ){
    return this.optional( element ) || value.replace(/[^\x00-\xff]/g,"aa").length <= 36;
}, '不得超过18个字，数字、英文及标点符号算半个字符');

$.validator.addMethod('zcTextLength24', function( value, element ){
    return this.optional( element ) || value.replace(/[^\x00-\xff]/g,"aa").length <= 48;
}, '不得超过24个字，数字、英文及标点符号算半个字符');

$.validator.addMethod('zcTextLength12', function( value, element ){
    return this.optional( element ) || value.replace(/[^\x00-\xff]/g,"aa").length <= 24;
}, '不得超过12个字，数字、英文及标点符号算半个字符');


$.validator.addMethod('zcTextLength10', function( value, element ){
    return this.optional( element ) || value.replace(/[^\x00-\xff]/g,"aa").length <= 20;
}, '不得超过10个字，数字、英文及标点符号算半个字符');

$.validator.addMethod('zcTextLength15', function( value, element ){
    return this.optional( element ) || value.replace(/[^\x00-\xff]/g,"aa").length <= 30;
}, '不得超过15个字，数字、英文及标点符号算半个字符');

$.validator.addMethod('zcTextLength38', function( value, element ){
    return this.optional( element ) || value.replace(/[^\x00-\xff]/g,"aa").length <= 76;
}, '不得超过38个字，数字、英文及标点符号算半个字符');
/**密码格式*/
$.validator.addMethod('passwdFormart', function( value, element ){
    return this.optional( element ) || /^(?![^a-zA-Z]+$)(?!\D+$)(?![^_]+$).{6,15}$/.test( value );
}, '必须包含数字、字母大小写、符号至少三种！');

$.validator.addMethod('positiveInteger', function( value, element ){
    return this.optional( element ) || /^[1-9]\d*$/.test( value );
}, '必须为正整数！');

$.validator.addMethod('positiveInt', function( value, element ){
    return this.optional( element ) || /^[0-9]\d*$/.test( value );
}, '必须为非负整数！');

$.validator.addMethod('carYear', function( value, element ){
	return this.optional( element ) || /^(19\d\d|20\d\d|2100)$/.test( value );
}, '必须为1900-2100之间的年份数！');

$.validator.addMethod('summaryLength', function( value, element ){
	return this.optional( element ) || value.length<=500;
}, '500字以内');

$.validator.addMethod('limitLength', function( value, element ){
	return this.optional( element ) || value.length<=15;
}, '不得超过15个字');

$.validator.addMethod('intOrDouble', function( value, element ){
	return this.optional( element ) || /^[0-9]+([.]{1}[0-9]{1,2})?$/.test( value );
}, '必须为正整数或两位以内小数！');

$.validator.addMethod('number12', function( value, element ){
    return this.optional( element ) || /^([0-9]|(1[0-2]))$/.test( value );
}, '必须为0-12的整数！');

$.validator.addMethod('number', function( value, element ){
    return this.optional( element ) || /^(?:[1-9]\d*|0)|^\s$/.test( value );
}, '必须为非负整数！');

$.validator.addMethod('amount', function( value, element ){
    return this.optional( element ) || /^([-+]?\d{1,9})(\.\d{1})?$/.test( value )||/^([-+]?\d{1,10})$/.test( value );
}, '不可超过10位数,小数点后只可填写一位');

$.validator.addMethod('amountYJ', function( value, element ){
    return this.optional( element ) || /^([-+]?\d{1,5})(\.\d{1})?$/.test( value )|| /^([-+]?\d{1,4})(\.\d{2})?$/.test( value )||/^([-+]?\d{1,6})$/.test( value );
}, '不可超过6位数,小数点后最多填写两位');

$.validator.addMethod('tennum', function( value, element ){
    return this.optional( element ) || /^([-+]?\d{1,10})$/.test( value );
}, '只可输入数字，不可超过10位数');

$.validator.addMethod('tennum10', function( value, element ){
    return this.optional( element ) || /^[1-9]\d{0,9}$/.test( value );
}, '大于0的正整数，不可超过10位数');

$.validator.addMethod('number10W', function( value, element ){
    return this.optional( element ) || /^(0|100000|\s|[1-9]\d{0,4})$/.test( value );
}, '必须为1-100000的非负整数！');

$.validator.addMethod('virtualamount', function( value, element ){
    return this.optional( element ) || /^\d{1,5}(\.\d{1,1})?$/.test( value );
}, '不可超过5位数,小数点后只可填写一位');

$.validator.addMethod('returnFee', function (value, element) {
    return this.optional(element) || /(^(1000)?$)|(^(([0-9]|([1-9]\d{0,2})))(\.\d{1,1})?$)/.test(value);
}, '请输入0-1000的数值含一位小数');

$.validator.addMethod('number24', function (value, element) {
    return this.optional(element) || /^([0-9]|(1[0-9])|(2[0-4]))$/.test(value);
}, '请输入0-24的整数！');

$.validator.addMethod('outArealength', function (value, element) {
    return this.optional(element) || /^[0-9]\d{0,3}?$/.test(value);
}, '请输入最多4位的有效正整数');

$.validator.addMethod('identity', function( value, element ){
    return this.optional( element ) || /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test( value );
}, '驾驶证号不合法');

//日期
jQuery.validator.addMethod("isDate", function (value, element) {
    var ereg = /^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/;
    var r = value.match(ereg);
    if (r == null) {
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[5]);
    var result = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[5]);

    return this.optional(element) || (result);
}, "请输入正确的日期");

jQuery.extend(jQuery.validator.messages, {
    required: "必选字段",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
    minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
    rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
    range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
    max: jQuery.validator.format("请输入一个最大为{0} 的值"),
    min: jQuery.validator.format("请输入一个最小为{0} 的值")
});
