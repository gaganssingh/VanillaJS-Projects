// Base url for quotes api
const baseUrl = `https://api.quotable.io`;
// quotes api documentation available at https://github.com/lukePeavey/quotable

// FUNCTIONS
// fetch quote from api
getQuote = async () => {
    try {
        const response = await fetch(`${baseUrl}/random`);
        const data = await response.json();
    } catch (error) {
        getQuote();
        console.log("Something went wrong :(", error);
    }
};

// On page load
getQuote();
