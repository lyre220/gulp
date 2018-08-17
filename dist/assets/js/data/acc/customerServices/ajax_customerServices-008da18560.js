/**@created by zqy on 2018/8/16 */
/**
 * 设置我的交易密码
 */
define(function(require, exports, module) {
    var OperateRemote ={};
    require('data/common/operate');
    /**
     * 获取名片客服
     */
    OperateRemote.findMpCustomerServices = new pubOperate();
    OperateRemote.findMpCustomerServices.submit = function(){
        console.log("获取名片客服");
        var _this = this;
        var url = apiWebRoot + "/acc/findMpCustomerServices.xhtml";
        var callback = function (res) {
            console.log('CustomerServices-res');
            console.log(res);
            if (res.success) {
                _this.success(res);
            } else {
                _this.error({'errorCode': -1, 'errorMsg': res.errorMsg});
            }
        };
        $.post(url,callback, 'json');
    };
    /**
     * 获取用户微信二维码
     */
    OperateRemote.findWeiXinQRCode = new pubOperate();
    OperateRemote.findWeiXinQRCode.submit = function(param){
        console.log("获取用户微信二维码");
        var _this = this;
        var url = apiWebRoot + "/acc/findWeiXinQRCode.xhtml";
        var data = {phoneIdEcr:param}
        var callback = function (res) {
            console.log('WeiXinQRCode-res');
            console.log(res);
            if (res.success) {
                _this.success(res);
            } else {
                _this.error({'errorCode': -1, 'errorMsg': res.errorMsg});
            }
        };
        $.post(url,data,callback, 'json');
    };


    module.exports.OperateRemote = OperateRemote;
});