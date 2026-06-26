window.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
  }

  const bars = document.querySelectorAll('.bar-fill');
  bars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
});
