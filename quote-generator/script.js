// SELECTORS
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Base url for quotes api
// quotes api documentation available at https://github.com/lukePeavey/quotable
const baseUrl = `https://api.quotable.io`;

// FUNCTIONS
// fetch quote from api
getQuote = async () => {
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
    } catch (error) {
        getQuote();
        console.log("Something went wrong :(", error);
    }
};

// On page load
getQuote();
