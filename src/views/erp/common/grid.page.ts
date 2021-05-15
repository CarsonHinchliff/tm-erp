import * as moment from 'moment';

var array = [10, 50, 100, 200];

function isObject(filter) {
    return !!filter && typeof(filter) == 'object';
}

function isDate(date){
    return date instanceof Date;
}

function transDate(filter, format = 'YYYY-MM-DD'){
    if(!isObject(filter)) return filter;

    Object.entries(filter).forEach((entry, index) => {
        var value = entry[1];
        if(isDate(value)){
            filter[entry[0]] = moment(value).format(format);
        }
    }); 
}

function getPageParam(size, page, filter){
    var param = {'page': page, 'size': size};
    if (isObject(filter)){
        transDate(filter);
        return Object.assign(param, filter);
    }
    return param;
}

export { array as gridPageArray, getPageParam }