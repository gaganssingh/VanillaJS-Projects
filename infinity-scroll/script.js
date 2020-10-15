// SELECTORS
const imageContainer = document.getElementById("image-container");
const loadingSpinner = document.getElementById("loader");

let photosArray = [];

// FUNCTIONS
// Helper function
setAttributes = (el, attributes) => {
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
};

// Add photos to DOM
showPhotosInDOM = () => {
    photosArray.forEach((photo) => {
        // Create <a> element
        const item = document.createElement("a");

        // item.setAttribute("href", photo.url);
        // item.setAttribute("target", "_blank");
        setAttributes(item, {
            href: photo.url,
            target: "_blank",
        });

        // Create <img> element
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.download_url,
            alt: `By ${photo.author}`,
            title: photo.author,
        });

        // Put <img> inside <a> element -> Then <a> inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

// FLorem Picsum API
fetchPhotos = async () => {
    const limit = 10;
    const imageUrl = `https://picsum.photos/v2/list/?limit=${limit}`;

    try {
        const response = await fetch(imageUrl);
        photosArray = await response.json();
        console.log(photosArray);
        showPhotosInDOM();
    } catch (error) {
        console.log(error);
    }
};

fetchPhotos();
