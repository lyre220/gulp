/**
 * 设置交易密码
 */
define(function (require, exports, module) {
    require('common/template'); //模板技术
    var ajaxdata = require('data/acc/traderpw/ajax_traderpw_set');
    var curWindow = $('.viewbox');
    var list = undefined; //地区列表
    var Regionsflag = undefined; //地区标签
    var isInternationalNumber = undefined; //是否国际号码
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
                console.log(data);
                var phone = data.resultSets.mobile;
                var phoneVal = phone.substr(0, 3) + '****' + phone.substr(7);
                isInternationalNumber = data.resultSets.isInlandNumber;
                // isInternationalNumber = false;
                var html = template("phoneData", { //phoneData 模板数据渲染挂载点
                    phone: phone,
                    phoneVal: phoneVal, //{}渲染的数据
                    internationalFg: isInternationalNumber
                });
                $('.acc-traderpw-tell').html(html);//数据渲染位置
                localize('.acc-traderpw-tell'); //国际化语言包挂载点
                if (!isInternationalNumber) {
                    $('.acc-traderpw-tell-tips').show();
                    $('.check-code-box').hide();
                }
            };
            ajaxdata.OperateRemote.findTransactionPwdInfo.error = function (result) {
                pubPopup.noticeTis(result.errorMsg);
            };
            ajaxdata.OperateRemote.findTransactionPwdInfo.submit();
        },
        /**
         * 获取地区列表
         */
        getRegionsList: function () {
            console.log('getRegionsList');
            ajaxdata.OperateRemote.getRegionsList.success = function (data) {
                list = data.resultSet;
                Regionsflag = data.success

            };
            ajaxdata.OperateRemote.getRegionsList.error = function (result) {
                console.log(result);     
                pubPopup.noticeTis(result.errorMsg);
            };
            ajaxdata.OperateRemote.getRegionsList.submit();
        },

    };

    /**
     *获取验证码
     */
    var identifyCode = {
        endTimeCode: function () {
            var time = 3;
            var type = 4; //交易密码设置
            var obj = $('[data-action="getIdentifyCodeBtn"]');
            // if(isInternationalNumber){
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
                //将获取到的验证码绑定到输入框，本地测试用
                $('.check-code').val(data.resultSet)
            };
            ajaxdata.OperateRemote.getCheckCode.error = function (result) {
                pubPopup.noticeTis(result.errorMsg);
            };
            ajaxdata.OperateRemote.getCheckCode.submit(type);
            // }
            // else{
            //     $('.acc-traderpw-tell-tips').show();
            //     $('.check-code-box').hide();
            // }

        }
    };

    /**
     *  设置交易密码-地区选择
     */

    var PopArea = {
        showPopArea() {
            var html = template("RegionsListData", {
                list: list,
                Regionsflag: Regionsflag
            });
            $('.acc-traderpw-area').html(html);
            setTimeout(function () {
                $('.pop-areabox').addClass('anims active');
                $('.pop-coverbg').addClass('active');
            }, 50)
            localize('#pop-areabox');
        },
        hidePopArea() {
            $('#pop-areaboxMask,#pop-areabox').remove();
            return false;
        },
        choosePopArea(obj, showbox) {
            var areaName = obj.find('em').html();
            $(showbox).html(areaName);
            PopArea.hidePopArea();
        }

    }

    /**
     * 设置交易密码-表单验证
     */
    var setTransactionPwd = function () {
        var param = {};
        var updateFlag = true;

        //参数组织
        $('.j-acc-traderpw-set .pub-input').each(function () {
            var that = $(this);
            var val = that.val();
            var name = that.attr('name');
            if (val) {
                switch (name) {
                    case 'checkCode':
                        if (isNumberOnly(val) && val.length == 4) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('请输入校验码', 'verifyCode.fillVerifyCode');
                            updateFlag = false;
                            return false;
                        }
                        break;
                    case 'transactionPwd':
                        if (isNumberOnly(val) && val.length == 6) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('交易密码只能输入6位纯数字', 'setTransactionPwd.tradePwd6PureNumbers');
                            updateFlag = false;
                            return false;
                        }
                        break;
                    case 'reTransactionPwd':
                        if (isNumberOnly(val) && val.length == 6) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('交易密码只能输入6位纯数字', 'setTransactionPwd.tradePwd6PureNumbers');
                            updateFlag = false;
                            return false;
                        }
                        break;
                    case 'name':
                        if (name) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('请输入个人信息', 'setTransactionPwd.fillPersonalInfo');
                            updateFlag = false;
                            return false;
                        }
                        break;
                    case 'idCard':
                        if (isNumberOnly(val)) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('请输入身份证号', 'setTransactionPwd.idCard');
                            updateFlag = false;
                            return false;
                        }
                        break;

                    default:
                        param[name] = val;
                        break;
                }

            } else {
                pubPopup.noticeTis(that.attr('placeholder'));
                updateFlag = false;
                return false;
            }
        });

        if (updateFlag) {
            if (param.transactionPwd == param.reTransactionPwd) {
                ajaxdata.OperateRemote.setTransactionPwd.success = function (data) {
                    switch (data.statusCode) {
                        case 9003:
                            pubPopup.noticeTis('错误的身份证号', 'setTransactionPwd.idCardWrong');
                            break;
                        case 9004:
                            pubPopup.noticeTis('用户名错误', 'setTransactionPwd.nameWrong');
                            break;
                        case 9006:
                            pubPopup.noticeTis('交易密码错误', 'setTransactionPwd.tradePwdFail');
                            break;
                        case 1001500:
                            pubPopup.noticeTis('操作失败', 'setTransactionPwd.opFailed'); 
                            break;
                        case 1002001:
                            pubPopup.noticeTis('参数异常', 'setTransactionPwd.paramError');
                            break;
                        case 1002014:
                            pubPopup.noticeTis('身份证号码不正确', 'setTransactionPwd.idCardWrong');
                            break;
                        case 1002015:
                            pubPopup.noticeTis('两次密码输入不一致', 'setTransactionPwd.notEqual');
                            break;
                        case 1002016:
                            pubPopup.noticeTis('已存在交易密码', 'setTransactionPwd.alreadyExist');
                            break;
                        case 1002017:
                            pubPopup.noticeTis('校验码错误 ', 'setTransactionPwd.wrongVerifyCode'); 
                            break;
                        case 1666666:
                            pubPopup.noticeTis('操作成功', 'company.opSuccess'); 
                            setTimeout(function () {
                                //TODO
                                 window.location.href = apiWebRoot + webRoot +'/pages/acc/acc_traderpw/acc_traderpw_set_success.html';
                                //  window.location.href = 'http://192.168.0.193:32768/src/pages/acc/acc_traderpw/acc_traderpw_set_success.html';
                            }, 1000);
                            break;
                    }
                };
                ajaxdata.OperateRemote.setTransactionPwd.error = function (result) {
                    pubPopup.noticeTis(result.errorMsg);
                };
                ajaxdata.OperateRemote.setTransactionPwd.submit(param);


            } else {
                pubPopup.noticeTis('两次交易密码不正确', 'setTransactionPwd.notEqual');
            }
        }

    };
    /**
     * 找回交易密码-表单验证
     */
    var retrieveTransactionPwd = function () {
        var param = {};
        var updateFlag = true;

        //参数组织
        $('.j-acc-traderpw-retrieve .pub-input').each(function () {
            var that = $(this);
            var val = that.val();
            var name = that.attr('name');
            if (val) {
                switch (name) {
                    case 'checkCode':
                        if (isNumberOnly(val) && val.length == 4) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('请输入校验码', 'verifyCode.fillVerifyCode');
                            updateFlag = false;
                            return false;
                        }
                        break;
                    case 'transactionPwd':
                        if (isNumberOnly(val) && val.length == 6) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('交易密码只能输入6位纯数字', 'setTransactionPwd.tradePwd6PureNumbers');
                            updateFlag = false;
                            return false;
                        }
                        break;
                    case 'reTransactionPwd':
                        if (isNumberOnly(val) && val.length == 6) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('交易密码只能输入6位纯数字', 'setTransactionPwd.tradePwd6PureNumbers');
                            updateFlag = false;
                            return false;
                        }
                        break;
                    case 'name':
                        if (name) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('请输入个人信息', 'setTransactionPwd.fillPersonalInfo');
                            updateFlag = false;
                            return false;
                        }
                        break;
                    case 'idCard':
                        if (isNumberOnly(val)) {
                            param[name] = val;
                        } else {
                            pubPopup.noticeTis('请输入身份证号', 'setTransactionPwd.idCard');
                            updateFlag = false;
                            return false;
                        }
                        break;

                    default:
                        param[name] = val;
                        break;
                }

            } else {
                pubPopup.noticeTis(that.attr('placeholder'));
                updateFlag = false;
                return false;
            }
        });

        if (updateFlag) {
            if (param.transactionPwd == param.reTransactionPwd) {
                ajaxdata.OperateRemote.backTransactionPwd.success = function (data) {
                    switch (data.statusCode) {
                        case 789:
                            pubPopup.noticeTis('系统异常', 'common.systemError');
                            break;
                        case 9002:
                            pubPopup.noticeTis('尚未设置交易密码', 'modifyTransactionPwd.noSetTradePwd');
                            break;
                        case 9003:
                            pubPopup.noticeTis('错误的身份证号', 'setTransactionPwd.idCardWrong');
                            break;
                        case 9004:
                            pubPopup.noticeTis('用户名错误', 'setTransactionPwd.nameWrong');
                            break;
                        case 9005:
                            pubPopup.noticeTis('用户名错误', 'setTransactionPwd.nameWrong');
                            break;
                        case 9006:
                            pubPopup.noticeTis('交易密码错误', 'setTransactionPwd.tradePwdFail');
                            break;
                        case 9009:
                            pubPopup.noticeTis('您当前已被锁定', 'modifyTransactionPwd.locked');
                            break;
                        case 1002001:
                            pubPopup.noticeTis('参数异常', 'setTransactionPwd.paramError');
                            break;
                        case 1002015:
                            pubPopup.noticeTis('两次交易密码不一致', 'setTransactionPwd.notEqual');
                            break;
                        case 1002017:
                            pubPopup.noticeTis('校验码错误 ', 'setTransactionPwd.wrongVerifyCode'); 
                            break;
                        case 1666666:
                            pubPopup.noticeTis('操作成功', 'company.opSuccess'); 
                            setTimeout(function () {
                                //TODO
                                window.location.href = apiWebRoot + webRoot +'/pages/acc/acc_traderpw/acc_traderpw_set_success.html';
                                // window.location.href = 'http://192.168.0.193:32768/src/pages/acc/acc_traderpw/acc_traderpw_set_success.html';
                            }, 2000);
                            break;
                    }
                };
                ajaxdata.OperateRemote.backTransactionPwd.error = function (result) {
                    pubPopup.noticeTis(result.errorMsg);
                };
                ajaxdata.OperateRemote.backTransactionPwd.submit(param);


            } else {
                pubPopup.noticeTis('两次交易密码不正确', 'setTransactionPwd.notEqual');
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
        initMethod.getRegionsList();
    }
    /**
     * 初始化事件
     */
    function initEvent() {
        /**
         * 获取验证码
         */
        console.log('initEvent');
        curWindow.on('click', '[data-action="getIdentifyCodeBtn"]', function () {
            if (!$(this).hasClass('active')) {
                var tel = $('#telNum').attr('data-tell');
                // initMethod.getIdentifyCode(tel);
                identifyCode.endTimeCode(tel);
            }
        });

        /**
         * 展开地区选择弹出框
         */
        $('[data-action="shopPopArea"]').on('click', PopArea.showPopArea);

        /**
         * 选择港澳台地区
         */
        $('.viewbox').on('click', '#pop-areabox li', function () {
            var obj = $(this);
            PopArea.choosePopArea(obj, '.areaNamebox');
        });

        /**
         *  关闭选择地区弹出框
         */
        $('.viewbox').on(end, '#pop-areaboxMask', PopArea.hidePopArea);


        /**
         * 联系客服
         */
        curWindow.on('click', '.contactCode', function () {
            window.location.href = apiWebRoot + webRoot +'/pages/acc/acc_customerServices/acc_customerServices.html';
            // window.location.href = 'http://192.168.0.193:32768/src/pages/acc/acc_customerServices/acc_customerServices.html';
        });

        /**
         * 设置交易密码
         */
        $('.j-back-transaction-pwd').on(end, function () {
            var traderPasswordId = $.trim($('#traderPasswordRetrieve').val());

            if (traderPasswordId) {
                retrieveTransactionPwd();
            } else {
                setTransactionPwd();
            }
        });
    }

    initData();
    initEvent();


});