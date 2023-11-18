document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        const clickedElement = event.target;

        if (clickedElement.classList.contains('playbtn')) {
            const clickedButton = clickedElement;
            changePlayBtn(clickedButton);
            playRadio(clickedButton.getAttribute('data-radio-id'));
        }
    });

    const noStationsFound = document.getElementById('noStationsFound');

    document.querySelectorAll('audio').forEach(function (audio) {
        audio.src = audio.src + '?cachebust=' + new Date();
    });

    document.querySelector('.searchbar').addEventListener('input', function () {
        const searchTerm = normalizeString(this.value);
        let stationsFound = false;

        document.querySelectorAll('.box').forEach(function (box) {
            const radioName = normalizeString(box.querySelector('h1').textContent);

            const displayStyle = radioName.includes(searchTerm) ? 'flex' : 'none';
            box.style.display = displayStyle;

            if (displayStyle === 'flex') {
                stationsFound = true;
            }
        });

        noStationsFound.style.display = stationsFound ? 'none' : 'block';
    });

    setAudioSource();
});

function playRadio(audioId) {
    const audio = document.getElementById(audioId);

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.src = audio.src + '?cachebust=' + new Date();
    }
}

function changePlayBtn(clickedButton) {
    if (clickedButton.classList.contains('fa-play')) {
        clickedButton.classList.remove('fa-play');
        clickedButton.classList.add('fa-pause');
    } else {
        clickedButton.classList.remove('fa-pause');
        clickedButton.classList.add('fa-play');
    }
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function setAudioSource() {
    const rzurnal = document.getElementById('rzurnal');
    const rdvojka = document.getElementById('rdvojka');
    const rvltava = document.getElementById('rvltava');
    const isChromium = /Chrom(e|ium)/.test(navigator.userAgent);
    
    if (isChromium) {
        rzurnal.src = 'https://rozhlas.stream/radiozurnal_mp3_128.mp3' + '?cachebust=' + new Date();
        rdvojka.src = 'https://rozhlas.stream/dvojka_mp3_128.mp3' + '?cachebust=' + new Date();
        rvltava.src = 'https://rozhlas.stream/vltava_mp3_256.mp3' + '?cachebust=' + new Date();
    } else {
        rzurnal.src = 'http://amp.cesnet.cz:8000/cro1-256.ogg' + '?cachebust=' + new Date();
        rdvojka.src = 'http://amp.cesnet.cz:8000/cro2-256.ogg' + '?cachebust=' + new Date();
        rvltava.src = 'http://amp.cesnet.cz:8000/cro3-256.ogg' + '?cachebust=' + new Date();
    }
}

function toggleMode() {
    const body = document.body;
    const toggleOn = document.querySelector('.fa-toggle-on');
    const toggleOff = document.querySelector('.fa-toggle-off');
    
    // Check if there is a theme stored in local storage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Toggle the dark mode class based on the stored preference
    body.classList.toggle('dark-mode', isDarkMode);

    // Update the toggle button display
    if (isDarkMode) {
        toggleOn.style.display = 'inline-block';
        toggleOff.style.display = 'none';
    } else {
        toggleOn.style.display = 'none';
        toggleOff.style.display = 'inline-block';
    }
}

// Function to save the theme preference to local storage
function saveThemePreference() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Call the saveThemePreference function whenever the theme is toggled
document.addEventListener('DOMContentLoaded', function () {
    toggleMode(); // Set the initial theme based on local storage
    document.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('toggle-button')) {
            toggleMode();
            saveThemePreference();
        }
    });
});
