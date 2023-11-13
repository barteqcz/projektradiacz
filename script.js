$(document).ready(function () {
    $('.mobile, .desktop').on('click', '.playbtn', function () {
        changePlayBtn(this);
        playRadio(this);
    });

    const noStationsFoundDesktop = $('#noStationsFoundDesktop');
    const noStationsFoundMobile = $('#noStationsFoundMobile');

    $('audio').each(function () {
        this.src += '?cachebust=' + (+new Date());
    });

    $('.searchbar').on('input', function () {
        const searchTerm = normalizeString($(this).val());
        let stationsFound = false;

        $('.box').each(function () {
            const radioName = normalizeString($(this).find('h1').text());

            if (radioName.includes(searchTerm)) {
                $(this).css('display', 'flex');
                stationsFound = true;
            } else {
                $(this).css('display', 'none');
            }
        });

        noStationsFoundDesktop.css('display', stationsFound ? 'none' : 'block');
        noStationsFoundMobile.css('display', stationsFound ? 'none' : 'block');
    });
});

function playRadio(audioId) {
    const audio = $('#' + audioId)[0];

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        location.reload(true);
    }
}

function changePlayBtn(clickedButton) {
    $(clickedButton).toggleClass("fa-play fa-pause");
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
