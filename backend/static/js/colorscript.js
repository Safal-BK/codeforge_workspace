const data = {
    labels: [
        'assertive, competitive, and energetic.',
        'calm, reliable, and thoughtful.',
        'analytical, precise, and organized.',
        'social, expressive, and optimistic.'
    ],
    datasets: [{
        label: 'Personality Color Percentages',
        data: percentages_data,
        backgroundColor: [
            'rgba(255, 0, 0, 0.5)',
            'rgba(0, 0, 255, 0.5)',
            'rgba(0, 255, 0, 0.5)',
            'rgba(255, 255, 0, 0.5)'
        ],
       
        borderWidth: 1
    }]
};

const config = {
    type: 'doughnut',
    data: data,
    options: {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + '%';
                        }
                        return label;
                    }
                }
            }
        }
    }
};



var ctx = document.getElementById('resultChart').getContext('2d');
const chart = new Chart(ctx, config);



//radar chart
var radarCtx = document.getElementById('radarChart').getContext('2d');
var radarChart = new Chart(radarCtx, {
type: 'radar',
data: {
    labels: ['Assertiveness', 'Analytical', 'Calmness', 'Sociability'],
    datasets: [{
        label: 'Personality Color Traits',
        data: percentages_data,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'rgba(0, 123, 255, 1)',
        pointBackgroundColor: 'rgba(0, 123, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 123, 255, 1)'
    }]
},
options: {
    scale: {
        ticks: { beginAtZero: true, max: 100 },
        pointLabels: { fontSize: 14 },
        angleLines: { color: 'gray' },
        gridLines: { color: 'gray' }
    },
    legend: { display: false },
    responsive: true
}
});