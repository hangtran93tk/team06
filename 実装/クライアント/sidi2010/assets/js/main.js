/* menu button */
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
  
    // メニュークリックされたら消す処理
    menu.querySelector('ul').childNodes.forEach(function(item){
        item.addEventListener('click', function(){
            // 消す
            menu.classList.remove('active');
            btnImg.setAttribute('src', './assets/img/hamburger_menu.png');
        });
    });
  })();
//   img_register() {
//     const btnImgRegis = document.querySelector('.btn-left');
//     const selectPhoto = document.querySelector('#select-photo');

//     btnImgRegis.addEventListener('click', function() {
//         if ( selectPhoto.classList.contains('active') ) {
//             // 消す
//             menu.classList.remove('active');
    
  
//         // class="active" がなかったら
//         } else {
//             // 追加
//             selectPhoto.classList.add('active');
            
//         }
//     });
//   }
  
  