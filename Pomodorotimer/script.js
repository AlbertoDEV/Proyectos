const minutesDisplay = document.querySelector('.minutes');
const secondsDisplay = document.querySelector('.seconds');
const startBtn = document.querySelector('.btn-start');
const resetBtn = document.querySelector('.btn-reset');
const modeButtons = document.querySelectorAll('.mode-btn');

const TIME_MODES = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

let timerInterval;
let currentMode = 'pomodoro';
let totalSeconds = TIME_MODES[currentMode];
let pomodoroCount = 0;

function playBellSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
    oscillator.stop(audioContext.currentTime + 1);
}

function updateTimerDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            playBellSound();
            handleTimerEnd();
            return;
        }

        totalSeconds--;
        updateTimerDisplay();
    }, 1000);

    startBtn.textContent = 'Pause';
}

function pauseTimer() {
    clearInterval(timerInterval);
    startBtn.textContent = 'Start';
}

function resetTimer() {
    pauseTimer();
    totalSeconds = TIME_MODES[currentMode];
    updateTimerDisplay();
}

function handleTimerEnd() {
    let message = '';
    if (currentMode === 'pomodoro') {
        pomodoroCount++;
        if (pomodoroCount % 4 === 0) {
            message = '¡Pomodoro terminado! Es hora de un DESCANSO LARGO.';
            setMode('longBreak');
        } else {
            message = '¡Pomodoro terminado! Es hora de un DESCANSO CORTO.';
            setMode('shortBreak');
        }
    } else {
        message = `¡Descanso terminado! Es hora de volver al POMODORO.`;
        setMode('pomodoro');
    }
    alert(message);
    startTimer();
}

function setMode(mode) {
    currentMode = mode;
    totalSeconds = TIME_MODES[mode];
    updateTimerDisplay();
    resetBtn.click();
    updateModeButtons();
}

function updateModeButtons() {
    modeButtons.forEach(button => {
        if (button.dataset.mode === currentMode) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!timerInterval || startBtn.textContent === 'Start' || button.dataset.mode === currentMode) {
            setMode(button.dataset.mode);
        } else {
            alert("Por favor, pausa o reinicia el temporizador antes de cambiar de modo.");
        }
    });
});

startBtn.addEventListener('click', () => {
    if (startBtn.textContent === 'Start') {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetBtn.addEventListener('click', resetBtn);

updateTimerDisplay();
updateModeButtons();

const trackArt = document.querySelector(".track-art");
const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");

const playpauseBtn = document.querySelector(".playpause-track");
const nextBtn = document.querySelector(".next-track");
const prevBtn = document.querySelector(".prev-track");

const seekSlider = document.querySelector(".seek_slider");
const volumeSlider = document.querySelector(".volume_slider");
const currentTimeDisplay = document.querySelector(".current-time");
const totalDurationDisplay = document.querySelector(".total-duration");

let currTrack = document.createElement('audio');

let trackIndex = 0;
let isPlaying = false;
let updateTimerMusic;

const trackList = [
    {
        name: "Emotional Sad Piano",
        artist: "Lesfm",
        color: "#FF5733",
        path: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
    },
    {
        name: "Happy Piano Melody",
        artist: "Lesfm",
        color: "#33FF57",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        name: "Inspiring Cinematic Ambient",
        artist: "Lexin_Music",
        color: "#3357FF",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        name: "Upbeat Corporate Ambient",
        artist: "Coma-Media",
        color: "#FFBD33",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        name: "Soft Cinematic Piano",
        artist: "RelaxingMusic",
        color: "#A733FF",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }
];

function loadTrack(track_index) {
    clearInterval(updateTimerMusic);
    resetMusicPlayer();

    currTrack.removeEventListener('ended', handleTrackEnded);

    currTrack.src = trackList[track_index].path;
    currTrack.load();

    trackArt.style.backgroundColor = trackList[track_index].color;

    trackName.textContent = trackList[track_index].name;
    trackArtist.textContent = trackList[track_index].artist;

    updateTimerMusic = setInterval(setUpdateMusic, 1000);
    currTrack.addEventListener('ended', handleTrackEnded);

    currTrack.addEventListener('error', (e) => {
        console.error("Error al cargar o reproducir la pista:", e);
        alert(`Error al cargar la canción "${trackList[track_index].name}". Puede que el archivo no esté disponible o la URL sea incorrecta.`);
        isPlaying = false;
        playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        trackArt.classList.remove('playing');
        updateNavigationButtons();
    });

    updateNavigationButtons();
}

function handleTrackEnded() {
    if (trackIndex < trackList.length - 1) {
        nextTrack();
    } else {
        pauseTrack();
        trackIndex = 0;
        loadTrack(trackIndex);
        console.log("Fin de la lista de reproducción. Presiona Play para reiniciar.");
    }
}

function resetMusicPlayer() {
    currentTimeDisplay.textContent = "00:00";
    totalDurationDisplay.textContent = "00:00";
    seekSlider.value = 0;
}

function playpauseTrack() {
    if (isPlaying && currTrack.paused) {
        isPlaying = false;
        playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        trackArt.classList.remove('playing');
    }
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    currTrack.play()
        .then(() => {
            isPlaying = true;
            playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
            trackArt.classList.add('playing');
        })
        .catch(e => {
            console.warn("La reproducción automática de audio fue bloqueada:", e);
            alert("El navegador bloqueó la reproducción automática. Por favor, haz clic en el botón de Play para iniciar la música.");
            isPlaying = false;
            playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
            trackArt.classList.remove('playing');
        });
}

function pauseTrack() {
    currTrack.pause();
    isPlaying = false;
    playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    trackArt.classList.remove('playing');
}

function nextTrack() {
    if (trackIndex >= trackList.length - 1) {
        pauseTrack();
        trackIndex = trackList.length - 1;
        updateNavigationButtons();
        console.log("Ya estás en la última canción de la lista.");
        return;
    }

    pauseTrack();

    trackIndex += 1;
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    if (trackIndex <= 0) {
        pauseTrack();
        trackIndex = 0;
        updateNavigationButtons();
        console.log("Ya estás en la primera canción de la lista.");
        return;
    }

    pauseTrack();

    trackIndex -= 1;
    loadTrack(trackIndex);
    playTrack();
}

function seekTo() {
    let seekto = currTrack.duration * (seekSlider.value / 100);
    currTrack.currentTime = seekto;
}

function setVolume() {
    currTrack.volume = volumeSlider.value / 100;
}

function setUpdateMusic() {
    let seekPosition = 0;
    if (!isNaN(currTrack.duration)) {
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currTrack.currentTime / 60);
        let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currTrack.duration / 60);
        let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currentTimeDisplay.textContent = currentMinutes + ":" + currentSeconds;
        totalDurationDisplay.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function updateNavigationButtons() {
    if (trackIndex === 0) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
        prevBtn.onclick = null;
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
        prevBtn.onclick = prevTrack;
    }

    if (trackIndex === trackList.length - 1) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
        nextBtn.onclick = null;
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
        nextBtn.onclick = nextTrack;
    }
}

loadTrack(trackIndex);