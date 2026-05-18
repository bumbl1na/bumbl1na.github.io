const API_KEY = 'live_GS724x7xKWJlfykRrECSCcDjhNAnx95fbs9qTzwn6opSd4PMGAXAiyO6bEkVo6J6';
const API_BASE_URL = 'https://api.thedogapi.com/v1';

// DOM Elements
const breedSearch = document.getElementById('breedSearch');
const searchBtn = document.getElementById('searchBtn');
const randomBtn = document.getElementById('randomBtn');

// Error Elements
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const errorBtn = document.getElementById('errorBtn');
const closeBtn = document.querySelector('.close');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
breedSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
randomBtn.addEventListener('click', () => {
    window.location.href = 'random-results.html';
});

closeBtn.addEventListener('click', closeErrorModal);
errorBtn.addEventListener('click', closeErrorModal);
errorModal.addEventListener('click', (e) => {
    if (e.target === errorModal) closeErrorModal();
});

// Functions and Error handling


function showError(message) {
    errorMessage.textContent = message;
    errorModal.classList.add('show');
}


function closeErrorModal() {
    errorModal.classList.remove('show');
}


async function handleSearch() {
    const breedName = breedSearch.value.trim();

    if (!breedName) {
        showError('Please enter a breed name!');
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/breeds/search?q=${encodeURIComponent(breedName)}`,
            { headers: { 'x-api-key': API_KEY } }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch breed data');
        }

        const breeds = await response.json();

        if (breeds.length === 0) {
            showError(`No breed found named "${breedName}" . Try "pug", "golden", "poodle", "bulldog", or "husky"`);
            return;
        }


        localStorage.setItem('selectedBreed', JSON.stringify(breeds[0]));
        window.location.href = 'breed-results.html';
    } catch (error) {
        console.error('Error:', error);
        showError('Dang it! There was an error getting the breed information. Please try again.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('Dog Breed Explorer loaded and ready!');
});