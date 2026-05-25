const API_KEY = 'live_GS724x7xKWJlfykRrECSCcDjhNAnx95fbs9qTzwn6opSd4PMGAXAiyO6bEkVo6J6';
const API_BASE_URL = 'https://api.thedogapi.com/v1';

// Error Elements
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



// Show Error 
function showError(message) {
    errorMessage.textContent = message;
    errorModal.classList.add('show');
}

// Close Error 
function closeErrorModal() {
    errorModal.classList.remove('show');
}

// Display Breed Information
function displayBreedInfo(breed) {
    const breedTitle = document.getElementById('breedTitle');
    const breedContent = document.getElementById('breedContent');

    breedTitle.textContent = breed.name;

    breedContent.innerHTML = `
        <ul>
            <li>
                <strong>Temperament:</strong>
                <span>${breed.temperament || 'Not available'}</span>
            </li>
            <li>
                <strong>Life Span:</strong>
                <span>${breed.life_span || 'Not available'}</span>
            </li>
            <li>
                <strong>Origin:</strong>
                <span>${breed.origin || 'Not available'}</span>
            </li>
            <li>
                <strong>Height:</strong>
                <span>${breed.height?.metric || 'Not available'} cm</span>
            </li>
            <li>
                <strong>Weight:</strong>
                <span>${breed.weight?.metric || 'Not available'} kg</span>
            </li>
            <li>
                <strong>Breed Group:</strong>
                <span>${breed.breed_group || 'Not available'}</span>
            </li>
            <li>
                <strong>Purpose:</strong>
                <span>${breed.bred_for || 'Not available'}</span>
            </li>
        </ul>
    `;
}

// Get breed images
async function loadBreedImages(breedId) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/images/search?breed_id=${breedId}&limit=3`,
            { headers: { 'x-api-key': API_KEY } }
        );

        if (!response.ok) throw new Error('Failed to fetch breed images');

        const images = await response.json();

        if (images && images.length > 0) {
            const breedContent = document.getElementById('breedContent');
            const imagesHTML = `
                <div style="margin-top: 30px; padding-top: 30px; border-top: 2px solid var(--primary-pink);">
                    <h3 style="color: var(--brown); margin-bottom: 20px; font-size: 1.3rem;">Photos of this breed:</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        ${images.map(img => `
                            <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);">
                                <img src="${img.url}" alt="${img.breeds[0]?.name || 'Dog'}" style="width: 100%; height: 250px; object-fit: cover;">
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            breedContent.innerHTML += imagesHTML;
        }
    } catch (error) {
        console.error('Error loading breed images:', error);
        // Don't show error for images - it's optional
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    const breedData = localStorage.getItem('selectedBreed');

    if (breedData) {
        try {
            const breed = JSON.parse(breedData);
            displayBreedInfo(breed);

            // Load images if we have a breed ID
            if (breed.id) {
                loadBreedImages(breed.id);
            }
        } catch (error) {
            console.error('Error parsing breed data:', error);
            showError('Error loading breed information. Please try again.');
        }
    } else {
        showError('No breed selected. Please go back and search for a breed.');
    }
});
