
$(window).on('load', function(){
    if (!isParamsCorrect(hrefQueryParams)) {
        $('#alert').attr("class", "alert alert-warning alert-dismissible fade show");
    } else {
        // createFunctionPanel();
        createTable(
            hrefQueryParams.cols,
            hrefQueryParams.rows,
        );
    }
});

var hrefQueryParams = getQueryParams(document.location.href);
console.log(hrefQueryParams);

function getQueryParams(href) {
    let queryParams = {};
    href.substring(href.indexOf('?') + 1, href.length).split('&')
        .forEach(param => {
            const paramKeyValue = param.split('=');
            queryParams[paramKeyValue[0]] = paramKeyValue[1];
        });
    return queryParams;
}

function isParamsCorrect(queryParams) {
    return queryParams.length !== 0 &&
        Object.values(queryParams).every((param) => param != '' && Number.isInteger(+param) && param > 0);
}

function createTable(cols, rows) {
    let div = document.createElement('div'),
        caption = document.createElement('caption'),
    table = document.createElement('table');
    table.className = 'table-bordered table-sm';
    div.className = 'table-responsive';
    caption.innerText = 'Без названия';
    table.appendChild(caption);
    // + 1 к строкам и столбцам, т.к. добавились служебные поля
    for (let i = 0; i < +rows + 1; i++) {
        let tr = document.createElement('tr');
        if (i === 0) {
            tr.className = 'table-secondary';
            for (let j = 0; j < +cols + 1; j++) {
                let td = document.createElement('td');
                td.innerText = (j === 0) ? ' ' : getLetterById(j-1);
                tr.append(td);
            }
        } else {
            for (let j = 0; j < +cols + 1; j++) {
                let td = createTableCell(i, j);
                tr.append(td);
            }
        }
        table.append(tr);
    }
    div.append(table);
    document.querySelector('main').appendChild(div);
}

function createTableCell(rowIndex, columnIndex) {
    let td = document.createElement('td');
    // td.onmousemove = () => td.style.backgroundColor = '#cecece';
    // td.onmouseout = () => td.style.backgroundColor = 'white';
    if (columnIndex === 0) {
        td.innerText = getNumberById(rowIndex-1);
        td.className = 'table-secondary';
        td.style.padding = '.3rem 1rem .3rem 1rem';
    } else {
        td.append(createTableCellContent(td));
    }
    return td;
}

// 3
function createTableCellContent(td, previousValue) {

    let form = document.createElement('form'),
        textarea = document.createElement('textarea'),
        button = document.createElement('button'),
        divForm = document.createElement('div')
    ;

    divForm.className = 'form-group';
    button.innerHTML = '<span class="material-icons">' +
        'save' +
        '</span>';
    button.className = 'btn btn-success';
    textarea.className = 'form-control-sm mr-2';
    if (previousValue !== undefined) {
        textarea.value = previousValue;
    }
    td.innerHTML = '';
    // После нажатия на «сохранить», эта форма пропадает, а вместо нее появляется введенный пользователем текст.
    button.onclick = () => {
        let div = document.createElement('div');
        div.style.height = '60px';
        div.innerText = textarea.value;
        div.onclick = () => {
            td.append(createTableCellContent(td, div.innerText));
        };
        divForm.remove();
        td.append(div);
        let buttonDelete = document.createElement('button');
        buttonDelete.type = 'button';
        buttonDelete.innerHTML = '<span class="material-icons">' +
            'delete' +
            '</span>';
        buttonDelete.className = 'btn btn-danger';
        buttonDelete.onclick = () => td.append(createTableCellContent(td));
        td.append(buttonDelete);
    };

    form.className = 'form-inline';
    form.append(textarea, button);
    divForm.append(form);
    return divForm;
}

function getLetterById(id) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
        'W', 'X', 'Y', 'Z'][id];

}

function getNumberById(id) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0][id];
}


function changeBorders() {
    let selectElement = document.getElementById('select');
    let inputElement = selectElement.nextElementSibling;
    let tdList = document.querySelectorAll('td');
    if (Number.isInteger(+inputElement.value)) {
    tdList.forEach((td) =>
        td.style.border = `${inputElement.value}px ${selectElement.value}`
    );
    } else {
        $('#myModal').modal('show');
    }
}

function onInputChanged(inputElement) {
    let select = inputElement.previousElementSibling;
    let button = inputElement.nextElementSibling;
    if (inputElement.value.length === 0) {
        if (select.value !== '' && select.value !== 'Выберите стиль рамки' && (typeof select.value) !== "undefined") {
            button.innerText = 'Применить' + ' ' + 'рамка ' + select.value;
        } else {
            button.innerText = 'Применить';
        }
    } else {
        button.innerText = 'Применить' + ' ' + inputElement.value + ' px ';
        if (select.value !== '' && select.value !== 'Выберите стиль рамки' && (typeof select.value) !== "undefined") {
            button.innerText += ' и рамка ' + select.value;
        }
    }
}

function onSelectChanged(selectElement) {
    let inputElement = selectElement.nextElementSibling;
    let button = inputElement.nextElementSibling;
    if (inputElement.value.length !== 0) {
        button.innerText = 'Применить' + ' ' + inputElement.value + ' px ';
        button.innerText = button.innerText = 'Применить' + ' ' + inputElement.value + ' px ';
        if (selectElement.value !== '' && selectElement.value !== 'Выберите стиль рамки') {
            button.innerText += ' и рамка ' + selectElement.value;
        }
    } else {
        button.innerText = 'Применить' + ' ' + 'рамка ' + selectElement.value;
    }
}


// 5. добавить элемент “Изменить границы таблицы”
createSelectElementContent();

function createSelectElementContent() {
    let selectElement = document.getElementById('select');
    getBorderOptions().forEach((option) => selectElement.append(option));
}

function getBorderOptions() {
    let borderOptions = [];
    ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'].forEach(
        (borderStyle) => {
            let option = document.createElement('option');
            option.innerText = borderStyle;
            borderOptions.push(option);
        }
    );
    return borderOptions;
}

// 6. добавить элемент “Добавить заголовок”.
function changeCaption() {
    let inputElement = document.getElementById('add');
    let caption = document.getElementsByTagName('caption')[0];
    caption.innerText = inputElement.value;
    document.querySelector('table').prepend(caption);
}


// 7. добавить элемент “Удалить строку”
function deleteRow() {
    let inputElement = document.getElementById('delete');
    let tableRows = document.querySelectorAll('tr');
    if (inputElement.value < 1 || inputElement.value > tableRows.length
        || inputElement.value.match(/([^0-9])/g)) {
        alert('Некорректное число! Попробуйте еще раз.');
    } else {
        /*После того как удаляем столбец, он не исчезает,
         поэтому нужно пробежать по всем строкам после удаленной
         и изменить буквы в 0 строке*/
        tableRows[inputElement.value].remove();
        for (let i = +inputElement.value; i < tableRows.length; i++) {
            tableRows[i].cells[0].innerText -= 1;
        }
    }
}

// Добавление - функция удаления столбца
/*нужно пробежаться по всем строкам и удалить клетки с позицией inputElement.value*/
function deleteRow() {
    let inputElement = document.getElementById('deleteCol');
    let tableRows = document.querySelectorAll('tr');
    if (inputElement.value < 1 || inputElement.value > tableRows[0].cells.length
        || inputElement.value.match(/([^0-9])/g)) {
        alert('Некорректное число! Попробуйте еще раз.');
    } else {
        /*После того как удаляем строку, она не исчезает,
         поэтому нужно пробежать по всем строкам после удаленной
         и уменьшить позицию на один*/
        tableRows[inputElement.value].remove();
        for (let i = +inputElement.value; i < tableRows.length; i++) {
            tableRows[i].cells[0].innerText -= 1;
        }
    }
}


// 8. добавить элемент “Случайный выбор”
function magic() {
    let td = chooseRandomTableDataCell();
    if (randomInteger(1, 15) === 7) {
        td.appendChild(createTableCellContent(td));
    } else {
        chooseRandomBgColor(td);
        chooseRandomFontStyle(td);
    }
}

function chooseRandomTableDataCell() {
    let tableRowList = document.querySelectorAll('tr');
    let tableRowIndex = randomInteger(1, tableRowList.length - 1);
    let tableDataCellIndex = randomInteger(1, tableRowList[tableRowIndex].cells.length - 1);
    return tableRowList[tableRowIndex].cells[tableDataCellIndex];
}

function chooseRandomBgColor(td) {
    td.style.backgroundColor = setRandomColor();
}

function chooseRandomFontStyle(td) {
    let newColor = setRandomColor();
    let newFontSize = randomInteger(15, 25) + 'pt';
    td.style.color = newColor;
    td.style.fontSize = newFontSize;
    /* если форма есть, то для каждого её внутреннего
    тега задаем стиль
    */
    if (td.childNodes[0].nodeName === 'form') {
        td.childNodes[0].childNodes.forEach((elem) => {
            elem.style.color = newColor;
            elem.style.fontSize = newFontSize;
        });
    }
}

function setRandomColor() {
    let hexTable = "0123456789ABCDEF";
    let newColor = '#';
    for (let i = 0; i < 6; i++) {
        newColor += hexTable[randomInteger(0, hexTable.length - 1)];
    }
    console.log(newColor);
    return newColor;
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

// 9. добавить элемент “Удалить”
function cleanTable() {
    //очищаем формы
    let forms = document.getElementsByClassName('form-inline');
    for (let form of forms) {
        form.reset();
    }
    //меняем текст на форму
    let tableRowList = document.querySelectorAll('tr');
    for (let i = 1; i < tableRowList.length; i++) {
        for (let j = 1; j < tableRowList[i].cells.length; j++) {
            let currentTableCell = tableRowList[i].cells[j];
            if (currentTableCell.childNodes[0].nodeName !== 'form') {
                currentTableCell.append(createTableCellContent(currentTableCell));
            }
        }
    }
}
