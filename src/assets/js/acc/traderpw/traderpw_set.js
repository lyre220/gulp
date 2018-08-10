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
            console.log('GetPhoneStata');
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
         * 获取验证码
         */
        getIdentifyCode:function(tellphone){

            // console.log('getIdentifyCode');
            // var success = function(num,result){
            //     identifyCode.endTimeCode();
            //     Popup.noticeTis(result.errorMsg);
            // };
            // var error = function(result){
            //     Popup.noticeTis(result.errorMsg);
            // };
            // operateAjax.sendIdentifyCode(tellphone,success,error);
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
        console.log('initData');
         initMethod.GetPhoneStata();
         /**
          * 展开选择地区弹出框
          */
         $('[data-action="shopPopArea"]').on('click',PopArea.showPopArea);

        /**
         *  关闭选择地区弹出框
         */
        $('.viewbox').on(end,'#pop-areaboxMask',PopArea.hidePopArea);

    }


        //交易密码找回--地区选择
        var PopArea ={

            showPopArea:function(){
                //获取证件
                console.log('showPopArea');
                var url = apiCardRules + '/acc/getCardRules.xhtml';
                var uls = "";
                console.log(url);
                ajax.post(url,{},function(data){
                    if(data.resultSet != null){
                        for(var i = 0;i< data.resultSet.length;i++){
                            uls += '<li data-flag="china"><em>' + i18next.t(data.resultSet[i].desc) + '</em></li>';
                        }
                    }
                    var html=''
                        +'<div claSs="pop-coverbg active" id="pop-areaboxMask"></div>'
                        + '<div class="pop-areabox" id="pop-areabox">'
                        +   '<ul>'
                        +       uls
                        +   '</ul>'
                        +'</div>';
    
                    if( $('#pop-areaboxMask').length==0){
                        $('.viewbox').append(html);
    
                        setTimeout(function(){
                            $('.pop-areabox').addClass('anims active');
                        },30)
                    }
                });
            },
    
            hidePopArea:function(){
                $('#pop-areaboxMask,#pop-areabox').remove();
                return false;
            },
    
            choosePopArea:function(obj,showbox){
                var areaName = obj.find('em').html();
                $(showbox).html(areaName);
                PopArea.hidePopArea();
    
                $('#idCard').attr('data-flag',obj.attr('data-flag'));
            }
        };
    






    /**
     * 初始化事件
     */
    function initEvent() {
        /**
         * 获取验证码
         */
        console.log('initEvent');
        curWindow.on('click','[data-action="getIdentifyCodeBtn"]',function () {
            if(!$(this).hasClass('active')){
                var tel = $('#telNum').attr('data-tell');
                initMethod.getIdentifyCode(tel);
                // identifyCode.getIdentifyCode(tel);
            }
        });
    }

    initData();
    initEvent();


});