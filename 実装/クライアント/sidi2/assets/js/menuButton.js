(function() {
    "use strict";

    const btnMenu = document.querySelector('#btn-menu');
    const btnImg = btnMenu.querySelector('img');
    const menu = document.querySelector('#menu');

    btnMenu.addEventListener('click', function() {
        // class="active" があったら
        if ( menu.classList.contains('active') ) {
            // 消す
            menu.classList.remove('active');
            btnImg.setAttribute('src', './assets/img/hamburger_menu.png');

        // class="active" がなかったら
        } else {
            // 追加
            menu.classList.add('active');
            btnImg.setAttribute('src', './assets/img/close.png');
        }
    });

    // $(".btn-menu-head").click(function(){
    //     var data = parseInt($(this).attr('data-status'));
    //     console.log("test" + data);
    //     if(data === 1){
    //         $(this).addClass('close');
    //         $(this).attr('data-status',0);
    //     }
    //     else{
    //         $(this).remove('close');
    //         $(this).attr('data-status',1);
    //     }

    // })

    // メニュークリックされたら消す処理
    menu.querySelector('ul').childNodes.forEach(function(item){
        item.addEventListener('click', function(){
            // 消す
            menu.classList.remove('active');
            btnImg.setAttribute('src', './assets/img/hamburger_menu.png');
        });
    });
})();