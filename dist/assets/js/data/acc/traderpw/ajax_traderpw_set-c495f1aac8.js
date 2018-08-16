/**
 * 设置我的交易密码
 */
define(function(require, exports, module) {
    var OperateRemote ={};
    require('data/common/operate');
    /**
     * 校验是否是国际号码
     */
    // OperateRemote.ajaxGetPhoneStata = new pubOperate();
    // OperateRemote.ajaxGetPhoneStata.submit = function(foldId,stata){
    //     console.log("校验是否是国际号码");
    //     var data = Mock.mock({
    //         'phone|1': /^1[0-9]{10}$/,
    //         'stata|1':true
    //     });
    //     this.success(data);
    // };

    /**
     * 获取交易密码信息，校验是否是国际号码
     */
    OperateRemote.findTransactionPwdInfo = new pubOperate();
    OperateRemote.findTransactionPwdInfo.submit = function(){
        console.log("获取交易密码信息:");
        var _this = this;
        var url = apiWebRoot + "/acc/findTransactionPwdInfo.xhtml";
        var callback = function (res) {
            // console.log('res');
            // console.log(res);
            if (res.success) {
                _this.success(res);
            } else {
                console.log('error233');
                _this.error({'errorCode': -1, 'errorMsg': res.errorMsg});
            }
        };
        $.post(url,callback, 'json');
    };
    /**
     * 地区选择列表
     */
    OperateRemote.getRegionsList = new pubOperate();
    OperateRemote.getRegionsList.submit = function(){
        console.log("地区选择列表:");
        var _this = this;
        var url = apiWebRoot + "/acc/getCardRules.xhtml";
        var callback = function (res) {
            console.log('res');
            console.log(res);
            if (res.success) {
                var datas = res;
                console.log('datasssssssss');
                console.log(datas);
                _this.success(datas);
            } else {
                console.log('error233');
                _this.error({'errorCode': -1, 'errorMsg': res.errorMsg});
            }
        };
        $.post(url,callback, 'json');
    };
    /**
     * 获取验证码
     */
    OperateRemote.getCheckCode = new pubOperate();
    OperateRemote.getCheckCode.submit = function(type){
        console.log("获取校验码");
        var data = {}
        data.type = type
        var _this = this;
        var url = apiWebRoot + "/acc/getCheckCode.xhtml";
        var callback = function (res) {
            console.log('res');
            console.log(res);
            if (res.success) {
                var datas = res;
                // console.log('datas');
                // console.log(datas);
                _this.success(datas);
            } else {
                console.log('error233');
                _this.error({'errorCode': -1, 'errorMsg': res.errorMsg});
            }
        };
        $.post(url, data, callback, 'json');
    };
    /**
     * 设置交易密码
     */
    OperateRemote.setTransactionPwd = new pubOperate();
    OperateRemote.setTransactionPwd.submit = function(param){
        console.log("设置交易密码");
        var _this = this;
        var url = apiWebRoot + "/acc/setTransactionPwd.xhtml";
        var data = param;
        var callback = function (res) {
            console.log('res');
            console.log(res);
            if (res.success) {
                var datas = res;
                console.log('datas');
                console.log(datas);
                _this.success(datas);
            } else {
                console.log('error233');
                _this.error({'errorCode': -1, 'errorMsg': res.errorMsg});
            }
        };
        $.post(url,data,callback,'json');
    };
    /**
     * 找回交易密码
     */
    OperateRemote.backTransactionPwd = new pubOperate();
    OperateRemote.backTransactionPwd.submit = function(param){
        console.log("找回交易密码");
        var _this = this;
        var url = apiWebRoot + "/acc/backTransactionPwd.xhtml";
        var data = param;
        var callback = function (res) {
            console.log('res');
            console.log(res);
            if (res.success) {
                var datas = res;
                console.log('datas');
                console.log(datas);
                _this.success(datas);
            } else {
                console.log('error233');
                _this.error({'errorCode': -1, 'errorMsg': res.errorMsg});
            }
        };
        $.post(url,data,callback,'json');
    };
    /**
     * 修改交易密码
     */
    OperateRemote.transactionPwdModify = new pubOperate();
    OperateRemote.transactionPwdModify.submit = function(param){
        console.log("修改交易密码");
        var _this = this;
        var url = apiWebRoot + "/acc/transactionPwdModify.xhtml";
        var data = param;
        var callback = function (res) {
            console.log('res');
            console.log(res);
            if (res.success) {
                var datas = res;
                console.log('datas');
                console.log(datas);
                _this.success(datas);
            } else {
                console.log('error233');
                _this.error({'errorCode': -1, 'errorMsg': res.errorMsg});
            }
        };
        $.post(url,data, callback, 'json');
    };
    module.exports.OperateRemote = OperateRemote;
});