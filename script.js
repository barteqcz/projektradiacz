$(document).ready(function() {
    $('.mobile, .desktop').on('click', '.playbtn', function() {
        const clickedButton = $(this);
        changePlayBtn(clickedButton);
        playRadio(clickedButton.data('radio-id'));
    });

    const noStationsFoundDesktop = $('#noStationsFoundDesktop');
    const noStationsFoundMobile = $('#noStationsFoundMobile');

    $('audio').each(function() {
        this.src += '?cachebust=' + (+new Date());
    });

    $('.searchbar').on('input', function() {
        const searchTerm = normalizeString($(this).val());
        let stationsFound = false;

        $('.box').each(function() {
            const radioName = normalizeString($(this).find('h1').text());

            const displayStyle = radioName.includes(searchTerm) ? 'flex' : 'none';
            $(this).css('display', displayStyle);

            if (displayStyle === 'flex') {
                stationsFound = true;
            }
        });

        noStationsFoundDesktop.toggle(!stationsFound);
        noStationsFoundMobile.toggle(!stationsFound);
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
    clickedButton.toggleClass("fa-play fa-pause");
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
