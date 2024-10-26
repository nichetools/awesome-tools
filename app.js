document.addEventListener('DOMContentLoaded', () => {
    fetchTools().then(tools => {
        const tags = [...new Set(tools.flatMap(tool => tool.tags))];
        generateFilters(tags);
        displayTools(tools);
    });

    document.getElementById('filters').addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const selectedTags = [...document.querySelectorAll('#filters input:checked')].map(input => input.value);
            filterTools(selectedTags);
        }
    });
});

async function fetchTools() {
    try {
        const response = await fetch('tools.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch tools:", error);
        return []; // Return an empty array if fetch fails
    }
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
    toolsSection.innerHTML = '';
    tools.forEach(tool => {
        const toolElement = createToolElement(tool);
        toolsSection.appendChild(toolElement);
    });
}

function createToolElement(tool) {
    const toolCard = document.createElement('div');
    toolCard.className = 'tool-card';
    toolCard.innerHTML = `
        <h3>${tool.title}</h3>
        <p>${tool.description}</p>
        <div class="tags">${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
        <a href="${tool.link}" target="_blank" class="visit-btn">Visit Tool</a>
    `;
    return toolCard;
}

function filterTools(selectedTags) {
    const tools = [...document.querySelectorAll('.tool-card')];
    tools.forEach(tool => {
        const toolTags = [...tool.querySelectorAll('.tag')].map(tag => tag.textContent);
        const shouldShow = selectedTags.length === 0 || selectedTags.some(tag => toolTags.includes(tag));
        tool.style.display = shouldShow ? 'block' : 'none';
    });
}
