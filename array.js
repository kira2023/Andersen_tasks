function transformArray(arr) {
    var arr2 = [];
    function a(arr) {
        arr.forEach(function (item) {
            if (typeof item !== 'object') {
                arr2.push(item);
            } else a(item);
        })
    }
    a(arr);
    return arr2;
}

transformArray([1,2,3,[4,5,6,[7,8,9,[0]]]]);