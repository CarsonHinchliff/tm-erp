var checkPhoneFormat = function(mobile){
      var tel = /^0\d{2,3}-?\d{7,8}$/;
      var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
      if(mobile.length == 11){//手机号码
        return !!phone.test(mobile);
      }else if(mobile.length == 13 && mobile.indexOf("-") != -1 ){//电话号码
        return !!tel.test(mobile);
      }
}

export { checkPhoneFormat }