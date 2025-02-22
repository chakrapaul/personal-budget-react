// import { useEffect, useState } from 'react'; 
// import '../App.scss';
// import axios from 'axios';  
// import { Line } from 'react-chartjs-2';  // Import Chart.js
// import * as d3 from 'd3';

// // Chart.js Imports
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function HomePage() {
//   // Declare the state for chart data
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     // Make an API call using Axios
//     axios.get('https://your-backend-api-url') // Replace with your actual backend URL
//       .then(response => {
//         // Assuming the API returns data in a format suitable for the chart
//         const data = response.data;
        
//         // Format the data into a format Chart.js expects
//         setChartData({
//           labels: data.labels, // Data for X-axis (e.g., dates, categories, etc.)
//           datasets: [{
//             label: 'My Data', // Name of the dataset
//             data: data.values, // Data for Y-axis (values corresponding to labels)
//             fill: false,
//             borderColor: 'rgba(75,192,192,1)',
//             tension: 0.1
//           }]
//         });

//         // D3.js Example: Render a bar chart using D3.js
//         const svg = d3.select('#d3Chart') // Selecting the div with ID 'd3Chart'
//           .attr('width', 500)
//           .attr('height', 300);

//         // Simple D3.js bar chart
//         svg.selectAll('rect')
//           .data(data.values) // Use the values for the bars
//           .enter()
//           .append('rect')
//           .attr('x', (d, i) => i * 60) // Set the X position of the bars
//           .attr('y', d => 300 - d) // Set the Y position (height)
//           .attr('width', 50) // Set the width of the bars
//           .attr('height', d => d) // Set the height based on the data value
//           .attr('fill', 'steelblue'); // Set the fill color of the bars
//       })
//       .catch(error => {
//         console.log('There was an error!', error); 
//       });
//   }, []); // Empty dependency array means this runs once after the first render

//   return (
//     <main className="center" id="main">
//         <div className="page-area">
//             <article>
//                 <h1>Stay on track</h1>
//                 <p>
//                     Do you know where you are spending your money? If you really stop to track it down,
//                     you would get surprised! Proper budget management depends on real data... and this
//                     app will help you with that!
//                 </p>
//             </article>
    
//             <article>
//                 <h1>Alerts</h1>
//                 <p>
//                     What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
//                 </p>
//             </article>
    
//             <article>
//                 <h1>Results</h1>
//                 <p>
//                     People who stick to a financial plan, budgeting every expense, get out of debt faster!
//                     Also, they live happier lives... since they spend without guilt or fear... 
//                     because they know it is all good and accounted for.
//                 </p>
//             </article>
    
//             <article>
//                 <h1>Free</h1>
//                 <p>
//                     This app is free!!! And you are the only one holding your data!
//                 </p>
//             </article>

//             {/* Chart.js Section */}
//             <article>
//                 <h1>Chart.js Chart</h1>
//                 {chartData ? (
//                   <Line data={chartData} />  // Render the chart if data is available
//                 ) : (
//                   <p>Loading chart...</p>  // Show loading text until data is fetched
//                 )}
//             </article>

//             {/* D3.js Section */}
//             <article>
//                 <h1>D3.js Bar Chart</h1>
//                 <svg id="d3Chart"></svg>  {/* D3.js will render the bar chart here */}
//             </article>
//         </div>
//     </main>
//   );
// }

// export default HomePage;
import { useEffect, useState } from 'react';
import '../App.scss';
import { Pie } from 'react-chartjs-2';  // Import Chart.js Pie chart
import * as d3 from 'd3';

// Chart.js Imports
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function HomePage() {
  const [chartData, setChartData] = useState(null);
  const [d3Data, setD3Data] = useState([]);

  useEffect(() => {
    // Use static, mock data instead of fetching from the server
    const mockData = [
      { title: "Rent", budget: 500 },
      { title: "Food", budget: 300 },
      { title: "Entertainment", budget: 150 },
      { title: "Transportation", budget: 100 },
      { title: "Savings", budget: 200 },
    ];

    // Prepare data for Chart.js Pie chart
    const chartJSData = {
      labels: mockData.map(item => item.title),
      datasets: [{
        data: mockData.map(item => item.budget),
        backgroundColor: [
          '#f25da3', '#3498db', '#e67e22', '#4CAF50', '#6c757d', '#ffcc00', '#90ee90',
        ],
      }],
    };

    setChartData(chartJSData); // Set data for Chart.js chart
    setD3Data(mockData); // Set data for D3.js chart
  }, []); // Run only once after the first render

  useEffect(() => {
    if (d3Data.length > 0) {
      // Call the function to create the D3.js chart when data is available
      createD3Chart(d3Data);
    }
  }, [d3Data]);

  // Function to create the D3.js donut chart
  function createD3Chart(data) {
    const width = 300;  // Set equal width for both charts
    const height = 300;  // Set equal height for both charts
    const radius = Math.min(width, height) / 2;

    // Remove any existing SVG before creating a new one
    d3.select("#d3Chart").selectAll("*").remove();

    const svg = d3.select("#d3Chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d.budget) // Use "budget" field
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius * 0.4)  // Creates the donut hole
      .outerRadius(radius * 0.9);

    const labelArc = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius * 0.7);

    const data_ready = pie(data);

    svg.selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .style("stroke", "white")
      .style("stroke-width", "2px");

    svg.selectAll("text")
      .data(data_ready)
      .enter()
      .append("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text(d => d.data.title); 
  }

  return (
    <main className="center" id="main">
        <div className="page-area">
            <article>
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>

            <article>
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>

            <article>
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they live happier lives... since they spend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>

            <article>
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>

            {/* Chart.js Pie Chart Section */}
            <article>
                <h1>Chart.js Pie Chart</h1>
                {chartData ? (
                  <div className="chart-container">
                    <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} width={300} height={300} />
                  </div>
                ) : (
                  <p>Loading chart...</p>
                )}
            </article>

            {/* D3.js Donut Chart Section */}
            <article>
                <h1>D3.js Chart</h1>
                <div className="chart-container">
                  <svg id="d3Chart"></svg>  
                </div>
            </article>
        </div>
    </main>
  );
}

export default HomePage;
