document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pip-modal');
    const createPipBtn = document.querySelector('#createPipBtn');
    const closeModal = document.querySelector('.close');
    const pipText = document.getElementById('pip-text');
    const pipFeed = document.getElementById('pip-feed');
    const charCount = document.getElementById('char-count');


    // Open Modal
    createPipBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Character counter for pip-text
    pipText.addEventListener('input', () => {
        const textLength = pipText.value.length;
        charCount.textContent = `${textLength}/255`;
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Post Pip
    const submitPipBtn = document.getElementById('submit-pip');
    submitPipBtn.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const text = pipText.value;

        if (username && text) {
            // Create a new Pip
            const newPip = document.createElement('div');
            newPip.classList.add('pip');
            newPip.innerHTML = `
                <div class="user-avatar">
                    <img src="https://avatars.dicebear.com/api/initials/${username[0].toUpperCase()}.svg" alt="User Avatar">
                </div>
                <div class="pip-content">
                    <strong>${username}</strong>
                    <p>${text}</p>
                </div>
            `;

            document.querySelector('.pip-feed').prepend(newPip);

            // Clear input and close modal
            document.getElementById('username').value = '';
            pipText.value = '';
            charCount.textContent = '0/255';
            modal.style.display = 'none';
        }
    });
});

const fetchPips = async () => {
    const response = await fetch('http://localhost:8000/pips');
    const pips = await response.json();

    pipFeed.innerHTML = ''; // Clear the feed
    pips.forEach(pip => {
        const listItem = document.createElement('li');
        
        // Create avatar URL based on the username
        const avatarUrl = `https://avatars.dicebear.com/api/initials/${encodeURIComponent(pip.username)}.svg`;

        listItem.innerHTML = `
            <div class="pip-entry">
                <div class="user-avatar">
                    <img src="${avatarUrl}" alt="Avatar for ${pip.username}">
                </div>
                <div class="pip-content">
                    <strong>${pip.username}</strong>: ${pip.post}
                </div>
            </div>
        `;
        pipFeed.appendChild(listItem);
    });
};

// Call fetchPips on load
fetchPips();