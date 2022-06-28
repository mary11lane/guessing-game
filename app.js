const audios = [
  {
    type: 'correct',
    path: 'assets/correct-answer.mp3',
  },
  {
    type: 'incorrect',
    path: 'assets/wrong-answer.mp3',
  },
  {
    type: 'dino',
    path: 'assets/dino-sound.mp3',
  },
];

// LOADING OF AUDIOS
const loadAudios = () => {
  audios
    .map((audio) => {
      audio.audio = new Audio(audio.path);

      return audio;
    })
    .forEach((audio) => {
      audio.audio.addEventListener('canplaythrough', (e) => {
        audioCounter++;
      });
    });
};

let audioCounter = 0;

const playAudio = (type) => {
  const audio = audios.find((audio) => audio.type === type);

  if (!audio) {
    throw new 'No audio type for that!'();
  }
  audio.audio.play();
};

const generateRandomNumber = (minimum, maximum) => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

const sessionNumber = generateRandomNumber(1, 20);

const onSubmitHandler = (event) => {
  event.preventDefault();
  const input = document.getElementById('input-field');
  const indicators = document.querySelector('.indicators');
  const value = Number(input.value);
  input.value = '';

  if (!value) {
    indicators.innerText = 'It\'s not a number!';
    playAudio('incorrect');
    
    return;
} 
  if (value === sessionNumber) {
    indicators.innerText = 'GOOD JOB!';
    playAudio('correct');
    playAudio('dino');
  } 
  if (value > sessionNumber) {
    indicators.innerText = 'Lower!';
    playAudio('incorrect');
  } 
  if (value < sessionNumber) {
    indicators.innerText = 'Higher!';
    playAudio('incorrect');
  }
};

// PRELOAD FUNCTION
(() => {
  // Preload assets
  loadAudios();
})();
