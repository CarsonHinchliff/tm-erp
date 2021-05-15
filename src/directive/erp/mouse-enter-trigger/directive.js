var isFunction =function(func){ 
    return !!func && typeof(func) == 'function';
}

var isEnterKey = function(key){
    return key == 'Enter';
}

export default {
    bind: function (el, binding, vnode) {
        el.onkeyup = function(e){
            console.log(e);
            if(isEnterKey(e.key) && isFunction(binding.value)){
                binding.value();
            }
        }
    }
}