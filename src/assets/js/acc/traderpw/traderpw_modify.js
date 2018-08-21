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
        * 获取交易密码信息
        */
       GetPhoneStata: function () {
           console.log('GetPhoneStata');
           ajaxdata.OperateRemote.findTransactionPwdInfo.success = function (data) {
               var phone = data.resultSets.mobile;
               var phoneVal = phone.substr(0, 3) + '****' + phone.substr(7);
               isInternationalNumber = data.resultSets.isInlandNumber;
               // isInternationalNumber = false;
               var html = template("phoneData", {
                   phone: phone,
                   phoneVal: phoneVal,
                   internationalFg: isInternationalNumber
               });
               $('.acc-traderpw-tell').html(html);              
               localize('.acc-traderpw-tell');
               if(!isInternationalNumber){
                $('.acc-traderpw-tell-tips').show();
                $('.check-code-box').hide();
            }
           };
           ajaxdata.OperateRemote.findTransactionPwdInfo.error = function (result) {
               pubPopup.noticeTis(result.errorMsg);
           };
           ajaxdata.OperateRemote.findTransactionPwdInfo.submit();
       },
    };

    /**
     *获取验证码
     */
    var identifyCode = {
        endTimeCode: function () {
            var time = 5;
            var type = 4; //交易密码修改
            var obj = $('[data-action="getIdentifyCodeBtn"]');
            obj.addClass('active');
            $('.acc-traderpw-tell-tips').hide();
            var send_success = setInterval(function () {
                obj.text(time + 's');
                time = time - 1;
                if (time == -1) {
                    clearInterval(send_success);
                    $('[data-action="getIdentifyCodeBtn"]').text("获取验证码").removeClass('active');
                    $('.acc-traderpw-tell-tips').show();
                }
            }, 1000);
            ajaxdata.OperateRemote.getCheckCode.success = function (data) {
                //TODO
                //将请求到的验证码绑定到输入框，本地测试用
                $('.check-code').val(data.resultSet)
            };
            ajaxdata.OperateRemote.getCheckCode.error = function (result) {
                pubPopup.noticeTis(result.errorMsg);
            };
            ajaxdata.OperateRemote.getCheckCode.submit(type);
        }
    };

    var modifyTransactionPwd = function(){
        var param = {};
        var modifyFlag = true;
        //参数组织
        $('.j-acc-traderpw-modify .pub-input').each(function () {
            var that = $(this);
            var val = that.val();
            var name = that.attr('name');
            if (val) {
                switch (name) {
                    case 'checkCode':
                    if (isNumberOnly(val) && val.length == 4) {
                        param[name] = val;
                    } else {
                        pubPopup.noticeTis('请输验证码', 'verifyCode.fillVerifyCode');
                        modifyFlag = false;
                        return false;
                    }
                    break;
                    case 'oldpwd':
                        if (isNumberOnly(val) && val.length == 6) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('旧密码应为6位纯数字', 'setTransactionPwd.tradePwd6PureNumbers');
                            modifyFlag = false;
                            return false;
                        }
                        break;
                    case 'newpwd':
                        if (isNumberOnly(val) && val.length == 6) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('新密码应为6位纯数字', 'modifyTransactionPwd.fill6NumberPwd');
                            modifyFlag = false;
                            return false;
                        }
                        break;
                    case 'renewpwd':
                        if (isNumberOnly(val) && val.length == 6) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('确认密码应为6位纯数字', 'modifyTransactionPwd.fill6NumberConfirmPwd');
                            modifyFlag = false;
                            return false;
                        }
                        break;
                    default:
                        param[name] = val;
                        break;
                }

            } else {
                pubPopup.noticeTis(that.attr('placeholder'));
                modifyFlag = false;
                return false;
            }
        });    
        if (modifyFlag) {
            if (param.newpwd === param.renewpwd) {
                ajaxdata.OperateRemote.transactionPwdModify.success = function (data) {
                    switch (data.statusCode) {
                        case 789  :
                            pubPopup.noticeTis('系统异常', 'common.systemError');
                            break;
                        case 1010   :
                            pubPopup.noticeTis('修改失败', 'modifyTransactionPwd.modifyFailed');
                            break;
                        case 9002 :
                            pubPopup.noticeTis('尚未设置交易密码', 'modifyTransactionPwd.noSetTradePwd');
                            break;
                        case 9003 :
                            pubPopup.noticeTis('错误的身份证号', 'setTransactionPwd.idCardWrong');
                            break;
                        case 9004  :
                            pubPopup.noticeTis('用户名错误', 'setTransactionPwd.nameWrong');
                            break;
                        case 9005  :
                            pubPopup.noticeTis('交易密码格式错误', 'modifyTransactionPwd.tradePasswordError');
                            break;
                        case 9006  :
                            pubPopup.noticeTis('旧交易密码不正确', 'modifyTransactionPwd.loginPwdError');
                            break;
                        case 9009  :
                            pubPopup.noticeTis('您当前已被锁定', 'modifyTransactionPwd.locked');
                            break;
                        case 1002001    :
                            pubPopup.noticeTis('参数异常', 'common.submitDataError');
                            break;
                        case 1002015 :
                            pubPopup.noticeTis('新密码两次输入不一致', 'modifyTransactionPwd.notEqual');
                            break;
                        case 1002017  :
                            pubPopup.noticeTis('校验码错误 ', 'setTransactionPwd.wrongVerifyCode');
                            break;
                        case 1666666 :
                            pubPopup.noticeTis('操作成功', 'company.opSuccess');
                            setTimeout(function () {
                                //TODO
                                window.location.href = apiWebRoot + webRoot +'/pages/acc/acc_traderpw/acc_traderpw_set_success.html';
                                // window.location.href = 'http://192.168.0.193:32768/src/pages/acc/acc_traderpw/acc_traderpw_set_success.html';
                            }, 1000);
                            break;
                    }
                };
                ajaxdata.OperateRemote.transactionPwdModify.error = function (result) {
                    pubPopup.noticeTis(result.errorMsg);
                };
                ajaxdata.OperateRemote.transactionPwdModify.submit(param);


            } else {
                pubPopup.noticeTis('新密码两次输入不一致', 'modifyTransactionPwd.notEqual');
            }
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
        curWindow.on('click','[data-action="getIdentifyCodeBtn"]',()=> {
            if(!$(this).hasClass('active')){
                var tel = $('#telNum').attr('data-tell');
                // initMethod.getIdentifyCode(tel);
                identifyCode.endTimeCode(tel);
            }
        });

        /**
         * 联系客服        
         */
        curWindow.on('click', '.contactCode',()=> {
            //TODO
            window.location.href = apiWebRoot + webRoot +'/pages/acc/acc_customerServices/acc_customerServices.html';
            // window.location.href = 'http://192.168.0.193:32768/src/pages/acc/acc_customerServices/acc_customerServices.html';
        });
        
        /**
         * 设置交易密码
         */
        $('.j-back-transaction-pwd').on(end, ()=> {
            modifyTransactionPwd();
        });
        /**
         * 找回交易密码
         */
        $('.acc-retrieve-password a').on('click',()=>{
            //TODO
            window.location.href = apiWebRoot + webRoot +'/pages/acc/acc_traderpw/acc_traderpw_retrieve.html'
            // window.location.href = 'http://192.168.0.193:32768/src/pages/acc/acc_traderpw/acc_traderpw_retrieve.html';
        })
    }

    initData();
    initEvent();


});