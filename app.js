document.addEventListener('DOMContentLoaded', () => {
    const toolsSection = document.getElementById('tools');
    const filtersSection = document.getElementById('filters');

    // Fetch tools data
    fetchTools().then(tools => {
        // Generate filters
        const tags = [...new Set(tools.flatMap(tool => tool.tags))];
        generateFilters(tags);

        // Display tools
        displayTools(tools);
    });

    // Event listener for filters
    filtersSection.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const selectedTags = [...filtersSection.querySelectorAll('input:checked')].map(input => input.value);
            filterTools(selectedTags);
        }
    });
});

function fetchTools() {
    // In a real application, this would fetch from an API or load from a JSON file
    // For now, we'll return a mock array of tools
    return Promise.resolve([
        {
            title: "Example Tool",
            link: "https://example.com",
            thumbnail: "https://example.com/logo.png",
            snippet: "An example tool for developers",
            tags: ["Database", "Hosting"],
            features: [
                "Free feature 1",
                "Free feature 2",
                "Free feature 3"
            ]
        },
        // Add more tools here...
    ]);
}

function generateFilters(tags) {
    const filtersSection = document.getElementById('filters');
    tags.forEach(tag => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" value="${tag}">
            ${tag}
        `;
        filtersSection.appendChild(label);
    });
}

function displayTools(tools) {
    const toolsSection = document.getElementById('tools');
    toolsSection.innerHTML = ''; // Clear existing tools
    tools.forEach(tool => {
        const toolElement = createToolElement(tool);
        toolsSection.appendChild(toolElement);
    });
}

function createToolElement(tool) {
    const toolCard = document.createElement('div');
    toolCard.className = 'tool-card';
    toolCard.innerHTML = `
        <img src="${tool.thumbnail}" alt="${tool.title}" class="tool-logo">
        <h3>${tool.title}</h3>
        <p>${tool.snippet}</p>
        <div class="tags">${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
        <ul class="features">
            ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <a href="${tool.link}" target="_blank" class="visit-btn">Visit Tool</a>
    `;
    return toolCard;
}

function filterTools(selectedTags) {
    const tools = [...document.querySelectorAll('.tool-card')];
    tools.forEach(tool => {
        const toolTags = [...tool.querySelectorAll('.tag')].map(tag => tag.textContent);
        const shouldShow = selectedTags.length === 0 || selectedTags.every(tag => toolTags.includes(tag));
        tool.style.display = shouldShow ? 'block' : 'none';
    });
}
