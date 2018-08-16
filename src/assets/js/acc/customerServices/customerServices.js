/**
 * 设置交易密码
 */
define(function(require, exports, module) {
    require('common/template');//模板技术
    var ajaxdata = require('data/acc/customerServices/ajax_customerServices');
    var curWindow = $('.viewbox');
    /**
     * 初始化方法
     */
    var initMethod = {
        /**
         * 获取客服联系方式
         */
        getCustomerServices:function(){
            console.log('getCustomerServices');
            ajaxdata.OperateRemote.findMpCustomerServices.success = function (data) {
                console.log('CustomerServices-data');
                console.log(data);
                let resultSet1 = data.resultSet[0];
                let resultSet2 = data.resultSet[1];
                let phoneIdEcr = resultSet2.phoneIdEcr;
                let customerServicesTel = `tel:${resultSet1.mobile}`
                $('.customerServicesMobile1').html(resultSet1.mobile);
                $('.customerServicesMobile2').html(resultSet2.mobile);
                $('.contact-way a').attr('href',customerServicesTel)
                initMethod.getWeiXinQRCode(phoneIdEcr)
            };
            ajaxdata.OperateRemote.findMpCustomerServices.error = function (result) {    
                pubPopup.noticeTis(result.errorMsg);
            };
            ajaxdata.OperateRemote.findMpCustomerServices.submit();
        },
        /**
         * 获取客服微信二维码
         */
        getWeiXinQRCode:function(phoneIdEcr){
            console.log('getWeiXinQRCode');
            ajaxdata.OperateRemote.findWeiXinQRCode.success = function (data) {
                console.log('WeiXinQRCode-data');
                console.log(data);
                //TODO
                // let resultSet = data.resultSet
                let resultSet = '../../../assets/img/service_QR_code.png'
                $('.qr-code img').attr('src',resultSet)
            };
            ajaxdata.OperateRemote.findWeiXinQRCode.error = function (result) {    
                pubPopup.noticeTis(result.errorMsg);
            };
            ajaxdata.OperateRemote.findWeiXinQRCode.submit(phoneIdEcr);
        },

    };



    /**
     * 初始化数据
     */
    function initData() {
        initMethod.getCustomerServices()
        

    }

    /**
     * 初始化事件
     */
    function initEvent() {
        
        console.log('initEvent');
        $('.wechat-contact').on('click',function(){
            $('.pop-coverbg').show()
        })
        $('.close').on('click',function(){
            $('.pop-coverbg').hide()
            
        })
    }

    initData();
    initEvent();


});