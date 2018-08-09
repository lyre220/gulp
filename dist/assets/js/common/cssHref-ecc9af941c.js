$(function () {
    var cssAlias = {'resourcePath':'','@': webRoot +'/assets'};
    var links = document.getElementsByTagName('link');
    for(var i = 0;i < links.length;i++){
        var link = links[i];
        var href = link.getAttribute('data-href')
        if(href){
            href = href.replace(/^([^\/]*)?\//,function(){
                var temp = cssAlias[arguments[1]];
                if(temp != null){
                    return temp + "/";
                }
                return arguments[0];
            })
            link.setAttribute('href',href);
            link.removeAttribute('data-href');
        }
    }
    setTimeout(function(){
        document.body.style.display = 'block';
    },100)

});