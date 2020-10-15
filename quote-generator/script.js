// SELECTORS
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// FUNCTIONS
// Show Loader
showLoader = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

// Hide Loader
hideLoader = () => {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
};

// fetch quote from api
getQuote = async () => {
    // Show loading spinner until data is fetched and inserted into DOM
    showLoader();

    // Base url for quotes api
    // quotes api documentation available at https://github.com/lukePeavey/quotable
    const baseUrl = `https://api.quotable.io`;

    try {
        const response = await fetch(`${baseUrl}/random`);
        const data = await response.json();
        console.log(data);

        // Display quote & author texts in the DOM
        authorText.innerText = data.author;
        quoteText.innerText = data.content;

        if (data.content.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }

        // Hide loading spinner and display quote
        hideLoader();
    } catch (error) {
        getQuote();
        console.log("Something went wrong :(", error);
    }
};

// Tweet quote on button press
tweetQuote = () => {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, "_blank");
};

// EVENT LISTENERS
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On page load
getQuote();
