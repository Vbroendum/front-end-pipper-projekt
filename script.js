document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pip-modal');
    const createPipBtn = document.querySelector('.create-pip-btn');
    const closeModal = document.querySelector('.close');
    const pipText = document.getElementById('pip-text');
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

const post1 = {
    profilepic: 'Avatar',
        username: 'Oliver',
        post: 'Kan man se hvad jeg har skrevet?'
}

const post2 = {
    profilepic: 'Avatar',
    username: 'Dillon',
    post: 'Hvad i alverden er dette?',
}

const post3 = {
    profilepic: 'Avatar',
        username: 'Victor',
        post: 'Jeg har ingen ide om, hvad der foregår',
}

const pipperPost = [post1, post2, post3]

    pipperPost.forEach((pipperPost) => {

        let temp = document.getElementById('posts');
        let clon = temp.content.cloneNode(true);

        clon.querySelector(".image").innerHTML = pipperPost.profilepic
        clon.querySelector(".username").innerHTML = pipperPost.username
        clon.querySelector(".post").innerHTML = pipperPost.post

        document.querySelector(".output").appendChild(clon);
    })

    