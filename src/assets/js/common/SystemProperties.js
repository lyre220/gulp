/**
 * Created by lwd on 2017/4/28.
 */
define(function(require, exports, module) {

    var perperties = {};
    /**
     * domian 值
     * @type {string}
     */
    perperties.domain = "127.0.0.1";

    $(function(){
        //初始化获取后台方法全局变量
        var url = apiWebRoot+ "/mini/home/SystemProperties.xhtml";
        var data = {};
        var callback = function(res){
            console.log(res)
            if(res.SUCCESS){
                perperties.domain = res.data.domain;
                perperties.mpPath = res.data.mpPath;
                perperties.idEcr = res.data.idEcr;
                perperties.dy = res.data.dy;
            }else{
                perperties.domain = location.host;
                perperties.mpPath = "";
                perperties.dy = location.host;
            }
        };
        $.post(url,data,callback,'json');
    });
    module.exports = perperties;
})

