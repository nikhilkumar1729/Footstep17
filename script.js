// Sample data
const dailyStepsData = [
    { day: 'Mon', steps: 8234, distance: 6.2, calories: 312, duration: 78 },
    { day: 'Tue', steps: 10502, distance: 8.1, calories: 421, duration: 95 },
    { day: 'Wed', steps: 7891, distance: 6.0, calories: 298, duration: 72 },
    { day: 'Thu', steps: 12045, distance: 9.3, calories: 485, duration: 108 },
    { day: 'Fri', steps: 9876, distance: 7.6, calories: 396, duration: 88 },
    { day: 'Sat', steps: 15234, distance: 11.8, calories: 612, duration: 142 },
    { day: 'Sun', steps: 11298, distance: 8.7, calories: 453, duration: 98 }
];

const footpathTypes = [
    { name: 'Paved Sidewalk', value: 45, color: '#3b82f6' },
    { name: 'Park Trails', value: 25, color: '#10b981' },
    { name: 'Urban Streets', value: 20, color: '#f59e0b' },
    { name: 'Dirt Paths', value: 10, color: '#8b5cf6' }
];

const activityHours = [
    { hour: '6-8 AM', steps: 2340 },
    { hour: '8-10 AM', steps: 1890 },
    { hour: '12-2 PM', steps: 2890 },
    { hour: '4-6 PM', steps: 3120 },
    { hour: '6-8 PM', steps: 2450 },
    { hour: '8-10 PM', steps: 1200 }
];

const routes = [
    { name: 'Morning Park Loop', distance: '5.2 km', freq: '15 times', terrain: 'Park Trail', rating: 4.8 },
    { name: 'Downtown Circuit', distance: '3.8 km', freq: '22 times', terrain: 'Urban', rating: 4.5 },
    { name: 'Riverside Path', distance: '8.5 km', freq: '8 times', terrain: 'Paved', rating: 4.9 },
    { name: 'Hill Challenge', distance: '6.3 km', freq: '5 times', terrain: 'Mixed', rating: 4.2 }
];

// Chart instances
let dailyStepsChart;
let footpathChart;
let activityHoursChart;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    updateStats();
    initCharts();
    renderRoutes();
});

// Tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Update statistics
function updateStats() {
    const totalSteps = dailyStepsData.reduce((sum, day) => sum + day.steps, 0);
    const totalDistance = dailyStepsData.reduce((sum, day) => sum + day.distance, 0);
    const totalCalories = dailyStepsData.reduce((sum, day) => sum + day.calories, 0);
    const avgSteps = Math.round(totalSteps / dailyStepsData.length);

    document.getElementById('totalSteps').textContent = totalSteps.toLocaleString();
    document.getElementById('totalDistance').textContent = totalDistance.toFixed(1) + ' km';
    document.getElementById('avgSteps').textContent = avgSteps.toLocaleString();
    document.getElementById('totalCalories').textContent = totalCalories.toLocaleString();
}

// Initialize charts
function initCharts() {
    // Daily Steps Chart
    const dailyStepsCtx = document.getElementById('dailyStepsChart').getContext('2d');
    dailyStepsChart = new Chart(dailyStepsCtx, {
        type: 'bar',
        data: {
            labels: dailyStepsData.map(d => d.day),
            datasets: [{
                label: 'Steps',
                data: dailyStepsData.map(d => d.steps),
                backgroundColor: '#3b82f6',
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#111827',
                    bodyColor: '#6b7280',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toLocaleString() + ' steps';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f3f4f6'
                    },
                    ticks: {
                        color: '#6b7280'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6b7280'
                    }
                }
            }
        }
    });

    // Footpath Distribution Chart
    const footpathCtx = document.getElementById('footpathChart').getContext('2d');
    footpathChart = new Chart(footpathCtx, {
        type: 'doughnut',
        data: {
            labels: footpathTypes.map(f => f.name),
            datasets: [{
                data: footpathTypes.map(f => f.value),
                backgroundColor: footpathTypes.map(f => f.color),
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        },
                        color: '#6b7280'
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#111827',
                    bodyColor: '#6b7280',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });

    // Activity Hours Chart
    const activityCtx = document.getElementById('activityHoursChart').getContext('2d');
    activityHoursChart = new Chart(activityCtx, {
        type: 'line',
        data: {
            labels: activityHours.map(a => a.hour),
            datasets: [{
                label: 'Steps',
                data: activityHours.map(a => a.steps),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#111827',
                    bodyColor: '#6b7280',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toLocaleString() + ' steps';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f3f4f6'
                    },
                    ticks: {
                        color: '#6b7280'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6b7280'
                    }
                }
            }
        }
    });
}

// Render routes list
function renderRoutes() {
    const routesList = document.getElementById('routesList');
    
    routes.forEach((route, index) => {
        const routeItem = document.createElement('div');
        routeItem.className = 'route-item';
        
        routeItem.innerHTML = `
            <div class="route-info">
                <div class="route-number">${index + 1}</div>
                <div class="route-details">
                    <h4>${route.name}</h4>
                    <div class="route-stats">
                        <span>${route.distance}</span>
                        <span>•</span>
                        <span>${route.freq}</span>
                        <span>•</span>
                        <span>${route.terrain}</span>
                    </div>
                </div>
            </div>
            <div class="route-rating">${route.rating}</div>
        `;
        
        routesList.appendChild(routeItem);
    });
}

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-card, .chart-card, .insight-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
}

// Initialize animations
setTimeout(animateOnScroll, 100);