document.addEventListener('DOMContentLoaded', () => {
    fetchTools().then(tools => {
        const categories = [...new Set(tools.flatMap(tool => tool.tags))];
        generateCategoryButtons(categories);
        displayTools(tools);
    });

    document.getElementById('pr-form').addEventListener('submit', submitPullRequest);
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

function generateCategoryButtons(categories) {
    const categoriesSection = document.getElementById('categories');
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.className = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300';
        button.addEventListener('click', () => filterTools(category));
        categoriesSection.appendChild(button);
    });

    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.className = 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300';
    allButton.addEventListener('click', () => filterTools(null));
    categoriesSection.prepend(allButton);
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
    toolCard.className = 'bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:border-blue-500 transition duration-300';
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

function filterTools(category) {
    fetchTools().then(tools => {
        const filteredTools = category
            ? tools.filter(tool => tool.tags.includes(category))
            : tools;
        displayTools(filteredTools);
    });
}

function submitPullRequest(event) {
    event.preventDefault();
    const toolName = document.getElementById('tool-name').value;
    const toolLink = document.getElementById('tool-link').value;
    const toolTags = document.getElementById('tool-tags').value.split(',').map(tag => tag.trim());
    const toolDescription = document.getElementById('tool-description').value;

    const yamlContent = `
- title: "${toolName}"
  link: "${toolLink}"
  description: "${toolDescription}"
  tags: 
${toolTags.map(tag => `    - ${tag}`).join('\n')}
`;

    const prBody = encodeURIComponent(`
Add new tool: ${toolName}

\`\`\`yaml
${yamlContent}
\`\`\`
`);

    const newBranch = `add-tool-${toolName.toLowerCase().replace(/\s+/g, '-')}`;
    const encodedContent = btoa(yamlContent); // Base64 encode the content

    const prUrl = `https://github.com/nichetools/awesome-tools/new/main?filename=_data/tools.yml&value=${encodedContent}&message=${encodeURIComponent(`Add new tool: ${toolName}`)}&description=${prBody}&target_branch=${newBranch}`;

    window.open(prUrl, '_blank');
}
