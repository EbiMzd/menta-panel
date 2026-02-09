/* =========================
   Dashboard Client Core
========================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ========= Sidebar Active ========= */
    const links = document.querySelectorAll('.sidebar a');
  
    links.forEach(link => {
      link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  
    /* ========= Logout ========= */
    const logoutBtn = document.querySelector('.logout');
  
    logoutBtn?.addEventListener('click', () => {
      // بعداً اینجا میره روی API
      localStorage.removeItem('user_token');
      window.location.href = 'index.html';
    });
  
    document.querySelectorAll('.progress-circle').forEach(circle => {
      const percent = circle.dataset.progress;
      const progressCircle = circle.querySelector('.progress');
    
      const radius = 52;
      const circumference = 2 * Math.PI * radius;
    
      const offset = circumference - (percent / 100) * circumference;
    
      progressCircle.style.strokeDasharray = circumference;
      progressCircle.style.strokeDashoffset = offset;
    });
    
  });

  