"use strict";

var form = document.createElement('form'),
    input = document.createElement('input'),
    label = document.createElement('label'),
    button = document.createElement('button')
    ;


input.type = 'text';
input.id = 'cols';

label.innerText = 'Количество столбцов';
label.htmlFor = 'cols';
form.appendChild(label);
form.appendChild(input);

input = document.createElement('input');

button.type = 'button';
button.innerText = 'тест';
button.onclick = () => console.log(document.getElementById('cols').value);
form.appendChild(button);
document.body.appendChild(form);






