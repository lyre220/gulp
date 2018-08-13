/**
 * 设置我的交易密码
 */
define(function(require, exports, module) {
    var OperateRemote ={};
    require('data/common/operate');
    /**
     * 校验是否是国际号码
     */
    OperateRemote.ajaxGetPhoneStata = new pubOperate();
    OperateRemote.ajaxGetPhoneStata.submit = function(foldId,stata){
        console.log("校验是否是国际号码");
        var data = Mock.mock({
            'phone|1': /^1[0-9]{10}$/,
            'stata|1':true
        });
        this.success(data);
    };

    /**
     * 地区选择列表
     */
    OperateRemote.getRegionsList = new pubOperate();
    OperateRemote.getRegionsList.submit = function(argument1,argument2){
        console.log("地区选择列表:" + argument1 +"====" +argument2);
        var _this = this;
        var url = apiWebRoot + "/acc/getCardRules.xhtml";
        var callback = function (res) {
            // console.log('res');
            // console.log(res);
            if (res.success) {
                var datas = res;
                // console.log('datas');
                // console.log(datas);
                _this.success(datas);
            } else {
                console.log('error233');
                _this.error({'errorCode': -1, 'errorMsg': res.errorMsg});
            }
        };
        $.post(url,callback, 'json');

    };


    // /**
    //  * 地区选择列表
    //  */
    // OperateRemote.ajaxOriginalFoldDataList = new pubOperate();
    // OperateRemote.ajaxOriginalFoldDataList.startIndex = 0;
    // OperateRemote.ajaxOriginalFoldDataList.submit = function(startIndex,loadNum){
    //     console.log("地区选择列表:" + startIndex +"====" +loadNum);
    //     var _this = this;
    //     var url = apiWebRoot + "/mini/home/getFolds.xhtml";
    //     var data = {};
    //     data.startIndex = startIndex;
    //     data.length = '' + loadNum;
    //     var callback = function (res) {
    //         if (res.code == 200) {
    //             var datas = res.data;
    //             var mcp_li = [];
    //             $(datas).each(function () {
    //                 mcp_li.push({id: this.id, name: this.name,num:this.size});
    //             });
    //             _this.success(mcp_li);
    //         } else {
    //             _this.error({'errorCode': -1, 'errorMsg': res.data});
    //         }
    //     };
    //     $.post(url, data, callback, 'json');

    // };




    module.exports.OperateRemote = OperateRemote;
});