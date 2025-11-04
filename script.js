// --------------------------
// Animación al hacer scroll
// --------------------------
const events = document.querySelectorAll('.scene'); // <--- CAMBIADO AQUÍ

function checkScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  events.forEach(event => {
    const boxTop = event.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      event.classList.add('show');
    } else {
      event.classList.remove('show');
    }
  });
}

const canvas = document.getElementById('sparkleCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const sparkles = [];
const sparkleCount = 80; // cantidad de brillitos

class Sparkle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 0.5; // tamaño pequeño
    this.alpha = Math.random();
    this.fade = Math.random() * 0.02 + 0.005; // velocidad del parpadeo
  }

  update() {
    this.alpha += this.fade;
    if (this.alpha <= 0 || this.alpha >= 1) this.fade = -this.fade;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.fill();
  }
}

// Inicializa los brillitos
for (let i = 0; i < sparkleCount; i++) {
  sparkles.push(new Sparkle());
}

// Animación
function animateSparkles() {
  ctx.clearRect(0, 0, width, height);
  for (const s of sparkles) {
    s.update();
    s.draw();
  }
  requestAnimationFrame(animateSparkles);
}

animateSparkles();

// Ajusta el canvas si cambias el tamaño de la ventana
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});


window.addEventListener('scroll', checkScroll);
checkScroll();

// --------------------------
// Botón "NO" que huye (sin cambios)
// --------------------------
const noBtn = document.getElementById('no');
const noWrapper = document.querySelector('.no-wrapper');
const yesBtn = document.getElementById('yes');

noBtn.addEventListener('mouseenter', () => {
  const wrapperRect = noWrapper.getBoundingClientRect();
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = wrapperRect.width * 2 - btnWidth;
  const maxY = wrapperRect.height * 2 - btnHeight;

  // Movimiento dentro del wrapper
  const randomX = Math.random() * maxX * 2;
  const randomY = Math.random() * maxY * 2;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
});

// --------------------------
// Botón "SÍ" con mensaje bonito (mejorado visualmente)
// --------------------------
yesBtn.addEventListener('click', () => {
  // Mensaje central
  const msg = document.createElement('div');
  msg.classList.add('final-message');
  msg.innerHTML = '💖ya bésame muajaj💖';
  document.body.appendChild(msg);

  // Configuración de los "corazones" / imágenes
  const COUNT = 20; // cuántos salen
  const DURATION_MIN = 3500; // ms
  const DURATION_VAR = 2500; // ms aleatorio adicional

  // Si quieres usar imágenes en vez de emoji, coloca aquí sus rutas:
  // const IMG_POOL = ["images/miCorazon1.png", "images/miCorazon2.png"];
  // Dejar vacío para usar emoji:
  const IMG_POOL = ["images/lindotes3.jpeg"];

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'floating-heart';

    // posición horizontal aleatoria a lo ancho de la pantalla
    const left = Math.random() * (window.innerWidth - 60); // -60 para que no salga demasiado pegado al borde
    el.style.left = `${left}px`;

    // variación de tamaño
    const size = 24 + Math.random() * 28; // entre 24 y 52px
    // Si usas imagen personalizada:
    if (IMG_POOL.length) {
      const src = IMG_POOL[Math.floor(Math.random() * IMG_POOL.length)];
      el.innerHTML = `<img src="${src}" style="width:${size}px;height:${size}px;">`;
    } else {
      // emoji dentro (si prefieres emoji)
      el.textContent = '💗';
      el.style.fontSize = `${size}px`;
      el.style.lineHeight = '1';
    }

    // duración y retraso aleatorio para que no salgan todos juntos
    const dur = DURATION_MIN + Math.random() * DURATION_VAR;
    const delay = Math.random() * 600; // ms

    // aplicar la animación CSS (floatUp) con duración variable
    el.style.animation = `floatUp ${dur}ms ease-out ${delay}ms forwards`;

    // añadir al documento
    document.body.appendChild(el);

    // eliminar cuando termine (seguro después de dur + delay)
    setTimeout(() => {
      el.remove();
    }, dur + delay + 200);
  }

  // hacer que el mensaje desaparezca suavemente luego de X segundos
  setTimeout(() => {
    if (!msg) return;
    msg.style.opacity = '0';
    setTimeout(() => { msg.remove(); }, 700);
  }, 3000);
});


// Fade in al hacer scroll
const imgs = document.querySelectorAll('.gallery-grid img');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

imgs.forEach(img => observer.observe(img));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');

document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// Cerrar con clic fuera de la imagen
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

function lanzarFuegos() {
  const section = document.querySelector('.photo-gallery2');
  if (!section) return;

  // Crear el canvas dentro de la sección
  const canvas = document.createElement('canvas');
  canvas.width = section.clientWidth;
  canvas.height = section.clientHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 1; // debajo de fotos o texto si están en z-index más alto
  section.style.position = 'relative';
  section.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const particles = [];

  // Función para crear los fuegos
  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height / 2);
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

    for (let i = 0; i < 50; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        alpha: 1,
        color
      });
    }
  }

  // Dibujar animación
  function draw() {
    ctx.fillStyle = 'rgba(252, 245, 245, 0.15)'; // efecto de rastro
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01;
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  // Lanzar fuegos cada cierto tiempo
  setInterval(createFirework, 700);
  draw();

  // Ajustar tamaño del canvas si cambia el tamaño de la ventana
  window.addEventListener('resize', () => {
    canvas.width = section.clientWidth;
    canvas.height = section.clientHeight;
  });
}

// Llamada al iniciar
lanzarFuegos();



