// SELECTORS
const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// FUNCTIONS
selectMediaStream = async () => {
    try {
        // Promt user to select stream source
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        // Feed selected source into the DOM video element
        videoElement.srcObject = mediaStream;
        // Start playing the video of the stream
        videoElement.onloadedmetadata = () => videoElement.play();
    } catch (error) {
        console.log("Something went wrong...", error);
    }
};

button.addEventListener("click", async () => {
    // Disable button
    button, (disabled = true);

    // Start Picture in Picture
    await videoElement.requestPictureInPicture();

    // Reset Button
    button.disabled = false;
});

// On App Load
selectMediaStream();
