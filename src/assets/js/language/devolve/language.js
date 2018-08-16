
/**
 * 加载i18n脚本 语言环境
 */
(function (window){
    var selectorArr = [];
    window.localize = function(){
        selectorArr.push(arguments);
    };

    window.docCookies = {
        //获取当前语言环境
        getCurrentLang : function(){
            return document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        },

        //设置当前语言环境
        setCurrentLang : function(lang){
            if(lang) {
                if (lang && lang.toLowerCase().indexOf('zh') == -1) {
                    lang = 'en';
                } else {
                    lang = 'zh';
                }
            }else{
                var localLang = navigator.language;

                if(localLang && localLang.toLowerCase().indexOf('zh') == -1){
                    lang = 'en';
                }else {
                    lang = 'zh';
                }
            }

            var domain = window.location.href.match(/([^\.\/]+\.[^\.\/]+)(\/)/)[1];
            document.cookie = 'lang=' + lang + ';path=/;domain=.' + domain;
        }
    };

    /**
     * 设置语言类型： 默认为中文
     */
    var i18nLanguage;
    var i18nParams;
    var myCookieLang = docCookies.getCurrentLang();
    var i18nPath = webRoot + '/assets/js/language/devolve';

    if(myCookieLang){
        i18nLanguage = myCookieLang;
    }else{
        docCookies.setCurrentLang(i18nLanguage);
        i18nLanguage = 'zh';
    }

    window.execI18n = function(ns,defaultModule,fun){
        i18nParams = arguments;
    };

    /**
     * 加载i18n script
     */
    (function loadI18nScript() {
        if (typeof i18next == 'undefined') {
            var loadCount = 0;
            var arr = [
                i18nPath + '/i18next.min.js',
                i18nPath + '/loc-i18next.js',
                i18nPath + '/i18nextXHRBackend.js'
            ];

            for (var i = 0; i < arr.length; i++) {
                var script = document.createElement('script');
                script.src = arr[i];
                document.head.appendChild(script);

                script.onerror = function () {
                    throw URIError('加载i18n脚本异常');
                };

                script.onload = function () {
                    ++loadCount;

                    if (loadCount == arr.length) {
			var t = setInterval(function(){
                            if (i18nParams) {
                                clearInterval(t);
                                i18nExec.apply(this, i18nParams);
                            }
                        },5);
                        zeptoIntercept();
                    }
                }
            }
        }
    })();


    /**
     * 执行页面i18n方法
     * @return
     */
    var i18nExec = function(ns,defaultModule,fun){
        var lng = i18nLanguage;
        var jsonpath =   webRoot + '/i18n'; //资源文件路径

        i18next.use(i18nextXHRBackend).init({
            fallbackLng: lng,
            debug: false,
            ns: ns,
            defaultNS: ns,
            backend:{
                loadPath: jsonpath + '/{{lng}}/{{ns}}.json',
                crossDomain: true
            }

        }, function(err, t) {

            var localize = locI18next.init(i18next);
            window.localize = localize;
           
            for(var i = 0; i < selectorArr.length; i++){
                localize.apply(this,selectorArr[i]);
            }            

            if(typeof fun == 'function'){
                fun(localize);
            }
        });

        interceptAddResources();
    };

    /**
     * 添加资源
     */
    var interceptAddResources = function(){
        var addResources = i18next.addResources;

        i18next.addResources = function(ns,url){
            $.getJSON(url,{},function(data){
                addResources.call(this,i18nLanguage,ns,data);
            });
        };
    }

})(window);



/**
 * 拦截
 */
var zeptoIntercept = function(){


    /**
     * 拦截函数 将返回的函数引用赋值给需要拦截的函数
     * @param fun 要拦截的函数
     * @param before 函数执行之前执行
     * @param after 之后执行 如果被拦截函数有返回值将在第一个参数传过来
     * @param afterSync 是否异步执行后置函数,ture ：异步执行,默认false
     * @returns {Function} 返回一个被拦截的函数的引用
     */
    function interceptor(fun,before,after,isAfterSync){
        if(typeof before !== 'function'){
            before = function(){};
        }

        if(typeof after !== 'function'){
            after = function(){};
        }

        return function (){
            var flag = before.apply(this,arguments);
            if(flag){
                //原函数需要返回值
                var returnValue = fun.apply(this,arguments);

                if(returnValue){
                    //返回值带回去在第一个参数
                    var that = this;

                    if(isAfterSync){
                        setTimeout(function(){
                            after.call(that, returnValue, arguments);
                        },1);
                    }else{
                        after.call(that, returnValue, arguments);
                    }

                    return returnValue;

                }else{
                    after.apply(this,arguments);
                }
            }
        };
    }


    var zptHtml = $.fn.html;
    $.fn.html = interceptor(zptHtml,function(html,key){
        if(html && i18next.exists(html + '')){
            zptHtml.call(this,i18next.t(html));
            return false;
        }else if(key && i18next.exists(key + '')){
            zptHtml.call(this,i18next.t(key));
            return false;
        } else{
            console.warn('没有设置语言Key或找不到key');
        }

        return true;
    });


    var zptText = $.fn.text;
    $.fn.text = interceptor(zptText,function(text,key){

        if(text && i18next.exists(text + '')){
            zptText.call(this,i18next.t(text));
            return fasle;

        }else if(key && i18next.exists(key + '')){
            zptText.call(this,i18next.t(key));
            return false;
        }else{
            console.warn('没有设置语言Key或找不到key');
        }

        return true;
    });

};
