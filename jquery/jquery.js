$(document).ready(function() {
    $("p").css("fontSize", "20px");
    $(".paragraph").css("color", "red");
    $(".anchor").css({
        "backgroundColor": "#F3F2F1",
        "textDecoration": "none"
    });
    $("form *").prop("disabled", true);


    $("a").prepend("↖");
    $("a").attr("target", "_blank");
    // изменить все ссылки http на https 
    // $("a").each((anchor) => {
    // 	let 
    // });
    //Добавить фиксированную кнопку (правый верхний угол) на страницу по
    // на которую что то происходит

    // эффекты
    $("#fadeOut").click(() => {
        $("#fadeOut").parent().siblings().children().fadeOut();
    });

    $("#fadeIn").click(() => {
        $("#fadeIn").parent().siblings().children().fadeIn();
    });

});
// AJAX Запросы в JQUERY

// http://jquery.page2page.ru/index.php5/Ajax-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81



$("#ajax").click(() => {
    $.ajax({
        url: "https://inxaoc.github.io/example/ajax-1.html"
    }).done((e) => {
        let pageContent = document.createElement("div");
        pageContent.innerHTML = e;
        $("body").append(pageContent);
    });
});



$.ajax({
    url: "https://inxaoc.github.io/example/ajax.json"
}).done((e) => {
    let req = Object.assign({}, e);
    console.log(req);
    $("body").append(isObject(req));
});



//prop - key, req[prop] - value
/*
1. Вызываем цикл
2. Если value - объект, то выводим key
	и далее начинаем перебирать его вложенные члены
3. Если value - не объект, то выводим value*/
function createList(element) {
	let ul = document.createElement('ul');
    for (const props in element) {
        let li = document.createElement('li');
        if (typeof(element[props]) !== 'object') {
            li.innerText = element[props];
        } else {
            li.innerText = props;
            // добавляет вложенный список в li
            li.append(isObject(element[props]));
        }
        ul.append(li);
    }
    return ul;
}
