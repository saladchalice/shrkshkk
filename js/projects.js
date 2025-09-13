import { fetchJSON, renderProjects } from '../js/app.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";
const baseURL = window.location.origin.includes('github.io')
  ? '/shrkshkk'
  : ''; // Adjust if needed for local dev

const projects = await fetchJSON(`${baseURL}/lib/projects.json`);

// define the project container, class=projects
const projectsContainer = document.querySelector('.projects');
// render
renderProjects(projects, projectsContainer, 'h3');

// Add a count of projects at the top of the page
const projectsTitle = document.querySelector('.projects-title');
// if (projectsTitle) {
//     projectsTitle.textContent = `my projects`;
// }

// Initialize selectedIndex to -1
let selectedIndex = -1;

// pie chart
// arcgenerator generates arc paths to display
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
function renderPieChart(projectsGiven) {
    let newRolledData = d3.rollups(
        projectsGiven,
        (v) => v.length,
        (d) => d.year
    );

    // Recalculate data
    let newData = newRolledData.map(([year, count]) => {
        return { value: count, label: year };
    }).sort((a, b) => a.label - b.label);

    let newSliceGenerator = d3.pie().value((d) => d.value);
    let newArcData = newSliceGenerator(newData);
    let newArcs = newArcData.map((d) => arcGenerator(d));

    const ordinalColors = [
        '#0A2F51', // Deep Blue
        '#004488', // Royal Blue
        '#1D9A6C', // Teal Green
        '#FF8800', // Vibrant Orange
        '#E63946', // Strong Red
        '#FFC300', // Bright Yellow
        '#39A96B', // Fresh Green
        '#556B2F', // Olive Green
        '#8E44AD', // Rich Purple
        '#3CB371'  // Medium Sea Green
      ];
      
    let colors = d3.scaleOrdinal(
       ordinalColors
    );



    let svg = d3.select('svg');
    svg.selectAll('path').remove();

    newArcs.forEach((arc, i) => {
        svg.append('path')
            .attr('d', arc)
            .attr('fill', colors(i))
            .on('click', () => {
                selectedIndex = selectedIndex === i ? -1 : i;
                console.log(`Selected index: ${selectedIndex}`);
                
                svg.selectAll('path').attr('class', (_, idx) => (
                    selectedIndex === idx ? 'selected' : ''
                ));

                legend.selectAll('li').attr('class', (_, idx) => (
                    selectedIndex === idx ? 'legend-item-selected' : 'legend-item'
                ));

                // Updated filtering based on year and search query
                let filteredProjects = projects.filter(project => {
                    let matchesYear = selectedIndex === -1 || project.year === newData[selectedIndex].label;
                    let matchesQuery = Object.values(project).join('\n').toLowerCase().includes(query);
                    return matchesYear && matchesQuery;
                });
                renderProjects(filteredProjects, projectsContainer, 'h3');
            });
    });

    // Clear existing legend and apply initial hidden class
    let legend = d3.select('.legend');
    legend.selectAll('*').remove();

    // Define new legend
    newData.forEach((d, idx) => {
        legend.append('li')
            .attr('class', 'legend-item')
            .attr('style', `--color:${colors(idx)}; font-family: Inter;`)
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
    });
    
    let searchBar = document.querySelector('.searchBar');

    // Ensure elements are initially hidden before fading in
    requestAnimationFrame(() => {
        setTimeout(() => {
            svg.classed('visible', true);
            if (searchBar) searchBar.classList.add('visible');
            legend.classed('visible', true);
        }, 200);
    });
}

renderPieChart(projects);

// implementing a search
let query = '';
let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('input', (event) => {
    // update query value
    query = event.target.value.toLowerCase();
    // filter the projects
    let filteredProjects = projects.filter((project) => {
        let values = Object.values(project).join('\n').toLowerCase();
        return values.includes(query);
    });
    // render updated projects
    let newSVG = d3.select('svg'); 
    newSVG.selectAll('path').remove();
    
    renderProjects(filteredProjects, projectsContainer, 'h3');
    renderPieChart(filteredProjects);
});