/**
 * Created by zqy on 2018/8/16.
 */
// define(function(require, exports, module) {

//     var perperties = {};
//     /**
//      * domian 值
//      * @type {string}
//      */
//     perperties.domain = "127.0.0.1";

//     $(function(){
//         //初始化获取后台方法全局变量
//         var url = apiWebRoot+ "/mini/home/SystemProperties.xhtml";
//         var data = {};
//         var callback = function(res){
//             console.log(res)
//             if(res.SUCCESS){
//                 perperties.domain = res.data.domain;
//                 perperties.mpPath = res.data.mpPath;
//                 perperties.idEcr = res.data.idEcr;
//                 perperties.dy = res.data.dy;
//             }else{
//                 perperties.domain = location.host;
//                 perperties.mpPath = "";
//                 perperties.dy = location.host;
//             }
//         };
//         $.post(url,data,callback,'json');
//     });
//     module.exports = perperties;
// })

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
        console.log("获取mp头部导航");
        var _this = this;
        var url = apiWebRoot + "/msg/findMpHeader.xhtml";//请求地址
        var data = {} //请求参数
        var callback = function (res) { //请求回调
            console.log(res.resultSets);
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