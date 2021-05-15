
var array = [50, 100, 200];

function getPageParam(size, page){
    return {'page': page, 'size': size};
}

export { array as gridPageArray, getPageParam }