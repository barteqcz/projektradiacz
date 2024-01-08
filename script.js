document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("cro-city").value = "rpraha";
    document.getElementById("hitradio-city").value = "hitradio-city-praha";

    updateOptionsCRo();
    updateOptionsHitradio();

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

});

function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const toggleBtn = document.querySelectorAll('.toggle-btn');

    if (body.classList.contains('dark-mode')) {
        toggleBtn.forEach(function (toggleBtn) {
            toggleBtn.classList.add('fa-toggle-on');
            toggleBtn.classList.remove('fa-toggle-off');
        });

    } else {
        toggleBtn.forEach(function (toggleBtn) {
            toggleBtn.classList.remove('fa-toggle-on');
            toggleBtn.classList.add('fa-toggle-off');
        });

    }

    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

function updateOptionsCRo() {
    let citySelect = document.getElementById("cro-city");
    let citySelectValue = citySelect.value;
    let radioLogo = document.querySelector(".box1-cro .radio-logo");
    let playBtn = document.querySelector(".box3-cro .playbtn");
    let linkBtn = document.querySelector(".box4-cro .btn");
    let hrefLink = document.querySelector(".box4-cro .cro-href");
    
    if (citySelectValue == "rpraha") {
        linkBtn.innerHTML = "praha.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rpraha')");
        playBtn.setAttribute("data-radio-id", "rpraha");
        hrefLink.href = "https://praha.rozhlas.cz/";
        radioLogo.src = 'imgs/cropraha.png';
    }
       
    else if (citySelectValue == "rbrno") {
        linkBtn.innerHTML = "brno.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rbrno')");
        playBtn.setAttribute("data-radio-id", "rbrno");
        hrefLink.href = "https://brno.rozhlas.cz/";
        radioLogo.src = 'imgs/crobrno.png';
    }
    
    else if (citySelectValue == "rostrava") {
        linkBtn.innerHTML = "ostrava.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rostrava')");
        playBtn.setAttribute("data-radio-id", "rostrava");
        hrefLink.href = "https://ostrava.rozhlas.cz/";
        radioLogo.src = 'imgs/croostrava.png';
    }

    else if (citySelectValue == "rolomouc") {
        linkBtn.innerHTML = "olomouc.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rolomouc')");
        playBtn.setAttribute("data-radio-id", "rolomouc");
        hrefLink.href = "https://olomouc.rozhlas.cz/";
        radioLogo.src = 'imgs/croolomouc.png';
    }

    else if (citySelectValue == "rcb") {
        linkBtn.innerHTML = "budejovice.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rcb')");
        playBtn.setAttribute("data-radio-id", "rcb");
        hrefLink.href = "https://budejovice.rozhlas.cz/";
        radioLogo.src = 'imgs/rcb.png';
    }

    else if (citySelectValue == "rhk") {
        linkBtn.innerHTML = "hradec.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rhk')");
        playBtn.setAttribute("data-radio-id", "rhk");
        hrefLink.href = "https://hradec.rozhlas.cz/";
        radioLogo.src = 'imgs/rhk.png';
    }

    else if (citySelectValue == "rkv") {
        linkBtn.innerHTML = "vary.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rkv')");
        playBtn.setAttribute("data-radio-id", "rkv");
        hrefLink.href = "https://vary.rozhlas.cz/";
        radioLogo.src = 'imgs/rkv.png';
    }

    else if (citySelectValue == "rliberec") {
        linkBtn.innerHTML = "liberec.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rliberec')");
        playBtn.setAttribute("data-radio-id", "rliberec");
        hrefLink.href = "https://liberec.rozhlas.cz/";
        radioLogo.src = 'imgs/rliberec.png';
    }

    else if (citySelectValue == "rpardubice") {
        linkBtn.innerHTML = "pardubice.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rpardubice')");
        playBtn.setAttribute("data-radio-id", "rpardubice");
        hrefLink.href = "https://pardubice.rozhlas.cz/";
        radioLogo.src = 'imgs/rpardubice.png';
    }

    else if (citySelectValue == "rplzen") {
        linkBtn.innerHTML = "plzen.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rplzen')");
        playBtn.setAttribute("data-radio-id", "rplzen");
        hrefLink.href = "https://plzen.rozhlas.cz/";
        radioLogo.src = 'imgs/rplzen.png';
    }

    else if (citySelectValue == "rregion") {
        linkBtn.innerHTML = "region.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rregion')");
        playBtn.setAttribute("data-radio-id", "rregion");
        hrefLink.href = "https://region.rozhlas.cz/";
        radioLogo.src = 'imgs/rregion.png';
    }

    else if (citySelectValue == "rsever") {
        linkBtn.innerHTML = "sever.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rsever')");
        playBtn.setAttribute("data-radio-id", "rsever");
        hrefLink.href = "https://sever.rozhlas.cz/";
        radioLogo.src = 'imgs/rsever.png';
    }

    else if (citySelectValue == "rvysocina") {
        linkBtn.innerHTML = "vysocina.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rvysocina')");
        playBtn.setAttribute("data-radio-id", "rvysocina");
        hrefLink.href = "https://vysocina.rozhlas.cz/";
        radioLogo.src = 'imgs/rvysocina.png';
    }

    else if (citySelectValue == "rzlin") {
        linkBtn.innerHTML = "zlin.rozhlas.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
        playBtn.setAttribute("onclick", "playRadio('rzlin')");
        playBtn.setAttribute("data-radio-id", "rzlin");
        hrefLink.href = "https://zlin.rozhlas.cz/";
        radioLogo.src = 'imgs/rzlin.png';
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

function updateOptionsHitradio() {
        let citySelect = document.getElementById("hitradio-city");
        let citySelectValue = citySelect.value;
        let radioLogo = document.querySelector(".box1-hitradio .radio-logo");
        let playBtn = document.querySelector(".box3-hitradio .playbtn");
        let linkBtn = document.querySelector(".box4-hitradio .btn");
        let hrefLink = document.querySelector(".box4-hitradio .hitradio-href");
    
        if (citySelectValue == "hitradio-city-praha") {
            linkBtn.innerHTML = "hitradiocity.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-city-praha')");
            playBtn.setAttribute("data-radio-id", "hitradio-city-praha");
            radioLogo.src = 'imgs/city937.svg';
            hrefLink.href = "https://hitradiocity.cz/";
        }
        
        else if (citySelectValue == "hitradio-city-brno") {
            linkBtn.innerHTML = "hitradiocitybrno.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-city-brno')");
            playBtn.setAttribute("data-radio-id", "hitradio-city-brno");
            radioLogo.src = 'imgs/citybrno.svg';
            hrefLink.href = "https://hitradiocitybrno.cz/";
        }
    
        else if (citySelectValue == "hitradio-orion") {
            linkBtn.innerHTML = "hitradioorion.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-orion')");
            playBtn.setAttribute("data-radio-id", "hitradio-orion");
            radioLogo.src = 'imgs/orion.svg';
            hrefLink.href = "https://hitradioorion.cz/";
        }

        else if (citySelectValue == "hitradio-contact") {
            linkBtn.innerHTML = "hitradiocontact.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-contact')");
            playBtn.setAttribute("data-radio-id", "hitradio-contact");
            radioLogo.src = 'imgs/contact.svg';
            hrefLink.href = "https://hitradiocontact.cz/";
        }
    
        else if (citySelectValue == "hitradio-cernahora") {
            linkBtn.innerHTML = "hitradiocernahora.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-cernahora')");
            playBtn.setAttribute("data-radio-id", "hitradio-cernahora");
            radioLogo.src = 'imgs/cernahora.svg';
            hrefLink.href = "https://hitradiocernahora.cz/";
        }

        else if (citySelectValue == "hitradio-faktor") {
            linkBtn.innerHTML = "hitradiofaktor.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-faktor')");
            playBtn.setAttribute("data-radio-id", "hitradio-faktor");
            radioLogo.src = 'imgs/faktor.svg';
            hrefLink.href = "https://hitradiofaktor.cz/";
        }

        else if (citySelectValue == "hitradio-fmplus") {
            linkBtn.innerHTML = "hitradiofmplus.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-fmplus')");
            playBtn.setAttribute("data-radio-id", "hitradio-fmplus");
            radioLogo.src = 'imgs/fmplus.svg';
            hrefLink.href = "https://hitradiofmplus.cz/";
        }

        else if (citySelectValue == "hitradio-northmusic") {
            linkBtn.innerHTML = "hitradionorthmusic.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-northmusic')");
            playBtn.setAttribute("data-radio-id", "hitradio-northmusic");
            radioLogo.src = 'imgs/north.svg';
            hrefLink.href = "https://hitradionorthmusic.cz/";
        }

        else if (citySelectValue == "hitradio-vysocina") {
            linkBtn.innerHTML = "hitradiovysocina.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-vysocina')");
            playBtn.setAttribute("data-radio-id", "hitradio-vysocina");
            radioLogo.src = 'imgs/vysocina.svg';
            hrefLink.href = "https://hitradiovysocina.cz/";
        }

        else if (citySelectValue == "hitradio-zlin") {
            linkBtn.innerHTML = "hitradiozlin.cz<i class='fa-solid fa-arrow-up-right-from-square icon-right'></i>";
            playBtn.setAttribute("onclick", "playRadio('hitradio-zlin')");
            playBtn.setAttribute("data-radio-id", "hitradio-zlin");
            radioLogo.src = 'imgs/zlin.svg';
            hrefLink.href = "https://hitradiozlin.cz/";
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
