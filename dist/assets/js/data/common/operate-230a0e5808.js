/**
 * Created by Soqi on 2017/11/13.
 */
function pubOperate() {
    this.returnData = null;//后端数据
    this.leadingData = null;//前端数据
    this.submit = function(){ //提交方法
        console.debug('Operate submit')
    };
    /**
     * 数据转换 到前端数据模型
     */
    this.convertToLeadingData =function () {};
    /**
     * 数据转换 到后端数据模型
     */
    this.convertToReturnData =function () {};
    return this;
}

