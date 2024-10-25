document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const modal = document.getElementById('submitModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const submitForm = document.getElementById('submitForm');

    submitBtn.onclick = () => {
        modal.style.display = "block";
    }

    closeBtn.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    submitForm.onsubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()),
            url: document.getElementById('url').value
        };
        
        // Here you would typically send this data to your server
        console.log('Submitted data:', formData);
        
        // Clear the form and close the modal
        submitForm.reset();
        modal.style.display = "none";
    }
});
