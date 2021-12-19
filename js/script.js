window.addEventListener('load', () => {


    /*ТАбы*/
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabcontent = document.querySelectorAll('.tabcontent');

    tabs.forEach((item, index) => {
        item.addEventListener('click', () => {
            //active class add or remove
            tabs.forEach(el => { el.classList.remove('tabheader__item_active') });
            item.classList.add('tabheader__item_active')
            //---------- add showe or hide tab 
            if (tabcontent[index].classList.contains('hide')) {
                tabcontent.forEach(el => el.classList.add('hide'));
                tabcontent[index].classList.remove('hide')
            }

        })
    });


    /*таймер*/

    const deadline = '2022-05-11';

    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            total: t,
            days,
            hours,
            minutes,
            seconds,

        }
    }

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInteval = setInterval(updateClock, 1000);
        updateClock()
        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInteval);
            }

        }

    }

    setClock('.timer', deadline)




    /* modal*/

    const modal = document.querySelector('.modal'),
        btnOpenModal = document.querySelectorAll('[data-modal]');

    const openModal = () => {
        modal.style = 'display: block;'
        document.body.style = 'overflow: hidden;'
    }
    const closeNodal = () => {
        modal.style = 'display: none'
        document.body.style = 'overflow: auto;'
    }

    btnOpenModal.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal()
        })
    })

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') || e.target.classList.contains('modal__close')) {
            closeNodal()
            clearTimeout(timerOpenModal)
        }

    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display === 'block') {
            closeNodal()
            clearTimeout(timerOpenModal)
        }
    })
    const timerOpenModal = setTimeout(openModal, 20000000)

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.body.scrollHeight - 1) {
            openModal()
            clearTimeout(timerOpenModal)
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
    window.addEventListener('scroll', showModalByScroll)


    /*  card */
    class MenuCard {
        constructor(img, title, descr, price) {
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.price = price;
        }

        render() {
            const wrapper = document.createElement('div')
            wrapper.classList.add('menu__item');
            wrapper.innerHTML = `
            <img src="${this.img}" alt="post">
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">Меню ${this.descr} </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;

            document.querySelector('.menu__field > .container').appendChild(wrapper);

        }
    }


    let foo1 = new MenuCard(
        'img/tabs/vegy.jpg',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих        овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной        ценой и высоким качеством!',
        '225',

    );
    let foo2 = new MenuCard(
        'img/tabs/elite.jpg',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '229',

    );
    let foo3 = new MenuCard(
        'img/tabs/post.jpg',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие   продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '430',

    );

    foo1.render()
    foo2.render()
    foo3.render()


    /*slider*/

    const sliders = document.querySelectorAll('.offer__slide'),
        btnSlideNext = document.querySelector('.offer__slider-next'),
        btnSlidePrev = document.querySelector('.offer__slider-prev');

    let current = document.getElementById('current');
    let total = document.getElementById('total');



    sliders.length < 9 ?
        total.textContent = '0' + sliders.length :
        total.textContent = sliders.length;




    let num = 0;
    const hideSlide = (numSlideShow = 0) => {
        sliders.forEach(slide => slide.classList.add('hide'))
        sliders[numSlideShow].classList.remove('hide')


        if (current.textContent < 9) {
            current.textContent = '0' + (num + 1);
        } else {
            current.textContent = num + 1;
        }


    }
    hideSlide(num)

    btnSlideNext.addEventListener('click', () => {
        num++
        if (num >= sliders.length) {
            num = 0;
        }
        hideSlide(num)

    })

    btnSlidePrev.addEventListener('click', () => {
        num--
        if (num < 0) {
            num = sliders.length - 1;
        }
        hideSlide(num)
    })


    /* calc */

    const result = document.querySelector('.calculating__result')

    let sex, height, weight, age, ratio;
    sex = 'female';
    ratio = 1.375;

    const calcTotal = () => {


        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '________';
            return
        }

        if (sex === 'female') {
            result.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio))
        } else {
            result.textContent = Math.floor((88.6 + (13.2 * weight) + (481 * height) - (5.7 * age) * ratio))
        }


    }

    calcTotal()

    const getStaticInfo = (parentSelector, activeClass) => {
        const elements = document.querySelectorAll(`${parentSelector} div`)

        elements.forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                } else {
                    sex = e.target.getAttribute('id')
                }
                elements.forEach(el => {
                    el.classList.remove(activeClass)
                })

                e.target.classList.add(activeClass)
                calcTotal()
            })
        })


    }

    getStaticInfo('#gender', 'calculating__choose-item_active')
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active')

    const getDinamicInfo = (select) => {
        const input = document.querySelector(select)

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value
                    break;
                case 'weight':
                    weight = +input.value
                    break;
                case 'age':
                    age = +input.value
                    break;
                default:
                    break;
            }
            calcTotal()
        })

    }


    getDinamicInfo('#height')
    getDinamicInfo('#weight')
    getDinamicInfo('#age')


})
