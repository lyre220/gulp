/**
 * @author lwd
 * @date 2017/11/3 16:42
 */
define(function (require, exports, module) {
    var SystemProperties = require('common/SystemProperties');
    var curWindow = $('.viewbox');
    /**
     * 初始化数据
     */
    var initData = function () {

    }
    /**
     * 初始化方法
     */
    var initMethod = function () {
        console.log('initMethod-head2');
        //菜单按钮
        curWindow.on('click','#moremenu',function (){
            if(!$('#topmenu').hasClass('active')){
                $('#topmenu').addClass('active')
            }else{
                $('#topmenu').removeClass('active')
            }  
        })
        //返回
        curWindow.on('click','#head-back',function () {
            history.back();
        });
        //退出
        curWindow.on('click','#head-exit', function () {
            location.href = SystemProperties.mpPath + "/login/loginOut.xhtml";
        });
        //消息
        curWindow.on('click','#head-msg',()=>{
            console.log('messageclick');
            location.href = SystemProperties.mpPath + "/msg/forwardMessageCore.xhtml";
        })

        //我的名片
        curWindow.on('click','#head-myCard',function () {
            location.href = SystemProperties.mpPath + "/" + SystemProperties.idEcr + "/szone";
        });
        //管理中心
        curWindow.on('click','#head-soqi',function () {
            location.href = SystemProperties.mpPath;
        });
    }
        initData();
        initMethod();
    exports = $.extend(exports, perperties);
});