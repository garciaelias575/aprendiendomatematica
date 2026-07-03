  /* ===== MENU MOBIL ===== */
  const navToggle = document.getElementById('navToggle');
  const menu = document.getElementById('menu');
  navToggle.addEventListener('click', () => menu.classList.toggle('abierto'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('abierto')));

  /* ===== VIDEO PLAY/PAUSE ===== */
  const video = document.getElementById('videoHero');
  const playBtn = document.getElementById('videoPlay');
  playBtn.addEventListener('click', () => {
    video.muted = false;
    video.play();
    playBtn.classList.add('oculto');
  });
  video.addEventListener('pause', () => playBtn.classList.remove('oculto'));

  /* ===== CONTADOR REGRESIVO (próximo martes 8pm) ===== */
  function proximaClase(){
    const ahora = new Date();
    const objetivo = new Date();
    objetivo.setHours(20,0,0,0);
    let diasHasta = (2 - ahora.getDay() + 7) % 7; // 2 = martes
    if(diasHasta === 0 && ahora > objetivo) diasHasta = 7;
    objetivo.setDate(ahora.getDate() + diasHasta);
    return objetivo;
  }
  const fechaObjetivo = proximaClase();
  function actualizarContador(){
    const ahora = new Date();
    let dif = fechaObjetivo - ahora;
    if(dif < 0) dif = 0;
    const d = Math.floor(dif/(1000*60*60*24));
    const h = Math.floor((dif/(1000*60*60))%24);
    const m = Math.floor((dif/(1000*60))%60);
    const s = Math.floor((dif/1000)%60);
    document.getElementById('dd').textContent = String(d).padStart(2,'0');
    document.getElementById('hh').textContent = String(h).padStart(2,'0');
    document.getElementById('mm').textContent = String(m).padStart(2,'0');
    document.getElementById('ss').textContent = String(s).padStart(2,'0');
  }
  actualizarContador();
  setInterval(actualizarContador, 1000);

  /* ===== FAQ ACORDEON ===== */
  document.querySelectorAll('.faq-item').forEach(item => {
    const pregunta = item.querySelector('.faq-pregunta');
    const respuesta = item.querySelector('.faq-respuesta');
    pregunta.addEventListener('click', () => {
      const abierto = item.classList.contains('abierto');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('abierto');
        i.querySelector('.faq-respuesta').style.maxHeight = null;
      });
      if(!abierto){
        item.classList.add('abierto');
        respuesta.style.maxHeight = respuesta.scrollHeight + 'px';
      }
    });
  });

  /* ===== VALIDACION FORMULARIO -> WHATSAPP ===== */
  document.getElementById('formulario').addEventListener('submit', function(e){
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const hijo = document.getElementById('hijo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    if(!nombre || !hijo || !telefono){
      alert('Por favor completa todos los campos.');
      return;
    }
    const mensaje = `Hola, quiero reservar el cupo gratis a la clase.%0APadre/madre: ${nombre}%0AHijo/a: ${hijo}%0AMi WhatsApp: ${telefono}`;
    window.open(`https://wa.me/51965110840?text=${mensaje}`, '_blank');
    this.reset();
  });

  /* ===== ANIMACIONES AL SCROLL ===== */
  const hiddenElements = document.querySelectorAll('.hidden');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('show');
    });
  }, {threshold:0.12});
  hiddenElements.forEach(el => observer.observe(el));
