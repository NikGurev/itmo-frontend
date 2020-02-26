"use strict";

// 1. document.write, работа c URL и строками
let docWrite = document.write("hello world"); // 1.1
let text = document.body.innerText;
document.write("<br/>");
document.writeln(text.split(" ").length, ' ', text.split(" ").join("").length); // 1.2
document.write("<br/>");


let hrefLocal = document.location.href;
let hrefInternet = "https://fb.ru/misc/i/gallery/60199/2990961.jpg";
let hrefWithQueryParams = "https://vk.com/audiosQueryParams?section=all&playlistId=1"
let hrefLocalInfo = getHrefInfo(hrefLocal);
let hrefInternetInfo = getHrefInfo(hrefInternet);

document.write(hrefLocal);
document.write("<br/>");
document.write(hrefLocalInfo.protocol, ' ', hrefInternetInfo.protocol); // 1.5
document.write("<br/>");
document.write(hrefLocalInfo.fileExtension, ' ', hrefInternetInfo.fileExtension); // 1.5
document.write("<br/>");
console.log(getQueryParams(hrefWithQueryParams)); // 6


function getHrefInfo(href) {
    let newHref = {
        protocol: href.substring(0, href.indexOf(':')),
        fileExtension: href.substring(href.lastIndexOf('.') + 1, href.length)
    };
    return newHref;
}

function getQueryParams(href) {
    let queryParams = {};
    href.substring(href.indexOf('?') + 1, href.length).split('&')
    .forEach(param => {
        const paramKeyValue = param.split('=');
        queryParams[paramKeyValue[0]] = paramKeyValue[1];
    });
    return queryParams;

}

// 2. Основные тэги
let secondSection = document.createElement("h1");
secondSection.innerText = "2. Основные теги в документе (Через js)";
document.body.append(secondSection);
let anchorHref = "https://developer.mozilla.org/ru/docs/Web/JavaScript";

// 2.1

console.log('Количество anchors в html: ',
    document.body.getElementsByTagName('a').length);
for (let i = 0; i < 4; i++) {
    let anchor = (document.createElement('a'));
    anchor.href = anchorHref.concat(`/${i}`);
    anchor.innerText = `Ссылка ${i+1}`;
    anchor.style.marginRight = '5px';
    document.body.append(anchor);
}

// 2.3
document.write('<br/>');
for (let i = 0; i < 2; i++) {
    let img = (document.createElement('img'));
    img.id = `value ${i+1}`;
    img.src = "https://im0-tub-ru.yandex.net/i?id=4fd7ede5016e1edec7ba128f2537251d&n=13";
    img.style.height = 30 + i * 10 + 'px';
    img.alt = `Ссылка ${i+1}`;
    img.style.marginRight = '5px';
    document.body.append(img);
}

// 2.4

document.write('<br/>');
document.write('Количество anchors равно ' + document.body.getElementsByTagName('a').length);
console.log('Количество anchors через JS '+ document.body.getElementsByTagName('a').length);
// 2.5
document.write('<br/>');
document.write('Количество link-ов равно ',
    document.getElementsByTagName('link').length);
console.log('Количество link-ов в html: ',
    document.getElementsByTagName('link').length);
// 2.6
document.write('<br/>');
document.write(document.body.getElementsByTagName('a').item(0).innerText);

// 2.7
document.write('<br/>');
document.write('Количество картинок ' + document.body.getElementsByTagName('img').length);

// 2.8
document.write('<br/>');
document.write('Ширина первой картинки '.concat(document.body.getElementsByTagName('img').item(0).width));

// 2.9
let images = document.querySelectorAll('img');
let maxWidth = images[0].width;
images.forEach((img) => {
    if (img.width > maxWidth) {
        maxWidth = img.width;
    }
});

document.write('<br/>');
document.write("ширина самой широкой картинки равна ", maxWidth);
console.log("ширина самой широкой картинки равна ", maxWidth);

// 2.10
let imagesHeightSum = 0;
images.forEach((img) => {
    imagesHeightSum += img.height;
});
document.write('<br/>');
document.write("Сумма высот картинкок равна ", imagesHeightSum);
console.log("Сумма высот картинкок равна ", imagesHeightSum);

// 3. Основные тэги
let thirdSection = document.createElement("h1");
thirdSection.innerText = "3. Формы";
document.body.append(thirdSection);

// 3.1

let forms = [];
for (let i = 0; i < 12; i++) {
    let form = document.createElement('form');
    form.name = `formName${i+1}`;
    form.id = `formValue${i+1}`;
    forms.push(form);
    document.body.append(form);
}

// 3.2
let evenFormsNames = forms.filter((form) => form.id.substring(9, form.id.length) % 2 == 0)
    .map((evenForm) => evenForm.id).join(', ');

document.write(evenFormsNames);
console.log(evenFormsNames);

// 3.3
let formsHTML = document.body.getElementsByTagName('form');
console.log(formsHTML);
for (let i = 0; i < formsHTML.length ; i++) {
    let inputText = document.createElement('input');
    let inputPass = document.createElement('input');
    let inputRadio = document.createElement('input');
    inputText.type = "text";
    inputText.style.margin = "5px";
    inputPass.type = "password";
    inputPass.style.margin = "5px";
    inputRadio.type = "radio";
    inputRadio.style.margin = "5px";
    formsHTML[i].appendChild(inputText);
    formsHTML[i].appendChild(inputPass);
    formsHTML[i].appendChild(inputRadio);
}

// 3.4
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'button';
    button.innerText = "Показать имя формы";
    button.style.margin = "5px";
    button.onclick = () => alert(button.innerText);
    formsHTML[i].appendChild(button);
}

// 3.5
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'button';
    button.innerText = "Принадлежность";
    button.style.margin = "5px";
    button.onclick = () => alert(button.parentNode.id);
    formsHTML[i].appendChild(button);
}

// 3.6
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'reset';
    button.innerText = "Сбросить";
    button.style.margin = "5px";
    formsHTML[i].appendChild(button);
}

// 3.7
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'button';
    button.innerText = "Показать количество полей";
    button.style.margin = "5px";
    button.onclick = () => {
        alert(`Количество полей равно ${button.parentNode.childNodes.length}`);
    };
    formsHTML[i].appendChild(button);
}

// 3.8
document.body.querySelectorAll('button').forEach((button)=> {
    button.style.padding = '15px';
    button.style.borderRadius = '10px';
    button.style.border = '1px solid rgba(121, 121, 119, 4)';
    button.style.cursor = 'pointer';
    button.onmouseover = () => {
        button.style.backgroundColor = '#b895fb';
        button.style.color = "white";
    };
    button.onmouseout = () => {
        button.style.color = 'black';
        button.style.backgroundColor = '#f0f0f0';
    };
    let image = document.createElement('img');
   image.style.width = '20px';
    image.style.height = '20px';
    image.style.verticalAlign = 'bottom';
    switch (button.innerText) {
        case "Показать имя формы": image.src = 'icons/имя.png';
            break;
        case "Принадлежность":image.src = 'icons/принадлежность.png';
            break;
        case "Сбросить": image.src = 'icons/сбросить.png';
            break;
        case "Показать количество полей": image.src = 'icons/количество.png';
            break;
        default:
            image.src = 'icons/количество.png';
    }
    button.prepend(image);
});

// 4. Доп. задание
let sectionFour = document.createElement("h1");
sectionFour.innerText = "4. Доп. задание";
document.body.append(sectionFour);

// 4.1
let anchors = [];
for (let i = 0; i < 16; i++) {
    let anchor = document.createElement('a');
    anchor.style.marginRight = '5px';
    switch (true) {
        case (i % 5 === 0):
            anchor.href = 'https://isu.ifmo.ru';
        anchor.innerText = 'ИСУ ИТМО';
        break;
        case (i % 6 === 0):
            anchor.href = 'https://www.facebook.com/';
            anchor.innerText = 'Facebook';
        break;
        case (i % 4 === 0):
            anchor.href = 'https://itmo.ru/';
            anchor.innerText = 'ИТМО';
        break;
        case (i % 3 === 0):
            anchor.href = 'https://iml.ru/';
            anchor.innerText = 'IML';
        break;
        default:
            anchor.href = 'https://www.google.com/';
            anchor.innerText = 'Google';
    }

    document.body.append(anchor);
    anchors.push(anchor);
}

// 4.2
let table = document.createElement('table');
table.border = '1';
table.style.borderCollapse = 'collapse';
table.cellPadding = '5';
anchors.forEach((anchor, index) => {
    if (!anchors.slice(0, index).some((nextAnchor) => anchor.innerText === nextAnchor.innerText)) {
    let row = document.createElement('tr');
    let text = document.createElement('td');
    let count = document.createElement('td');
    let href = document.createElement('td');
    text.innerText = anchor.innerText;
    count.innerText = anchors.filter((anchorInner) => anchor.innerText == anchorInner.innerText).length;
    href.innerText = anchor.href;
    row.appendChild(text);
    row.appendChild(count);
    row.appendChild(href);
    table.appendChild(row);
    }
});
document.body.append(table);







