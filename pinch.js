(function () {
    "use strict";
    var initDist,
        scale = 1,
        initScale = 1,
        processing = false,
        scaling = false;

    function drawBody() {
        document.body.style.width = (window.innerWidth / scale) + "px";
        document.body.style.transform = "scale(" + scale + ", " + scale + ")";
        processing = false;
    }

    // Change origin to top left for scaling
    function setView() {
        document.body.style.transformOrigin = "top left";
        drawBody();
    }

    if (document.readyState === "complete") {
        setView();
    } else {
        document.addEventListener("DOMContentLoaded", setView, false);
    }


    // Length between objects of type Touch
    function dist(point1, point2) {
        return Math.sqrt(Math.pow((point1.pageX - point2.pageX), 2) +
            Math.pow((point1.pageY - point2.pageY), 2));
    }

    function pinchStart(e) {
        initDist = dist(e.touches[0], e.touches[1]);
        initScale = scale;
    }

    function pinchMove(e) {
        if (processing === false) {
            var d = dist(e.touches[0], e.touches[1]);
            scale = initScale * d / initDist;
            window.requestAnimationFrame(drawBody);
            processing = true;
        }
    }

    document.addEventListener('touchstart', function (e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            scaling = true;
            pinchStart(e);
        } else {
            scaling = false;
        }
    }, false);

    document.addEventListener('touchmove', function (e) {
        if (scaling) {
            e.preventDefault();
            pinchMove(e);
        }
    }, false);

    document.addEventListener('touchend', function (e) {
        if (scaling) {
            scaling = false;
        }
    }, false);
}());
