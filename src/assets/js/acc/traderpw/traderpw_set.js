/**
 * 设置交易密码
 */
define(function(require, exports, module) {
    require('common/template');//模板技术
    var ajaxdata = require('data/acc/traderpw/ajax_traderpw_set');
    var curWindow = $('.viewbox');

    /**
     * 初始化方法
     */
    var initMethod = {
        /**
         * 获取手机状态
         */
        GetPhoneStata:function(){
            ajaxdata.OperateRemote.ajaxGetPhoneStata.success = function(data){
                var phone = data.phone;
                var phoneVal = phone.substr(0, 3) + '****' + phone.substr(7);
                var fg = data.stata;
                var html = template("phoneData",{phone:phone,phoneVal:phoneVal,internationalFg:fg});
                $('.acc-traderpw-tell').html(html);
            };
            ajaxdata.OperateRemote.ajaxGetPhoneStata.error = function(result){
                pubPopup.noticeTis(result.errorMsg);
            };
            ajaxdata.OperateRemote.ajaxGetPhoneStata.submit();
        },
        /**
         * 校验手机号码
         */
        getIdentifyCode:function(tellphone){
            var success = function(num,result){
                identifyCode.endTimeCode();
                Popup.noticeTis(result.errorMsg);
            };
            var error = function(result){
                Popup.noticeTis(result.errorMsg);
            };
            operateAjax.sendIdentifyCode(tellphone,success,error);
        },

    };

    /**
     * 验证码
     */
    var identifyCode = {
        endTimeCode:function () {
            var time = 3;
            var obj =  $('[data-action="getIdentifyCodeBtn"]');
            obj.addClass('active');
            $('.acc-traderpw-tell-tips').hide();
            var send_success = setInterval(function(){
                obj.text(time + 's');
                time = time - 1;
                if(time == -1){
                    clearInterval(send_success);
                    $('[data-action="getIdentifyCodeBtn"]').text("获取验证码").removeClass('active');
                    $('.acc-traderpw-tell-tips').show();
                }
            },1000);
        }
    };


    /**
     * 初始化数据
     */
    function initData() {
        /**
         * 获取手机状态
         */
         initMethod.GetPhoneStata();

    }

    /**
     * 初始化事件
     */
    function initEvent() {
        /**
         * 获取验证码
         */
        curWindow.on('click','[data-action="getIdentifyCodeBtn"]',function () {
            if(!$(this).hasClass('active')){
                var tel = $('#telNum').attr('data-tell');
                identifyCode.getIdentifyCode(tel);
            }
        });
    }

    initData();
    initEvent();


});