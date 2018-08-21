/**
 * Created by zqy on 2018/8/16.
 */
/**
 * 设置我的交易密码
 */
define(function(require, exports, module) {
    var OperateRemote ={};
    require('data/common/operate');
    /**
     * 获取mp头部导航
     */
    OperateRemote.findMpHeader = new pubOperate();
    OperateRemote.findMpHeader.submit = function(param){
        var _this = this;
        var url = apiWebRoot + "/msg/findMpHeader.xhtml";
        var data = {} 
        var callback = function (res) { 
            if (res.success) {
                _this.success(res.resultSets);
            } else {
                _this.error({'errorCode': -1, 'errorMsg': res.errorMsg});
            }
        };
        $.post(url,data,callback, 'json');
    };


    module.exports.OperateRemote = OperateRemote;
});