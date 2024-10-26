document.addEventListener('DOMContentLoaded', () => {
    fetchTools().then(tools => {
        const categories = [...new Set(tools.flatMap(tool => tool.tags))];
        generateCategoryDropdown(categories);
        displayTools(tools);

        document.getElementById('category-filter').addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            filterTools(tools, selectedCategory);
        });
    });
});

async function fetchTools() {
    try {
        const response = await fetch('./tools.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch tools:", error);
        console.log("Using fallback data");
        return fallbackTools;
    }
}

function generateCategoryDropdown(categories) {
    const dropdown = document.getElementById('category-filter');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown.appendChild(option);
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
    toolCard.className = 'bg-white rounded-lg shadow-md p-6';
    toolCard.innerHTML = `
        <h3 class="text-xl font-semibold mb-2">${tool.title}</h3>
        <p class="text-gray-600 mb-4">${tool.description}</p>
        <div class="mb-4">
            ${tool.tags.map(tag => `<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">${tag}</span>`).join('')}
        </div>
        <a href="${tool.link}" target="_blank" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Visit Tool</a>
    `;
    return toolCard;
}

function filterTools(tools, category) {
    const filteredTools = category
        ? tools.filter(tool => tool.tags.includes(category))
        : tools;
    displayTools(filteredTools);
}
