// SELECTORS
const imageContainer = document.getElementById("image-container");
const loadingSpinner = document.getElementById("loader");

// STATE
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let pageNumber = 1;

let noOfPhotosToFetch = 5;
const imageUrl = `https://picsum.photos/v2/list`;

// FUNCTIONS
// Helper function
setAttributes = (el, attributes) => {
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
};

// Helper Function
imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
};

// Add photos to DOM
showPhotosInDOM = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
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

        // Check when loading has finished
        img.addEventListener("load", imageLoaded);

        // Put <img> inside <a> element -> Then <a> inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

// FLorem Picsum API
fetchPhotos = async (pageNumber = 1) => {
    try {
        const response = await fetch(
            `${imageUrl}/?limit=${noOfPhotosToFetch}&page=${pageNumber}`
        );
        photosArray = await response.json();
        console.log(photosArray);
        showPhotosInDOM();
    } catch (error) {
        console.log(error);
    }
};

// If user scrolled to the bottom, fetch more images from
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 1000 &&
        ready
    ) {
        ready = false;
        pageNumber++;
        noOfPhotosToFetch = 30;
        fetchPhotos(pageNumber);
    }
});

fetchPhotos();
