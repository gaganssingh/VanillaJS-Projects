// SELECTORS
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// FUNCTIONS
// Convert Text-to-speech using VoiceRSS api
speakJoke = (joke) => {
    VoiceRSS.speech({
        key: "f7bd90df322747108b92a98ba04d44b9",
        src: joke,
        hl: "en-ca",
        v: "Linda",
        r: 2,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
};

// Fetch joke from joke api
// Then tell the joke
fetchJoke = async () => {
    const jokeApiUrl =
        "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=single";
    try {
        // fetch joke
        const response = await fetch(jokeApiUrl);
        const data = await response.json();

        // Tell joke
        speakJoke(data.joke);

        // Disable Button
        toggleButton();
    } catch (error) {
        console.log(error);
    }
};

// Enable / disable the button
toggleButton = () => {
    button.disabled = !button.disabled;
};

// EVENT HANDLERS
button.addEventListener("click", fetchJoke);
audioElement.addEventListener("ended", toggleButton);
