"use strict";


// 2
var form = document.createElement('form'),
    inputCols = document.createElement('input'),
    inputRows = document.createElement('input'),
    labelCols = document.createElement('label'),
    labelRows = document.createElement('label'),
    button = document.createElement('button')
    ;


inputCols.type = 'text';
inputCols.id = 'cols';
inputCols.style.display = 'block';

labelCols.innerText = 'Количество столбцов';
labelCols.htmlFor = 'cols';
labelCols.style.display = 'block';

inputRows.type = 'text';
inputRows.id = 'rows';
inputRows.style.display = 'block';

labelRows.innerText = 'Количество строк';
labelRows.htmlFor = 'rows';
labelRows.style.display = 'block';

button.type = 'button';
button.innerText = 'тест';
button.style.marginTop = '5px';


// По нажатию на кнопку создается таблица (страница не перезагружается). Форму создания таблицы спрятать
button.onclick = () => {
    form.style.display = 'none';
    createTable(
        document.getElementById('cols').value,
        document.getElementById('rows').value,
    );
    createFunctionPanel();
    form.reset();
};

form.append(labelCols, inputCols,
            labelRows, inputRows, button);
document.body.appendChild(form);

function createTable(cols, rows) {
    let table = document.createElement('table');
    table.style.borderCollapse = 'collapse';

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = createTableCell();
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

function createTableCell() {
    let td = document.createElement('td');
    td.style.minWidth = '100px';
    td.style.height = '30px';
    td.style.border = '1px solid black';
    td.onmousemove = () => td.style.backgroundColor = '#cecece';
    td.onmouseout = () => td.style.backgroundColor = 'white';
    td.appendChild(createTableCellContent(td));
    return td;
}

// 3
function createTableCellContent(td) {
    td.innerHTML = '';
    let form = document.createElement('form'),
        textarea = document.createElement('textarea'),
        button = document.createElement('button')
    ;
    button.innerText = 'Сохранить';
    button.type = 'button';
    button.style.display = 'block';
    textarea.cols = 20;
    textarea.rows = 1;
    // После нажатия на «сохранить», эта форма пропадает, а вместо нее появляется введенный пользователем текст.
    button.onclick = () => {
        td.innerText = button.previousSibling.value;
        form.remove();
    };

    form.appendChild(textarea);
    form.appendChild(button);
    return form;
}

// 4. Оформление блока с функцией
function createFunctionPanel() {
    let divWrapper = document.createElement('div');
    divWrapper.className = 'function_container';
    divWrapper.append(borderChanger(),
        captionChanger(),
        rowDeleter(),
        divRandomContentCreator(),
        tableDeleter());
    document.body.appendChild(divWrapper);
}

function createFunction(functionName) {
    let div = document.createElement('div'),
        p = document.createElement('p')
    ;
    p.innerText = functionName;
    div.className = 'function';
    div.appendChild(p);
    return div;
}

// 5. добавить элемент “Изменить границы таблицы”
function borderChanger() {
    let div = createFunction('Изменить границы таблицы');

    let form = document.createElement('form'),
        select = document.createElement('select'),
        inputBorderWidth = document.createElement('input'),
        button = document.createElement('button'),
        option = document.createElement('option')
    ;

    inputBorderWidth.type = 'text';

    button.type = 'button';
    button.innerText = 'Применить';

    option.innerText = 'Выберите стиль рамки';
    option.disabled = true;
    option.selected = true;
    select.appendChild(option);

    getBorderOptions().forEach((option) => select.appendChild(option));

    inputBorderWidth.oninput = () => {
        button.innerText = 'Применить' + ' ' + inputBorderWidth.value + ' px ';
        if (select.value !== '' && select.value !== 'Выберите стиль рамки') {
            button.innerText += ' и рамка ' + select.value;
        }
    };

    select.onchange = () => {
        if (inputBorderWidth.value !== '') {
            button.innerText = button.innerText = 'Применить' + ' ' + inputBorderWidth.value + ' px ' +
                'и рамка ' + select.value;
        } else {
            button.innerText = 'Применить' + ' ' + 'рамка ' + select.value;
        }
    };

    button.onclick = () => {
        let tdList = document.querySelectorAll('td');
        tdList.forEach((td) =>
            td.style.border = `${inputBorderWidth.value}px ${select.value}`
        );
    };

    form.append(select, inputBorderWidth, button);
    div.appendChild(form);
    return div;
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
function captionChanger() {
    let div = createFunction('Добавить заголовок');
    let form = document.createElement('form'),
        inputElement = document.createElement('input'),
        button = document.createElement('button')
    ;

    inputElement.type = 'text';
    button.type = 'button';
    button.innerText = 'Добавить';

    // После нажатия у таблицы появляется заголовок.
    button.onclick = () => {
        let caption = document.createElement('caption');
        caption.innerText = inputElement.value;
        document.querySelector('table').appendChild(caption);

    };

    form.append(inputElement, button);
    div.appendChild(form);
    return div;
}

// 7. добавить элемент “Удалить строку”
function rowDeleter() {
    let div = createFunction('Удалить строку');
    let form = document.createElement('form'),
        inputElement = document.createElement('input'),
        button = document.createElement('button')
    ;

    inputElement.type = 'text';
    button.type = 'button';
    button.innerText = 'Удалить';

    button.onclick = () => {
        let tableRows = document.querySelectorAll('tr');
        if (inputElement.value < 1 || inputElement.value > tableRows.length
            || inputElement.value.match(/([^0-9])/g)) {
            alert('Некорректное число! Попробуйте еще раз.');
        } else {
            tableRows[inputElement.value - 1].remove();
        }
    };

    form.append(inputElement, button);
    div.appendChild(form);
    return div;
}

// 8. добавить элемент “Случайный выбор”
function divRandomContentCreator() {
    let div = createFunction('Случайный выбор');
    let button = document.createElement('button')
    ;

    button.type = 'button';
    button.innerText = 'Magic';

    button.onclick = () => {
        let td = chooseRandomTableDataCell();
        magic(td);
    };
    div.appendChild(button);
    return div;
}

function chooseRandomTableDataCell() {
    let tableRowList = document.querySelectorAll('tr');
    let tableRowIndex = randomInteger(0, tableRowList.length - 1);
    let tableDataCellIndex = randomInteger(0, tableRowList[tableRowIndex].cells.length - 1);
    return tableRowList[tableRowIndex].cells[tableDataCellIndex];
}

function magic(td) {
    if (randomInteger(1, 15) === 7) {
        td.appendChild(createTableCellContent(td));
    } else {
        chooseRandomBgColor(td);
        chooseRandomFontStyle(td);
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
    if (typeof td.childNodes[0] !== 'undefined') {
        td.childNodes[0].childNodes.forEach((elem) => {
            elem.style.color = newColor;
            elem.style.fontSize = newFontSize;
        });
    }
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

// 9. добавить элемент “Удалить”
function tableDeleter() {
    let div = createFunction('Удалить');
    let button = document.createElement('button')
    ;

    button.type = 'button';
    button.innerText = 'Удалить таблицу';

    button.onclick = () => {
        form.style.display = 'block';
        document.querySelector('table').remove();
        document.querySelector('div.function_container').remove();

    };
    div.appendChild(button);
    return div;
}




