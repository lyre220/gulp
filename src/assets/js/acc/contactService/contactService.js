/**
 * 设置交易密码
 */
define(function(require, exports, module) {
    require('common/template');//模板技术
    // var ajaxdata = require('data/acc/traderpw/ajax_traderpw_set');
    var curWindow = $('.viewbox');

    /**
     * 初始化方法
     */
    var initMethod = {
       

    };



    /**
     * 初始化数据
     */
    function initData() {


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