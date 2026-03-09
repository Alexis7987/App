document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate fake chart data bars
    const chartArea = document.getElementById('chart-area');
    const dataPoints = 24;
    
    for (let i = 0; i < dataPoints; i++) {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        
        // Random height between 20% and 90%
        const randomHeight = Math.floor(Math.random() * 70) + 20;
        
        // Random value for the tooltip
        const randomVal = Math.floor(Math.random() * 50) + 10;
        bar.setAttribute('data-value', `$${randomVal}k`);
        
        // Initial state
        bar.style.height = '0%';
        
        chartArea.appendChild(bar);
        
        // Animate in with slight delay
        setTimeout(() => {
            bar.style.height = `${randomHeight}%`;
        }, i * 40 + 200); // slightly faster animation
    }

    // 2. Add subtle hover effects to cards that follow mouse
    const cards = document.querySelectorAll('.glass');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px, 
                    rgba(255,255,255,0.06) 0%, 
                    var(--glass-bg) 60%
                )
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--glass-bg)';
        });
    });

    // 3. Simple Sidebar active state switching
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});
