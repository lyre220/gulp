/**
 * API配置
 */
var webRoot='/dist';
var apiWebRoot ='//wdy.soqitest.com';
var mp_bak = "//mp.soqi.cn";

/**
 * debug调试
 */
function interceptor(fun,before,after){
    if(typeof before !== 'function'){
        before = function(){};
    }
    if(typeof after !== 'function'){
        after = function(){};
    }
    return function (){
        var flag = before.apply(this,arguments);
        if(flag != false){
            fun.apply(this,arguments);
            after.apply(this,arguments);
        }
    };
}
var debug = true;
if(!debug){
    console.log = interceptor(console.log,function(){return debug;});
}



/**
 * seajs 设置
 */
var seajs = seajs || null;
if(seajs != null){
    var mpJs = mpJs || {'alias':0};
    var seaPath = webRoot + "/assets/js";
    var version = 1.1;
    $.ajax({
        url : webRoot+ '/rev/js/rev-manifest.json',
        type : "GET",
        dataType:"json",
        async : false,
        cache : false,
        success : function(data){
            seajs.config({
                base: seaPath,
                map: [
                    [ /^(.*)\.js$/i, '$1.js?v=' + version ]
                ],
                debug:true,
                charset:'utf-8',
                alias: data
            });
        }
    });
    seajs.use(["common/cssHref","common/pubPopup","data/common/mock"]);
}


/**
 * 与后端配合
 */
var loginFilters = [/.*\/show\/.*/];
var loginFilter = function(){
    var b = false;
    for(var i =0;i < loginFilters.length;i++){
        if(loginFilters[i].test(location.href)){
            b = true;
            break;
        }
    }
    return b;
};
var GetCookie = function(name){
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
};
$.ajax = interceptor($.ajax,function (param) {
    if(!loginFilter()){
        var reg = new RegExp("(^| )" + 'STOKEN' + "=([^;]*)(;|$)");
        if (!(document.cookie.match(reg))){
            location.href = mp_bak + '/login/turnLogin.xhtml?requestURL=' + encodeURIComponent(location.href);
        }
    }
    param.beforeSend = function(xhr) {
        xhr.setRequestHeader("Authorization", GetCookie('STOKEN'));
    };
});

/**
 * 移动PC端事件处理
 */
function IsPC() {	//判断是否是PC
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
var start = "mousedown";
var move = "mousemove";
var end = "mouseup";
var click = "click";
if(IsPC()){
    start = "mousedown";
    move = "mousemove";
    end = "mouseup";
}else{
    start = "touchstart";
    move = "touchmove";
    end = "touchend";
}






