function initMap() {};
// AOS.init();
    // window.addEventListener('load', AOS.refresh);
    AOS.init({
        startEvent: 'load',
    });

    $(function() {
    $('.slider__inner').slick({
        infinite: true,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 3000,
        nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
        prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    });

    $('.header__btn-menu').on('click', function(){
        $('.menu ul').slideToggle();
    });
});

window.requestAnimFrame = (function () { return window.requestAnimationFrame })();
let canvas = document.getElementById("space");
let c = canvas.getContext("2d");

let numStars = 900;
let radius = '0.' + Math.floor(Math.random() * 99) + 1;
let focalLength = canvas.width * 1;
let warp = 0;
let centerX, centerY;

let stars = [], star;
let i;

let animate = true;

initializeStars();

function executeFrame() {

    if (animate)
        requestAnimFrame(executeFrame);
    moveStars();
    drawStars();
}

function initializeStars() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    stars = [];
    for (i = 0; i < numStars; i++) {
        star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            o: '0.' + Math.floor(Math.random() * 99) + 1
        };
        stars.push(star);
    }
}

function moveStars() {
    for (i = 0; i < numStars; i++) {
        star = stars[i];
        star.z--;

        if (star.z <= 0) {
            star.z = canvas.width;
        }
    }
}

function drawStars() {
    let pixelX, pixelY, pixelRadius;

    // Resize to the screen
    if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars();
    }
    if (warp == 0) {
        c.fillStyle = "rgba(0,10,20,0.9)";
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
    c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
    for (i = 0; i < numStars; i++) {
        star = stars[i];

        pixelX = (star.x - centerX) * (focalLength / star.z);
        pixelX += centerX;
        pixelY = (star.y - centerY) * (focalLength / star.z);
        pixelY += centerY;
        pixelRadius = 1 * (focalLength / star.z);

        c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
        c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
        // c.fill();
    }
}
executeFrame();
