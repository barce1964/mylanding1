$(document).ready(function(){
    $('.header').height($(window).height());
   
    $(".navbar a").click(function(){
        $("body,html").animate({
            scrollTop:$("#" + $(this).data('value')).offset().top
        },1000)
    })
   
    $(".contact-link button").click(function(){
        console.log('test');
        $("body,html").animate({
            scrollTop:$("#" + $(this).data('value')).offset().top
        },1000)
    })

})

new WOW().init();

const menu = document.querySelector('.menu'),
menuItem = document.querySelectorAll('.menu-item'),
hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('menu_active');
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    })
})

var tab = document.querySelectorAll('.info-header-tab-srv'),
    info = document.querySelector('.info-header-srv'),
    tabContent = document.querySelectorAll('.description-srv');

function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('info-header-tab-active-srv');
    }
}

hideTabContent(1);

function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tab[b].classList.add('info-header-tab-active-srv');
        var h;
        if (b == 0) {
            h = '100vh';
        } else if (b == 1) {
            h = '68vh';
        } else if (b == 2) {
            h = '81vh';
        } else if (b == 3) {
            h = '72vh';
        } else {
            h = '81vh';
        }
        $(".info-section").animate({height: h}, 1500 );
    }
}

info.addEventListener('click', function(event) {
    var target = event.target;
    if (target && target.classList.contains('info-header-tab-srv')) {
        for(var i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                hideTabContent(0);
                showTabContent(i);
                break;
            }
        }
    }
});

var owl = $('#slider');
owl.owlCarousel({
    margin: 10,
    loop: true,
    nav: true,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        1900: {
            items: 2
        },
        3600: {
            items: 3
        },
        5500: {
            items: 4
        },
        7400: {
            items: 5
        },
        9300: {
            items: 6
        }
    },
    navText: [
        '<svg width="35" height="20" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>',
        '<svg width="35" height="20" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>'
      ]
})

async function submitForm(event) {
    event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
    try {
    // Формируем запрос
        const response = await fetch(event.target.action, {
            method: 'POST',
            body: new FormData(event.target)
        });
        // проверяем, что ответ есть
        if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
        // проверяем, что ответ действительно JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw ('Ошибка обработки. Ответ не JSON');
        }
        // обрабатываем запрос
        const json = await response.json();
        if (json.result === "success") {
            // в случае успеха
            alert(json.info);

            var inpt = document.querySelectorAll('.input-frm');
            for(var i = 0; i < inpt.length; i++) {
                inpt[i].value = '';
            }

            var btn = document.getElementById('btn-frm');
            btn.setAttribute('disabled', 'disabled');
        } else { 
            // в случае ошибки
            console.log(json);
            throw (json.info);
        }
    } catch (error) { // обработка ошибки
        alert(error);
    }
}

function testName() {
    var myName = document.getElementById('name-frm').value;
    if (myName != '') {
        return true;
    } else {
        return false;
    }
}

function testMail() {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var myMail = document.getElementById('email-frm').value;
    var valid = re.test(myMail);
    return valid;
}
 
function testPhone() {
    var re = /^[\+][\d]{10}\d$/;
    var myPhone = document.getElementById('phone-frm').value;
    var valid = re.test(myPhone);
    return valid;
}  

function testInput() {
    if (testName() && testMail() && testPhone()) {
        var btn = document.getElementById('btn-frm');
        btn.removeAttribute('disabled');
    } else {
        var btn = document.getElementById('btn-frm');
        btn.setAttribute('disabled', 'disabled');
    }
}

// const menu = document.querySelector('.navbar-nav'),
//     menuItem = document.querySelectorAll('.nav-item'),
//     hamburger = document.querySelector('.hamburger');

//     hamburger.addEventListener('click', () => {
//         hamburger.classList.toggle('hamburger_active');
//         menu.classList.toggle('menu_active');
//     });

//     menuItem.forEach(item => {
//         item.addEventListener('click', () => {
//             hamburger.classList.toggle('hamburger_active');
//             menu.classList.toggle('menu_active');
//         })
//     })
