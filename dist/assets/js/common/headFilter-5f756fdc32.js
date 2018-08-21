/**
 * @author lwd
 * @date 2017/11/3 16:42
 */
define(function (require, exports, module) {
    var ajaxdata = require('data/common/ajax_systemProperties');
    var curWindow = $('.viewbox');
    var SystemProperties = {}
    var messageCount = undefined;
    // var messageCount = 88;
    /**
     * 初始化方法
     */
    var initMethod = {
        GetMpHeader: function (){
            ajaxdata.OperateRemote.findMpHeader.success = function (data) {
                console.log(data);
                SystemProperties = data;
                if(SystemProperties.messageCount > 99){
                    messageCount = "99+";
                }else{
                    messageCount = SystemProperties.messageCount;
                }
            };
            ajaxdata.OperateRemote.findMpHeader.error = function (result) {
                pubPopup.noticeTis(result.errorMsg);
            };
            ajaxdata.OperateRemote.findMpHeader.submit();
        }
    }

    /**
     * 初始化数据
     */
    function initData() {
        //获取头部导航栏数据
        initMethod.GetMpHeader();
    }

    /**
     * 初始化事件
     */
    function initEvent() {
        console.log('initMethod-head2');
        //菜单按钮
        curWindow.on('click','#moremenu',function (){
            // if(SystemProperties.islogin){
                if(!$('#topmenu').hasClass('active') && !$('#pub-popmaskbg').hasClass('pub-popmaskbg')){
                    setTimeout(() => {
                        $('#topmenu').addClass('active');
                        $('#pub-popmaskbg').addClass('pub-popmaskbg');//开启遮罩层
                        $('.j-message .pub-buttle').text(messageCount);
                        localize('.header');//配置语言包替换点
                    }, 50);    
                }else{
                    $('#topmenu').removeClass('active')
                    $('#pub-popmaskbg').removeClass('pub-popmaskbg')//关闭遮罩层
                }
                
            // }else{
            //     pubPopup.noticeTis('您还未登陆，请先登录！', 'common.systemError');
            // } 
        })
        //返回
        curWindow.on('click','#head-back',function () {
            history.back();
        });
        //退出
        curWindow.on('click','#head-exit', function () {
            window.location.href = apiWebRoot + SystemProperties.logOutUrl;
        });
        //消息
        curWindow.on('click','#head-msg',()=>{
            console.log('messageclick');
            window.location.href = apiWebRoot + SystemProperties.messageUrl;
        })

        //我的名片
        curWindow.on('click','#head-myCard',function () {
            window.location.href = apiWebRoot + SystemProperties.homeUrl;
        });
        //管理中心
        curWindow.on('click','#head-soqi',function () {
            window.location.href = apiWebRoot + SystemProperties.managementUrl;
        });
        //关闭遮罩层
        curWindow.on(end,'#pub-popmaskbg',function () {
            // if($('#topmenu').hasClass('active') && $('#pop-areaboxMask').hasClass('pub-popmaskbg')){
                $('#topmenu').removeClass('active')
                $('#pub-popmaskbg').removeClass('pub-popmaskbg')//关闭遮罩层
                return false;  
            // }else{
            //     alert('233331')
            // }
        });
    }
    initData();
    initEvent();
    // exports = $.extend(exports, perperties);
});