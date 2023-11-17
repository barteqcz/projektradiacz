$(document).ready(function() {
    $('body').on('click', '.playbtn', function() {
        const clickedButton = $(this);
        changePlayBtn(clickedButton);
        playRadio(clickedButton.data('radio-id'));
    });

    const noStationsFound = $('#noStationsFound');

    $('audio').each(function() {
        this.src = this.src + '?cachebust=' + new Date();
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

        noStationsFound.toggle(!stationsFound);
    });

    setAudioSource();
});

function playRadio(audioId) {
    const audio = $('#' + audioId)[0];

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.src = audio.src + '?cachebust=' + new Date();
    }
}

function changePlayBtn(clickedButton) {
    clickedButton.toggleClass("fa-play fa-pause");
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function setAudioSource() {
    let rzurnal = document.getElementById('rzurnal');
    let rdvojka = document.getElementById('rdvojka');
    let rvltava = document.getElementById('rvltava');
    let audioElement = document.createElement('audio');
    let canPlayOgg = audioElement.canPlayType('audio/ogg') !== '';

    if (canPlayOgg) {
        rzurnal.src = 'http://amp.cesnet.cz:8000/cro1-256.ogg' + '?cachebust' + new Date();
        rdvojka.src = 'http://amp.cesnet.cz:8000/cro2-256.ogg' + '?cachebust' + new Date();
        rvltava.src = 'http://amp.cesnet.cz:8000/cro3-256.ogg' + '?cachebust' + new Date();
    } else {
        rzurnal.src = 'https://rozhlas.stream/radiozurnal_mp3_128.mp3' + '?cachebust' + new Date();
        rdvojka.src = 'https://rozhlas.stream/dvojka_mp3_128.mp3' + '?cachebust' + new Date();
        rvltava.src = 'https://rozhlas.stream/vltava_mp3_256.mp3' + '?cachebust' + new Date();
    }
}
