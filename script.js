document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("cro-city").value = "rpraha";
    document.getElementById("hitradio-city").value = "hitradio-city-praha";
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        toggleMode();
    }

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
            let elementToSearch = null;

            const h1Element = box.querySelector('h1');
            if (h1Element) {
                elementToSearch = h1Element;
            }

            if (!elementToSearch) {
                const selectElement = box.querySelector('select');
                if (selectElement) {
                    elementToSearch = selectElement;
                }
            }

            if (elementToSearch) {
                const elementText = normalizeString(elementToSearch.textContent || elementToSearch.value);

                const displayStyle = elementText.includes(searchTerm) ? 'flex' : 'none';
                box.style.display = displayStyle;

                if (displayStyle === 'flex') {
                    stationsFound = true;
                }
            }
        });

        noStationsFound.style.display = stationsFound ? 'none' : 'block';
    });

    function playRadio(audioId) {
        const audio = document.getElementById(audioId);

        document.querySelectorAll('audio').forEach(function (otherAudio) {
            if (otherAudio.id !== audioId) {
                otherAudio.pause();
                otherAudio.src = otherAudio.src + '?cachebust=' + new Date();
                const otherPlayBtn = document.querySelector(`.playbtn[data-radio-id="${otherAudio.id}"]`);
                if (otherPlayBtn) {
                    otherPlayBtn.classList.remove('fa-pause');
                    otherPlayBtn.classList.add('fa-play');
                }
            }
        });

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
            audio.src = audio.src + '?cachebust=' + new Date();
            const playBtn = document.querySelector(`.playbtn[data-radio-id="${audioId}"]`);
            if (playBtn) {
                playBtn.classList.remove('fa-pause');
                playBtn.classList.add('fa-play');
            }
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

    function toggleMode() {
        const body = document.body;
        body.classList.toggle('dark-mode');
        const toggleBtn = document.querySelectorAll('.toggle-btn');

        toggleBtn.forEach(function (toggleBtn) {
            if (body.classList.contains('dark-mode')) {
                toggleBtn.classList.add('fa-toggle-on');
                toggleBtn.classList.remove('fa-toggle-off');
            } else {
                toggleBtn.classList.remove('fa-toggle-on');
                toggleBtn.classList.add('fa-toggle-off');
            }
        });

        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    }
});

    function updateOptionsCRo() {
        let citySelect = document.getElementById("cro-city");
        let citySelectValue = citySelect.value;
        let radioLogo = document.querySelector(".box1-cro .radio-logo");
        let playBtn = document.querySelector(".box3-cro .playbtn");
        let linkBtn = document.querySelector(".box4-cro .btn");
        let hrefLink = document.querySelector(".box4-cro .cro-href");
    
        if (citySelectValue == "rpraha") {
            linkBtn.innerHTML = "praha.rozhlas.cz &nbsp;<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('rpraha')");
            hrefLink.href = "https://praha.rozhlas.cz/";
            radioLogo.src = 'imgs/cro.jpg';
        }
        
        else if (citySelectValue == "rbrno") {
            linkBtn.innerHTML = "brno.rozhlas.cz &nbsp;<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('rbrno')");
            hrefLink.href = "https://brno.rozhlas.cz/";
            radioLogo.src = 'imgs/crobrno.webp';
        }
    
        else if (citySelectValue == "rostrava") {
            linkBtn.innerHTML = "ostrava.rozhlas.cz &nbsp;<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('rostrava')");
            hrefLink.href = "https://ostrava.rozhlas.cz/";
            radioLogo.src = 'imgs/croostrava.png';
        }
    
        if (playBtn.classList.contains("fa-pause")) {
            playBtn.classList.remove("fa-pause");
            playBtn.classList.add("fa-play");
            let allAudioElements = document.querySelectorAll('audio');
            allAudioElements.forEach(audio => {
                audio.pause();
            });
        }
    }

function updateOptionsHitradio() {
        let citySelect = document.getElementById("hitradio-city");
        let citySelectValue = citySelect.value;
        let radioLogo = document.querySelector(".box1-hitradio .radio-logo");
        let playBtn = document.querySelector(".box3-hitradio .playbtn");
        let linkBtn = document.querySelector(".box4-hitradio .btn");
        let hrefLink = document.querySelector(".box4-hitradio .hitradio-href");
    
        if (citySelectValue == "hitradio-city-praha") {
            linkBtn.innerHTML = "hitradiocity.cz &nbsp;<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-city-praha')", "data-radio-id='hitradio-city-praha'");
            radioLogo.src = 'imgs/city937.svg';
            hrefLink.href = "https://hitradiocity.cz/";
        }
        
        else if (citySelectValue == "hitradio-city-brno") {
            linkBtn.innerHTML = "hitradiocitybrno.cz &nbsp;<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-city-brno')", "data-radio-id='hitradio-city-brno'");
            radioLogo.src = 'imgs/citybrno.svg';
            hrefLink.href = "https://hitradiocitybrno.cz/";
        }
    
        else if (citySelectValue == "hitradio-orion") {
            linkBtn.innerHTML = "hitradioorion.cz &nbsp;<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-orion')", "data-radio-id='hitradio-orion'");
            radioLogo.src = 'imgs/orion.svg';
            hrefLink.href = "https://hitradioorion.cz/";
        }
    
        if (playBtn.classList.contains("fa-pause")) {
            playBtn.classList.remove("fa-pause");
            playBtn.classList.add("fa-play");
            let allAudioElements = document.querySelectorAll('audio');
            allAudioElements.forEach(audio => {
                audio.pause();
                audio.src = audio.src + '?cachebust=' + new Date();
            });
        }
    }
