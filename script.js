document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. Single Page Application (SPA) View Switching
    // ----------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-links a');
    const views = document.querySelectorAll('.page-view');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Handle Active state on Nav Links
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Handle View display
            const targetId = link.getAttribute('href').substring(1); // e.g. 'dashboard' from '#dashboard'
            
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === `view-${targetId}`) {
                    view.classList.add('active');
                }
            });
        });
    });

    // ----------------------------------------------------
    // 2. Interactive Modal Logic
    // ----------------------------------------------------
    const modal = document.getElementById('project-modal');
    const openBtns = document.querySelectorAll('.btn-new-project');
    const closeBtns = document.querySelectorAll('.modal-close');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });

    // Close on click outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // ----------------------------------------------------
    // 3. Chart.js Integration
    // ----------------------------------------------------
    const ctx = document.getElementById('revenueChart');
    if(ctx) {
        // Base chart config
        Chart.defaults.color = '#8b8b93';
        Chart.defaults.font.family = "'Outfit', sans-serif";

        const gradientPrimary = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradientPrimary.addColorStop(0, 'rgba(67, 24, 255, 0.8)');
        gradientPrimary.addColorStop(1, 'rgba(67, 24, 255, 0.05)');

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Revenue',
                    data: [65000, 59000, 80000, 81000, 86000, 105000, 130000],
                    borderColor: '#4318FF',
                    borderWidth: 3,
                    backgroundColor: gradientPrimary,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#030305',
                    pointBorderColor: '#FF56F6',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255,255,255,0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value / 1000 + 'k';
                            }
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });

        // ----------------------------------------------------
        // 4. Interactive Time Filter for Chart
        // ----------------------------------------------------
        const timeFilter = document.getElementById('time-filter');
        timeFilter.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === '30') {
                myChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                myChart.data.datasets[0].data = [20000, 35000, 40000, 35000];
            } else if (val === '90') {
                myChart.data.labels = ['Oct', 'Nov', 'Dec'];
                myChart.data.datasets[0].data = [85000, 110000, 135000];
            } else if (val === '365') {
                myChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                myChart.data.datasets[0].data = [40000, 45000, 50000, 55000, 60000, 70000, 80000, 95000, 100000, 90000, 110000, 130000];
            }
            myChart.update();
        });
    }

    // ----------------------------------------------------
    // 5. Card Hover Effects
    // ----------------------------------------------------
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
});
