/*	用于参数校验的工具类，只调用这一份就好，不要另外写	*/

var isStringLengthIn = function(param, min, max){
	if(isNotEmpty(param)){
		var i = $.trim(param).length;
		return min <= i && i <= max;
	}
	return false;
};

var isStringShorterThan = function(param, length){
	return isNotEmpty(param) && $.trim(param).length < length;
};

var isStringLongerThan = function(param, length){
	return isNotEmpty(param) && $.trim(param).length > length;
};

var isNotEmpty = function(param){
	return $.trim(param) ? true : false;//这里不可以删掉true 和  false
};


var isEmpty = function(param){
	return $.trim(param) ? false : true;//这里不可以删掉true 和  false
};
/**
 * 校验是否纯数字
 */
var isNumberOnly = function(param){
	if(isNotEmpty(param)){
		var t = /^\d+$/;
		return t.test(param);
	}
	return false;
};

/**
 * 校验金额，不能为负数金额
 * @param money
 * @return
 */
var isMoneyFormatLegal = function(money){
	if(isNotEmpty(money)){
		var t = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
		return t.test(money);
	} 
	return false;
};

/**
 * 校验银行卡号是否合法
 * @param cardNumber
 * @return
 */
var isBankCardNumberLegal = function(cardNumber){
	if(isEmpty(cardNumber)){
		return false;
	}
	if(cardNumber.indexOf('*') > -1){
		return false;
	}
	var len = $.trim(cardNumber).length;
	return 16 <= len && len < 20;
};

/**
 * 检查邮箱格式是否合法
 * @param mail
 * @return
 */
var isMailForamtLegal = function(mail){
	if(isNotEmpty(mail)){
	var t = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;
		return t.test(mail);
	}
	return false;
};

/**
 * 校验电话号码格式是否正确
 * @param mobile
 * @return
 */
var isMobileFormatLegal = function(mobile){
	var re = /[1][3-9]\d{9}$|^(00852)([5|6|9])\d{7}$|^(00886)([09|9])\d{8}$|^(00853)[6]\d{7}$|^(0060)\d{9}/;
	return re.test(mobile);
};

/**
 * 校验登录密码格式是否正确
 * 只能包含字母、数字、下划线等字符
 * @param login_pwd
 * @return
 */
var isLoginPwdFormatLegal = function(login_pwd){
	if(isNotEmpty(login_pwd)){
		var t = /^[_\da-zA-Z]{6,20}$/;
		return t.test(login_pwd);
	}
	return false;
};

/**
 * 校验支付密码格式是否正确
 * @param pay_pwd
 * @return
 */
var isPayPwdLegal = function(pay_pwd){
	if(isNotEmpty(pay_pwd)){
		var t = /^[0-9]{6}$/;
		return t.test(pay_pwd);
	}
	return false;
};

/**
 * 是否是中文
 */
var isChinese = function(str){
	return /^[\u4e00-\u9fa5]+$/.test(str);
};

/**
 * 判断文件类型是否是图片
 * @param str
 * @returns {boolean}
 */
var isPicType = function(str){
	return /^.jpg|.JPG|.jpeg|.JPEG|.png|.PNG+$/i.test(str);
};

/**
 * @descrition:判断输入的参数是否是个合格的URL,由于url的灵活性和多样性，一下代码并不能测试所有的url都是合法的（PS：该正则无法通配所有的URL，请慎用）
 * @param:str->待判断的url参数
 * @return ：true表示符合改正则。
 **/
var IsURL = function (str_url) {
	var reg = /^http:\/\/|https:\/\/(?:[\w-\.]{0,255})(?:(?:\/?[^\s]{0,255}){0,255})/g;

	if (reg.test(str_url)) {
		return (true);
	} else {
		return (false);
	}
};

/**
 * 身份证号码是否正确
 */
var isIdCard = function(param){
	var reg = new RegExp('(^\\d{15}$)|(^\\d{17}([0-9]|x|X)$)');
	var flag = false;

	if(reg.test(param)){
		flag = true;
	}

	if(!flag){
		flag = checkGATIdCard(param);
	}
	return flag;
};


var checkIdCard = function(idCard,flag){


	switch (flag){
		case 'china':
			var reg = new RegExp('(^\\d{15}$)|(^\\d{17}([0-9]|x|X)$)');
			return reg.test(idCard);
			break;

		case 'hongKong':
			var reg1 = /^[A-Z]{1,2}[0-9]{6}[|\(]?[0-9A-Z][|\)]?$/;//香港格式1 (香港身份证号码结构：XYabcdef(z))
			var reg2 = /^[A-Z][0-9]{7,12}$/;//香港格式2 (H60152555)

			if(reg1.test(idCard) || reg2.test(idCard)){
				return true;
			}

			break;
		case 'macao':
			var reg = /^[1|5|7][0-9]{6}[|\(]?[0-9A-Z][|\)]?$/;//澳门,8位数,不包含出生年月 格式为 xxxxxxx(x) 注:x全为数字,无英文字母 首位数只有1、5、7字开头的
			return reg.test(idCard);
			break;

		case 'taiwan':
			var reg = /^[a-zA-Z][0-9]{9}$/;//台湾:10位字母和数字
			return reg.test(idCard);
			break;
	}

	return false;

};

/**
 *
 * 验证港澳台身份证
 * @param obj
 */
var checkGATIdCard = function (obj){
	var reg1 = /^[A-Z]{1,2}[0-9]{6}[|\(]?[0-9A-Z][|\)]?$/;//香港格式1 (香港身份证号码结构：XYabcdef(z))
	var reg2 = /^[A-Z][0-9]{7,12}$/;//香港格式2 (H60152555)

	var reg3 = /^[1|5|7][0-9]{6}[|\(]?[0-9A-Z][|\)]?$/;//澳门,8位数,不包含出生年月 格式为 xxxxxxx(x) 注:x全为数字,无英文字母 首位数只有1、5、7字开头的
	var reg4 = /^[a-zA-Z][0-9]{9}$/;//台湾:10位字母和数字

	if(reg1.test(obj) || reg2.test(obj) || reg3.test(obj) || reg4.test(obj)){
		return true;
	}

	return false;
};

/**
 * 座机电话检验
 */
var checkLandline = function(phone){
	var reg = /^0\d{5} | 0\d{2,3}-?\d{7,8}$/;
	return reg.test(phone);

};

/**
 * 校验手机与座机
 * @param phone
 * @param flag
 */
var checkMobileAndLandline = function(phone,flag){
	return checkLandline(phone) || checkMobile(phone,flag);
};

/**
 * 检查手机号
 * @param mobile 手机号
 * @param flag 号码地区标识
 */
var checkMobile = function(mobile,flag){
	//大陆
	var reg = /^[1][3-9]\d{9}$/;

	switch (flag){
		case '852'://香港
			reg = /(00852)([5|6|9])\d{7}$/;
			break;

		case '853'://澳门
			reg = /(00853)[6]\d{7}$/;
			break;

		case '886'://台湾
			reg = /(00886)[0][9]\d{8}$/;
			break;
		default:
			break;
	}

	return reg.test(mobile);
};


/**
 * @todo 校验电话号码格式是否正确
 * @param mobile
 * @return {boolean}
 */
var isMobileFormatLegal = function(mobile){
    var flag = false;
    var reg;

    if(!flag){
        reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;//大陆
        flag = reg.test(mobile);
    }

    if(!flag){
        reg = /(00852)([5|6|9])\d{7}$/;//香港
        flag = reg.test(mobile);
    }

    if(!flag){
        reg = /(00853)[6]\d{7}$/; //澳门
        flag = reg.test(mobile);
    }

    if(!flag){
        reg = /(00886)[0][9]\d{8}$/;//台湾
        flag = reg.test(mobile);
    }

    return flag;

}


/**
 * 港，澳 湾 区号补齐
 * @param mobile
 * @param flag
 * @returns {*}
 */
var getMobile = function(mobile,flag){

	switch (flag){
		case '852'://香港
			if(mobile.indexOf('00852') != 0){
				mobile = '00852' + mobile;
			}
			break;

		case '853'://澳门

			if(mobile.indexOf('00853') != 0){
				mobile = '00853' + mobile;
			}

			break;

		case '886'://台湾

			if(mobile.indexOf('00886') != 0){
				mobile = '00886' + mobile;
			}

			break;
		default:
			break;
	}

	return mobile;
};