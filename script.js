document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.mobile').forEach(function (element) {
        element.addEventListener('click', function (event) {
            var clickedButton = event.target.closest('.playbtn');
            if (clickedButton) {
                changePlayBtn(clickedButton);
                playRadio(clickedButton.dataset.audioId);
            }
        });
    });

    document.querySelectorAll('.desktop').forEach(function (element) {
        element.addEventListener('click', function (event) {
            var clickedButton = event.target.closest('.playbtn');
            if (clickedButton) {
                changePlayBtn(clickedButton);
                playRadio(clickedButton.dataset.audioId);
            }
        });
    });

    function playRadio(audioId) {
        var audio = document.getElementById(audioId);

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
            location.reload(true);
        }
    }

    function changePlayBtn(clickedButton) {
        clickedButton.classList.toggle("fa-play");
        clickedButton.classList.toggle("fa-pause");
    }

    function normalizeString(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    window.onload = function () {
        const noStationsFoundDesktop = document.getElementById('noStationsFoundDesktop');
        const noStationsFoundMobile = document.getElementById('noStationsFoundMobile');

        document.querySelectorAll('audio').forEach(function (audio) {
            audio.src += '?cachebust=' + (+new Date());
        });

        document.querySelector('.searchbar').addEventListener('input', function () {
            const searchTerm = normalizeString(this.value);
            let stationsFound = false;

            document.querySelectorAll('.box').forEach(function (box) {
                const radioName = normalizeString(box.querySelector('h1').innerText);

                if (radioName.includes(searchTerm)) {
                    box.style.display = 'flex';
                    stationsFound = true;
                } else {
                    box.style.display = 'none';
                }
            });

            noStationsFoundDesktop.style.display = stationsFound ? 'none' : 'block';
            noStationsFoundMobile.style.display = stationsFound ? 'none' : 'block';
        });
    };
});
