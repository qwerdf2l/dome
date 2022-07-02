const data = [{
    name: '甘妮',
    age: 24,
    class: '五年级一班',
    chineseScore: 86,
    mathScore: 90,
    englishScore: 80
},
{
    name: '马鑫',
    age: 25,
    class: '五年级一班',
    chineseScore: 96,
    mathScore: 92,
    englishScore: 99
}];


var currentTr = null;//全局变量，保存当前编辑行的地址

function render(dataList) {
    //渲染数据列表方法，要在页面加载完之后才调用

    var _listTbody = document.querySelector('#table-list > tbody');
    var _subjectsAverage = document.getElementById('subjects-average');

    for (let index = 0; index < dataList.length; index++) {
        var _tr = document.createElement('tr');//生成tr元素节点
        var _obj = dataList[index];
        _tr.innerHTML = `
            <tr>
            <td><input type="checkbox" class="check-box" onchange=onSelect(this) /></td>
            <td>${_obj.name}</td>
            <td>${_obj.age}</td>
            <td>${_obj.class}</td>
            <td>
                <input type="button" value="-" class="button-style1" onclick=onSub(this) />
                <input type="text" value=${_obj.chineseScore} class="input-style1 chinese-score-value" maxLength=3
                    oninput=onInput(this) />
                <input type="button" value="+" class="button-style1" onclick=onAdd(this) />
            </td>
            <td>
                <input type="button" value="-" class="button-style1" onclick=onSub(this) />
                <input type="text" value=${_obj.mathScore} class="input-style1 math-score-value" maxLength=3
                    oninput=onInput(this) />
                <input type="button" value="+" class="button-style1" onclick=onAdd(this) />
            </td>
            <td>
                <input type="button" value="-" class="button-style1" onclick=onSub(this) />
                <input type="text" value=${_obj.englishScore} class="input-style1 english-score-value" maxLength=3
                    oninput=onInput(this) />
                <input type="button" value="+" class="button-style1" onclick=onAdd(this) />
            </td>
            <td><input type="text" class="single-average"></td>
            <td>
                <input type="button" value="删除" class="button-style2" onclick=onDel(this) />
            </td>
            </tr>
        `;

        _listTbody.insertBefore(_tr, _subjectsAverage);

    }

}

function getSingleAverage() {
    // 计算个人平均分，要在页面加载完之后才调用

    var _singleAverage = document.getElementsByClassName('single-average');
    for (let index = 0; index < _singleAverage.length; index++) {
        const element = _singleAverage[index];
        var _chineseScore = element.parentNode.parentNode.querySelector('.chinese-score-value').value * 1;
        var _mathScore = element.parentNode.parentNode.querySelector('.math-score-value').value * 1;
        var _englishScore = element.parentNode.parentNode.querySelector('.english-score-value').value * 1;

        element.value = ((_chineseScore + _mathScore + _englishScore) / 3).toFixed(2);
    }
}

function subjectAverage(scoreStr, resultStr) {
    // 计算各科目平均分
    // scoreStr: string - 科目成绩输入框的class值(class名称)
    // resultStr： string - 输出计算结果元素的id值(id名称)

    var _valueArr = document.getElementsByClassName(scoreStr);
    var _resultDom = document.getElementById(resultStr);

    if (_valueArr.length === 0) {
        _resultDom.innerText = '';
        return;
    }

    var _total = 0;
    for (let index = 0; index < _valueArr.length; index++) {
        const _value = _valueArr[index].value * 1;
        _total += _value;
    }
    _resultDom.innerText = (_total / _valueArr.length).toFixed(2);
}

function resetAverage() {
    // 重新计算平均分的方法

    getSingleAverage();
    subjectAverage('chinese-score-value', 'chinese-average');
    subjectAverage('math-score-value', 'math-average');
    subjectAverage('english-score-value', 'english-average');
    subjectAverage('single-average', 'total-average');
}

// 点击处理函数可以声明在 onload 外面
function onSub(target) {
    // 成绩递减的方法

    if (target.nextElementSibling.value * 1 === 0) {
        alert('成绩不能小于0');
        return;
    }
    target.nextElementSibling.value = target.nextElementSibling.value * 1 - 1;

    if (target.parentNode.parentNode.querySelector('.check-box').checked) {

        if (target.nextElementSibling.classList.contains('chinese-score-value')) {
            setModityFormValue('chinese', target.nextElementSibling.value);
        } else if (target.nextElementSibling.classList.contains('math-score-value')) {
            setModityFormValue('math', target.nextElementSibling.value);
        } else if (target.nextElementSibling.classList.contains('english-score-value')) {
            setModityFormValue('english', target.nextElementSibling.value);
        }
    }

    resetAverage();
}


function onAdd(target) {
    // 成绩递增的方法

    if (target.previousElementSibling.value * 1 === 100) {
        alert('成绩不能大于100');
        return;
    }

    target.previousElementSibling.value = target.previousElementSibling.value * 1 + 1;

    if (target.parentNode.parentNode.querySelector('.check-box').checked) {

        if (target.previousElementSibling.classList.contains('chinese-score-value')) {
            setModityFormValue('chinese', target.previousElementSibling.value);
        } else if (target.previousElementSibling.classList.contains('math-score-value')) {
            setModityFormValue('math', target.previousElementSibling.value);
        } else if (target.previousElementSibling.classList.contains('english-score-value')) {
            setModityFormValue('english', target.previousElementSibling.value);
        }
    }
    resetAverage();
}

function onInput(target) {
    //成绩输入框方法

    if (target.value * 1 > 100) {
        alert('成绩不能大于100');
        target.value = 100;
    }

    if (target.value * 1 < 0) {
        alert('成绩不能小于0');
        target.value = 0;
    }

    if (isNaN(target.value) || target.value === '') {
        return;
    }

    if (target.parentNode.parentNode.querySelector('.check-box').checked) {
        if (target.classList.contains('chinese-score-value')) {
            setModityFormValue('chinese', target.value);
        } else if (target.classList.contains('math-score-value')) {
            setModityFormValue('math', target.value);
        } else if (target.classList.contains('english-score-value')) {
            setModityFormValue('english', target.value);
        }
    }

    resetAverage();
}

function onDel(target) {
    //删除当前的记录方法

    var res = confirm('您确定要删除该条记录？')
    if (res) {
        var _listTbody = document.querySelector('#table-list > tbody');
        _listTbody.removeChild(target.parentNode.parentNode);
        resetAverage();
        clearInput();
    }
}

function onSelect(target) {

    var _modifyBtn = document.getElementById('modify-btn');
    var _status = target.checked;

    currentTr = target.parentNode.parentNode; //保存当前所编辑行的地址
    unSelect();

    if (_status) {
        // 当勾选当前行
        target.checked = true;
        _modifyBtn.value = '保存';
        setModityFormValue('name', currentTr.children[1].innerText);
        setModityFormValue('age', currentTr.children[2].innerText);
        setModityFormValue('class', currentTr.children[3].innerText);
        setModityFormValue('chinese', currentTr.children[4].querySelector('.chinese-score-value').value);
        setModityFormValue('math', currentTr.children[5].querySelector('.math-score-value').value);
        setModityFormValue('english', currentTr.children[6].querySelector('.english-score-value').value);
    } else {
        // 取消勾选
        target.checked = false;
        currentTr = null;
        _modifyBtn.value = '添加';
        clearInput();
    }
}

function clearInput() {
    // 清空所有编辑输入框的值
    setModityFormValue('name', '');
    setModityFormValue('age', '');
    setModityFormValue('class', '');
    setModityFormValue('chinese', '');
    setModityFormValue('math', '');
    setModityFormValue('english', '');
}

function getModifyFormValue(name) {
    //通过name属性值获取编辑框的值
    var _inputArry = document.querySelectorAll('#edit-table > tbody tr td > input');
    for (let index = 0; index < _inputArry.length; index++) {
        const element = _inputArry[index];
        if (element.name === name) {
            return element.value;
        }
    }
}

function setModityFormValue(name, value) {
    //通过name属性值设置输入框的值
    var _inputArry = document.querySelectorAll('#edit-table > tbody tr td > input');
    for (let index = 0; index < _inputArry.length; index++) {
        const element = _inputArry[index];
        if (element.name === name) {
            element.value = value;
        }
    }

}


function onModifySubmit(target) {
    // 提交修改内容按钮的事件

    if (getModifyFormValue('name') === '') {
        alert('请输入姓名');
        return;
    }
    if (getModifyFormValue('age') === '') {
        alert('请输入年龄');
        return;
    }
    if (getModifyFormValue('class') === '') {
        alert('请输入班级');
        return;
    }
    if (getModifyFormValue('chinese') === '') {
        alert('请输入请输入语文成绩');
        return;
    }
    if (getModifyFormValue('math') === '') {
        alert('请输入数学成绩');
        return;
    }
    if (getModifyFormValue('english') === '') {
        alert('请输入英语成绩');
        return;
    }

    if (isNaN(getModifyFormValue('age')) || getModifyFormValue('age') * 1 < 1 || getModifyFormValue('age') * 1 > 100) {
        alert('请输入正确的年龄');
        return;
    }
    if (isNaN(getModifyFormValue('chinese')) || getModifyFormValue('chinese') * 1 < 0 || getModifyFormValue('chinese') * 1 > 100) {
        alert('请输入正确的语文成绩');
        return;
    }

    if (isNaN(getModifyFormValue('math')) || getModifyFormValue('math') * 1 < 0 || getModifyFormValue('math') * 1 > 100) {
        alert('请输入正确的数学成绩');
        return;
    }
    if (isNaN(getModifyFormValue('english')) || getModifyFormValue('english') * 1 < 0 || getModifyFormValue('english') * 1 > 100) {
        alert('请输入正确的英语成绩');
        return;
    }

    if (target.value === '添加') {
        var _listTbody = document.querySelector('#table-list > tbody');
        var _subjectsAverage = document.getElementById('subjects-average');
        var _tr = document.createElement('tr');

        _tr.innerHTML = `
            <tr>
            <td><input type="checkbox" class="check-box" onchange=onSelect(this) /></td>
            <td>${getModifyFormValue('name')}</td>
            <td>${getModifyFormValue('age')}</td>
            <td>${getModifyFormValue('class')}</td>
            <td>
                <input type="button" value="-" class="button-style1" onclick=onSub(this) />
                <input type="text" value=${getModifyFormValue('chinese')} class="input-style1 chinese-score-value" maxLength=3
                    oninput=onInput(this) />
                <input type="button" value="+" class="button-style1" onclick=onAdd(this) />
            </td>
            <td>
                <input type="button" value="-" class="button-style1" onclick=onSub(this) />
                <input type="text" value=${getModifyFormValue('math')} class="input-style1 math-score-value" maxLength=3
                    oninput=onInput(this) />
                <input type="button" value="+" class="button-style1" onclick=onAdd(this) />
            </td>
            <td>
                <input type="button" value="-" class="button-style1" onclick=onSub(this) />
                <input type="text" value=${getModifyFormValue('english')} class="input-style1 english-score-value" maxLength=3
                    oninput=onInput(this) />
                <input type="button" value="+" class="button-style1" onclick=onAdd(this) />
            </td>
            <td><input type="text" class="single-average"></td>
            <td>
                <input type="button" value="删除" class="button-style2" onclick=onDel(this) />
            </td>
            </tr>
        `;
        _listTbody.insertBefore(_tr, _subjectsAverage);

    } else if (target.value === '保存') {

        currentTr.children[1].innerText = getModifyFormValue('name');
        currentTr.children[2].innerText = getModifyFormValue('age');
        currentTr.children[3].innerText = getModifyFormValue('class');
        currentTr.children[4].querySelector('.chinese-score-value').value = getModifyFormValue('chinese');
        currentTr.children[5].querySelector('.math-score-value').value = getModifyFormValue('math');
        currentTr.children[6].querySelector('.english-score-value').value = getModifyFormValue('english');

        target.value = '添加';
        unSelect();
    }
    clearInput();
    resetAverage();
}

function unSelect() {
    //取消所有的复选框选中

    var _boxArr = document.getElementsByClassName('check-box');
    for (let index = 0; index < _boxArr.length; index++) {
        const element = _boxArr[index];
        element.checked = false;
    }
}


window.onload = function () {
    // 当页面DOM元素加载完成时触发的方法

    render(data);
    resetAverage();
}