const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const audio = document.getElementById('weddingAudio');
const intro = document.getElementById('musicIntro');
const startMusic = document.getElementById('startMusic');
const skipMusic = document.getElementById('skipMusic');
const musicToggle = document.getElementById('musicToggle');

if (audio && intro && startMusic && skipMusic && musicToggle) {
  audio.volume = 0.72;

  const setPlayerState = () => {
    const playing = !audio.paused;
    musicToggle.classList.toggle('is-playing', playing);
    musicToggle.setAttribute('aria-label', playing ? 'Поставить музыку на паузу' : 'Включить музыку');
    musicToggle.title = playing ? 'Пауза' : 'Включить музыку';
    musicToggle.querySelector('.music-toggle-icon').textContent = playing ? '❚❚' : '♫';
  };

  const closeIntro = () => {
    intro.classList.add('is-hidden');
    document.body.classList.remove('intro-open');
    musicToggle.classList.add('is-visible');
    setTimeout(()=>intro.remove(),650);
  };

  startMusic.addEventListener('click', async () => {
    try {
      await audio.play();
      setPlayerState();
    } catch (error) {
      console.warn('Браузер не разрешил запуск музыки:', error);
    }
    closeIntro();
  });

  skipMusic.addEventListener('click', closeIntro);

  musicToggle.addEventListener('click', async () => {
    if (audio.paused) {
      try { await audio.play(); } catch (error) { console.warn(error); }
    } else {
      audio.pause();
    }
    setPlayerState();
  });

  audio.addEventListener('play', setPlayerState);
  audio.addEventListener('pause', setPlayerState);
}
