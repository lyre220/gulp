var pubPopup = {
    /**
     * 普通弹出 3秒提示
     */
    noticeTis : function(content,icon){
        var id = parseInt(Math.random() * 100);
        var html = '';
        html += '<div class="noticeTis-toast"  id="noticeTis'+id+'">';
        if(icon == undefined){
            html += '<div class="noticeTis-cont"><span class="txt">默认的Toast通知</span></div>';
        }else{
            html += '<div class="noticeTis-cont"><span class="iconbox"><i class="'+icon+'"></i></span><span class="txt">'+content+'</span></div>';
        }
        html += '</div>';
        if($('.viewbox').length >0 ){
            $('.viewbox').first().append(html);
        }else{
            $('body').append(html);
        }
        $("#noticeTis"+id).find('.txt').html(content);
        setTimeout(function(){$("#noticeTis"+id).remove();},3000);
    },
    /**
     * 待确认 取消 弹出框
     */
    longtimetips:function(options){
        var defaults = {
            head:"", // 标题
            cnt : "内容", // 内容
            num : '2 ', // 底部按钮个数
            cancleTxt :"取消", // 取消类文字
            comfirmTxt :"确定",// 确定类文字
            fun:'', //确定调用函数
            data:'',//确定调用函数参数
            insertDirect:0
        };
        var opts = $.extend({}, defaults, options);
        var id = parseInt(Math.random() * 1000);
        var html = ''
            +'<div class="pop-coverbg flex-center active" id="j-toast-default'+id+'">'
            +   '<div class="pop-comfirmDelete">'
            +       '<i class="closeIconbox" id="close'+id+'"></i>'
            +       '<div class="head toast-hd'+id+'">'+opts.head+'</div><div class="cnt toast-cont'+id+'">'+opts.cnt+'</div>'
            +       '<div class="flexbox">'
            +           '<a href="javascript:" class="flex" id="cancle'+id+'">'+opts.cancleTxt+'</a>'
            +           '<a href="javascript:" class="flex comform" id="comfirm'+id+'">'+opts.comfirmTxt+'</a>'
            +       '</div>'
            +     '</div>'
            +  '</div>';
        if(opts.insertDirect ==0){
            $('body').append(html);
        }else{
            $('.viewbox').first().append(html);
        }
        if(opts.num == 1){
            $('#cancle'+id).remove();
        }
        $('#close'+id ).on('click',function(){
            $("#j-toast-default"+id).remove();
        });
        $('#cancle'+id).on('click',function(){
            $("#j-toast-default"+id).remove();
        });
        $('#comfirm'+id).on('click',function(){
            if(typeof opts.fun == 'function'){
                opts.fun(opts.data);
                $("#j-toast-default"+id).remove();
            }
        });
    }
};