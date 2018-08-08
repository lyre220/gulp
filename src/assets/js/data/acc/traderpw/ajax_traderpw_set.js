/**
 * 设置我的交易密码
 */
define(function(require, exports, module) {
    var OperateRemote ={};
    require('data/common/operate');
    /**
     * 校验是否是国际号码
     */
    OperateRemote.ajaxGetPhoneStata = new pubOperate();
    OperateRemote.ajaxGetPhoneStata.submit = function(foldId,stata){
        console.log("校验是否是国际号码");
        var data = Mock.mock({
            'phone|1': /^1[0-9]{10}$/,
            'stata|1':true
        });
        this.success(data);
    };






    module.exports.OperateRemote = OperateRemote;
});