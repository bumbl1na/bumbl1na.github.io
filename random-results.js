const API_KEY = 'live_GS724x7xKWJlfykRrECSCcDjhNAnx95fbs9qTzwn6opSd4PMGAXAiyO6bEkVo6J6';
const API_BASE_URL = 'https://api.thedogapi.com/v1';

// Error  Elements
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const errorBtn = document.getElementById('errorBtn');
const closeBtn = document.querySelector('.close');

// Event Listeners
closeBtn.addEventListener('click', closeErrorModal);
errorBtn.addEventListener('click', closeErrorModal);
errorModal.addEventListener('click', (e) => {
    if (e.target === errorModal) closeErrorModal();
});



// Show Error Modal
function showError(message) {
    errorMessage.textContent = message;
    errorModal.classList.add('show');
}

// Close Error
function closeErrorModal() {
    errorModal.classList.remove('show');
}

// Random Dogs
async function loadRandomDogs() {
    try {
        const randomDogContainer = document.getElementById('randomDogContainer');
        randomDogContainer.innerHTML = '<div class="loading" style="grid-column: 1 / -1;">Loading adorable doggies...</div>';

        const response = await fetch(
            `${API_BASE_URL}/images/search?limit=6&order=RANDOM`,
            { headers: { 'x-api-key': API_KEY } }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }

        const images = await response.json();

        if (images.length === 0) {
            showError('Could not load dog images. Please try again.');
            return;
        }

        displayRandomDogs(images);
    } catch (error) {
        console.error('Error:', error);
        showError('Error loading random dogs. Please try again.');
    }
}

// Display Random Dog Images
function displayRandomDogs(images) {
    const randomDogContainer = document.getElementById('randomDogContainer');
    randomDogContainer.innerHTML = '';

    images.forEach((image) => {
        const card = document.createElement('div');
        card.className = 'dog-image-card';
        card.innerHTML = `<img src="${image.url}" alt="Random dog" loading="lazy" style="width: 100%; height: 350px; object-fit: cover; border-radius: 12px;">`;
        randomDogContainer.appendChild(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Random Dogs page loaded!');
    loadRandomDogs();
});
