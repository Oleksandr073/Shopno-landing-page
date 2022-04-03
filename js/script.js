// header //
const header = document.querySelector('.header');
const introHeight = parseInt(getComputedStyle(document.querySelector('.intro')).height);
if (window.pageYOffset >= introHeight) {
    header.classList.add('header_fixed');
}
window.onscroll = function fixHeader() {    
    if (window.pageYOffset >= introHeight) {
        header.classList.add('header_fixed');
    } else {
        header.classList.remove('header_fixed')
    }
};

// logo //
const logo = document.querySelector('.logo');
logo.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
});

// burger //
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
burger.addEventListener('click', function (event) {
    burger.classList.toggle('_active');
    nav.classList.toggle('_active');

    const navLinks = document.querySelectorAll('.nav_link[data-goto]');
    for (let i = 1; i <= navLinks.length; i++) {
        if (nav.classList[1] == '_active') setTimeout(navLinkOpacity, i * 50, i);
        else setTimeout(navLinkOpacity, (navLinks.length - i) * 35, i);
    }
    function navLinkOpacity(i) {
        navLinks[i - 1].classList.toggle('_active');
    }
});

// nav //
const navLinks = document.querySelectorAll('.nav_link[data-goto]');
if (navLinks.length > 0) {
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', function (event) {
            const navLink = event.target;
            if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) { // 0_o
                const gotoSection = document.querySelector(navLink.dataset.goto).closest('.section');
                const gotoSectionValue = gotoSection.getBoundingClientRect().top + window.pageYOffset;
                const nav = document.querySelector('.nav');
                nav.classList.toggle('_active');
                const burger = document.querySelector('.burger');
                burger.classList.toggle('_active');

                for (let i = 1; i <= navLinks.length; i++) {
                    if (nav.classList[1] == '_active') setTimeout(navLinkOpacity, i * 50, i);
                    else setTimeout(navLinkOpacity, (navLinks.length - i) * 35, i);
                }
                function navLinkOpacity(i) {
                    navLinks[i - 1].classList.toggle('_active');
                }

                window.scrollTo({
                    top: gotoSectionValue,
                    behavior: 'smooth',
                });
                event.preventDefault();
            }
        });
    });
}

// about //
const aboutPhotos = document.querySelectorAll('.about_photo');
const aboutDotbg = document.querySelectorAll('.about_dotbg');

sliderSlider();
setInterval(sliderSlider, 36000);

function sliderSlider() {
    setTimeout(slider, 0, 0, 1, 2);
    setTimeout(slider, 12000, 1, 2, 0);
    setTimeout(slider, 24000, 2, 0, 1);
}

function slider(i, j, k) {
    setTimeout(centerRight, 0, i);
    setTimeout(leftCenter, 3000, j);
    setTimeout(rightLeft, 6000, k);
}

function centerRight(i) {
aboutPhotos[i].classList.remove('center');
aboutPhotos[i].classList.add('right');
}

function leftCenter(i) {
aboutPhotos[i].classList.remove('left');
aboutPhotos[i].classList.add('center');
    
    if (getComputedStyle(aboutDotbg[0]).left == '0px') {
        for (let dot of aboutDotbg) {
            dot.style.transitionDuration = '3s';
        }
        aboutDotbg[0].style.left = '100%';
        setTimeout(() => {
            aboutDotbg[1].style.left = '0%';
        }, 1500);
    }
    if (getComputedStyle(aboutDotbg[1]).left == '0px') {
        aboutDotbg[1].style.left = '100%';
        setTimeout(() => {
            aboutDotbg[2].style.left = '0%';
        }, 1500);
    }
    if (getComputedStyle(aboutDotbg[2]).left == '0px') {
        for (let dot of aboutDotbg) {
            dot.style.transitionDuration = '1.5s';
        }
        aboutDotbg[2].style.left = '-100%';
        setTimeout(() => {
            aboutDotbg[1].style.left = '-100%';
        }, 750);
        setTimeout(() => {
            aboutDotbg[0].style.left = '0';
        }, 2250);
    }
}

function rightLeft(i) {
aboutPhotos[i].classList.remove('right');
aboutPhotos[i].classList.add('left');
}

// services //
const services = document.querySelector('.services');
services.addEventListener('click', function (event) {
    if (event.target.closest('.services_more')) {
        event.target.closest('.services_item').classList.add('_active');
    }
    if (event.target.closest('.services_back svg')){
        event.target.closest('.services_item').classList.remove('_active');
    }
});

// team //
const team = document.querySelector('.team');
team.addEventListener('click', function (event) {
    if (event.target.closest('.team_item') && !event.target.closest('.team_info')) {
        event.target.closest('.team_item').lastElementChild.classList.toggle('_active');
    }
});

// reviews //
const btns = document.querySelector('.reviews_buttons');
const btnLeft = document.querySelectorAll('.reviews_btn')[0];
const btnRight = document.querySelectorAll('.reviews_btn')[1];
const reviewsPhotos = document.querySelectorAll('.reviews_photo');
const reviewsDotbg = document.querySelectorAll('.reviews_dotbg');
const reviewsReview = document.querySelectorAll('.reviews_review');
let arr = [0, 1, 2];

btns.addEventListener('click', function (event) {
    if (event.target.closest('.reviews_btn') == btnLeft) sliderLeft(arr[0], arr[1], arr[2]);
    if (event.target.closest('.reviews_btn') == btnRight) sliderRight(arr[0], arr[1], arr[2]);
}, { "once": true });

function sliderLeft(i, j, k) {
    setTimeout(centerRight0, 0, i);
    setTimeout(leftCenter0, 500, j);
    setTimeout(rightLeft0, 1000, k);

    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] + 1 < 3) arr2[i] = arr[i] + 1;
        else arr2[i] = arr[i] + 1 - 3;
    }
    arr = arr2.slice(0);

    setTimeout(btnsAdd, 2000);
    function btnsAdd() {
        btns.addEventListener('click', function (event) {
            if (event.target.closest('.reviews_btn') == btnLeft) sliderLeft(arr[0], arr[1], arr[2]);
            if (event.target.closest('.reviews_btn') == btnRight) sliderRight(arr[0], arr[1], arr[2]);
        }, { "once": true });
    }
}

function centerRight0(i) {
    reviewsPhotos[i].classList.remove('center');
    reviewsPhotos[i].classList.add('right');
    
    reviewsReview[i].classList.remove('center');
    reviewsReview[i].classList.add('right');
}

function leftCenter0(i) {
    reviewsPhotos[i].classList.remove('left');
    reviewsPhotos[i].classList.add('center');
    
    reviewsReview[i].classList.remove('left');
    reviewsReview[i].classList.add('center');

    if (getComputedStyle(reviewsDotbg[2]).left == '0px') {
        for (let dot of reviewsDotbg) {
            dot.style.transitionDuration = '0.5s';
        }
        reviewsDotbg[2].style.left = '-100%';
        setTimeout(() => {
            reviewsDotbg[1].style.left = '0%';
        }, 250);
    }
    if (getComputedStyle(reviewsDotbg[1]).left == '0px') {
        reviewsDotbg[1].style.left = '-100%';
        setTimeout(() => {
            reviewsDotbg[0].style.left = '0%';
        }, 250);
    }
    if (getComputedStyle(reviewsDotbg[0]).left == '0px') {
        for (let dot of reviewsDotbg) {
            dot.style.transitionDuration = '0.25s';
        }
        reviewsDotbg[0].style.left = '100%';
        setTimeout(() => {
            reviewsDotbg[1].style.left = '100%';
        }, 125);
        setTimeout(() => {
            reviewsDotbg[2].style.left = '0';
        }, 375);
    }
}

function rightLeft0(i) {
    reviewsPhotos[i].classList.remove('right');
    reviewsPhotos[i].classList.add('left');
    
    reviewsReview[i].classList.remove('right');
    reviewsReview[i].classList.add('left');
}

function sliderRight(i, j, k) {
    setTimeout(centerLeft1, 0, i);
    setTimeout(rightCenter1, 500, k);
    setTimeout(leftRight1, 1000, j);

    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] - 1 > -1) arr2[i] = arr[i] - 1;
        else arr2[i] = arr[i] - 1 + 3;
    }
    arr = arr2.slice(0);

    setTimeout(btnsAdd, 2000);
    function btnsAdd() {
        btns.addEventListener('click', function (event) {
            if (event.target.closest('.reviews_btn') == btnLeft) sliderLeft(arr[0], arr[1], arr[2]);
            if (event.target.closest('.reviews_btn') == btnRight) sliderRight(arr[0], arr[1], arr[2]);
        }, { "once": true });
    }
}

function centerLeft1(i) {
    reviewsPhotos[i].classList.remove('center');
    reviewsPhotos[i].classList.add('left');
    
    reviewsReview[i].classList.remove('center');
    reviewsReview[i].classList.add('left');
}

function rightCenter1(i) {
    reviewsPhotos[i].classList.remove('right');
    reviewsPhotos[i].classList.add('center');
    
    reviewsReview[i].classList.remove('right');
    reviewsReview[i].classList.add('center');

    if (getComputedStyle(reviewsDotbg[0]).left == '0px') {
        for (let dot of reviewsDotbg) {
            dot.style.transitionDuration = '0.5s';
        }
        reviewsDotbg[0].style.left = '100%';
        setTimeout(() => {
            reviewsDotbg[1].style.left = '0%';
        }, 250);
    }
    if (getComputedStyle(reviewsDotbg[1]).left == '0px') {
        reviewsDotbg[1].style.left = '100%';
        setTimeout(() => {
            reviewsDotbg[2].style.left = '0%';
        }, 250);
    }
    if (getComputedStyle(reviewsDotbg[2]).left == '0px') {
        for (let dot of reviewsDotbg) {
            dot.style.transitionDuration = '0.25s';
        }
        reviewsDotbg[2].style.left = '-100%';
        setTimeout(() => {
            reviewsDotbg[1].style.left = '-100%';
        }, 125);
        setTimeout(() => {
            reviewsDotbg[0].style.left = '0';
        }, 375);
    }
}

function leftRight1(i) {
    reviewsPhotos[i].classList.remove('left');
    reviewsPhotos[i].classList.add('right');
    
    reviewsReview[i].classList.remove('left');
    reviewsReview[i].classList.add('right');
}