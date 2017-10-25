

function init() {
    var arr,
        result = document.getElementById('result')
    document.getElementById('bubbleSort').onclick = function () {
        arr = [10, 3, 7, 12, 11, 30, 1, 23, 2]
        result.innerHTML += '冒泡排序结果：' + bubbleSort(arr) + '<br />'
        this.disabled = true
    }
    document.getElementById('selectionSort').onclick = function () {
        arr = [10, 3, 7, 12, 11, 30, 1, 23, 2]
        result.innerHTML += '选择排序结果：' + selectionSort(arr) + '<br />'
        this.disabled = true
    }
    document.getElementById('insertionSort').onclick = function () {
        arr = [10, 3, 7, 12, 11, 30, 1, 23, 2]
        result.innerHTML += '插入排序结果：' + insertionSort(arr) + '<br />'
        this.disabled = true
    }
    document.getElementById('quickSort').onclick = function () {
        arr = [10, 3, 7, 12, 11, 30, 1, 23, 2]
        result.innerHTML += '快速排序结果：' + quickSort(arr) + '<br />'
        this.disabled = true
    }
    document.getElementById('shellSort').onclick = function () {
        arr = [10, 3, 7, 12, 11, 30, 1, 23, 2]
        result.innerHTML += '希尔排序结果：' + shellSort(arr) + '<br />'
        this.disabled = true
    }
    document.getElementById('mergeSort').onclick = function () {
        arr = [10, 3, 7, 12, 11, 30, 1, 23, 2]
        result.innerHTML += '合并排序结果：' + mergeSort(arr) + '<br />'
        this.disabled = true
    }
    document.getElementById('heapSort').onclick = function () {
        arr = [10, 3, 7, 12, 11, 30, 1, 23, 2]
        result.innerHTML += '堆排序结果：' + heapSort(arr)
        this.disabled = true
    }
}
/*方法说明：堆排序
@param  array 待排序数组*/
function heapSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
        //建堆
        var heapSize = array.length, temp;
        for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
            heapify(array, i, heapSize);
        }

        //堆排序
        for (var j = heapSize - 1; j >= 1; j--) {
            temp = array[0];
            array[0] = array[j];
            array[j] = temp;
            heapify(array, 0, --heapSize);
        }
        return array;
    } else {
        return 'array is not an Array!';
    }
}
/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len) {
    if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
        var l = 2 * x + 1, r = 2 * x + 2, largest = x, temp;
        if (l < len && arr[l] > arr[largest]) {
            largest = l;
        }
        if (r < len && arr[r] > arr[largest]) {
            largest = r;
        }
        if (largest != x) {
            temp = arr[x];
            arr[x] = arr[largest];
            arr[largest] = temp;
            heapify(arr, largest, len);
        }
    } else {
        return 'arr is not an Array or x is not a number!';
    }
}

function mergeSort(arr) {
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left, right);
}

function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while (gap < len / 5) {          //动态定义间隔序列
        gap = gap * 5 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}

function quickSort(arr) {
    //如果数组长度小于等于1无需判断直接返回即可  
    if (arr.length <= 1) {
        return arr;
    }
    var midIndex = Math.floor(arr.length / 2);//取基准点  
    var midIndexVal = arr.splice(midIndex, 1);//取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数arr[index+1]  
    var left = [];//存放比基准点小的数组  
    var right = [];//存放比基准点大的数组  
    //遍历数组，进行判断分配  
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < midIndexVal) {
            left.push(arr[i]);//比基准点小的放在左边数组  
        }
        else {
            right.push(arr[i]);//比基准点大的放在右边数组  
        }
    }
    //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1；  
    return quickSort(left).concat(midIndexVal, quickSort(right));
};

function insertionSort(data) {
    for (var i = 0; i < data.length; i++) {
        for (var j = i - 1; j >= 0; j--) {
            if (data[j + 1] < data[j]) {
                var temp = data[j + 1]
                data[j + 1] = data[j]
                data[j] = temp
            }
        }
    }
    return data
}

function selectionSort(data) {
    for (var i = 0; i < data.length - 1; i++) {
        var minIndex = i;
        for (var j = i + 1; j < data.length; j++) {
            if (data[j] < data[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            var temp = data[i]
            data[i] = data[minIndex]
            data[minIndex] = temp
        }
    }
    return data
}

function bubbleSort(data) {
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data.length - i; j++) {
            if (Number(data[j]) > Number(data[j + 1])) {
                var temp;
                temp = data[j]
                data[j] = data[j + 1]
                data[j + 1] = temp
            }
        }
    }
    return data
}