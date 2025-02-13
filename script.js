document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const photos = document.querySelectorAll(".photo");
    const message = document.getElementById("message");
    const birthdaySong = document.getElementById("birthday-song");
    let movedPhotos = new Set();

    console.log("Script loaded!");

    startButton.addEventListener("click", () => {
        console.log("Button clicked!");
        startButton.style.display = "none";
        birthdaySong.play();

        photos.forEach((photo, index) => {
            setTimeout(() => {
                photo.style.display = "block";
                photo.classList.add("show");
            }, index * 200);
        });
    });

    photos.forEach((photo, index) => {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        photo.style.zIndex = photos.length - index;

        photo.addEventListener("mousedown", startDrag);
        photo.addEventListener("touchstart", startDrag);

        function startDrag(event) {
            isDragging = true;
            photo.style.zIndex = "1000";

            if (event.type === "mousedown") {
                startX = event.clientX;
                startY = event.clientY;
            } else if (event.type === "touchstart") {
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
            }

            initialLeft = parseFloat(photo.style.left) || photo.offsetLeft;
            initialTop = parseFloat(photo.style.top) || photo.offsetTop;

            document.addEventListener("mousemove", onDrag);
            document.addEventListener("touchmove", onDrag);
            document.addEventListener("mouseup", endDrag);
            document.addEventListener("touchend", endDrag);
        }

        function onDrag(event) {
            if (isDragging) {
                let clientX, clientY;

                if (event.type === "mousemove") {
                    clientX = event.clientX;
                    clientY = event.clientY;
                } else if (event.type === "touchmove") {
                    clientX = event.touches[0].clientX;
                    clientY = event.touches[0].clientY;
                }

                const newLeft = initialLeft + (clientX - startX);
                const newTop = initialTop + (clientY - startY);

                photo.style.position = "absolute";
                photo.style.left = `${newLeft}px`;
                photo.style.top = `${newTop}px`;
            }
        }

        function endDrag() {
            isDragging = false;
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("touchmove", onDrag);
            movedPhotos.add(photo);

            if (movedPhotos.size === photos.length) {
                setTimeout(() => {
                    message.classList.add("show");
                    triggerConfetti();
                }, 500);
            }
        }
    });

    function triggerConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });

        setTimeout(() => confetti({ particleCount: 50, spread: 100 }), 500);
        setTimeout(() => confetti({ particleCount: 50, spread: 120 }), 1000);
    }
});