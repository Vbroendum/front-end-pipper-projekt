document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pip-modal');
    const createPipBtn = document.querySelector('#createPipBtn');
    const closeModal = document.querySelector('.close');
    const pipText = document.getElementById('pip-text');
    const pipFeed = document.getElementById('pip-feed');
    const submitPipBtn = document.getElementById('submit-pip');
    const charCount = document.getElementById('char-count');
    const usernameInput = document.getElementById('username');


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


const fetchPips = async () => {
    const response = await fetch('http://localhost:8000/pips');
    const pips = await response.json();

    pipFeed.innerHTML = ''; // Clear the feed
    pips.forEach(pip => {
        const listItem = document.createElement('div.post');
        
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

submitPipBtn.addEventListener('click', async () => {
    const username = usernameInput.value;
    const post = pipText.value;

    if (username && post) {
        const newPip = {
            username,
            post
        };

        // Send POST request to backend
        await fetch('http://localhost:8000/pips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPip)
        });

        // Clear inputs and refresh feed
        usernameInput.value = '';
        pipText.value = '';
        charCount.textContent = '0/255';

        fetchPips(); // Refresh feed with new pip
    }
});

})

