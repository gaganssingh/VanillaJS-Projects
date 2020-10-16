// SELECTORS
const toggleSwitch = document.querySelector("input[type='checkbox']");

// FUNCTIONS
switchTheme = (event) => {
    if (event.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
};

// EVENT LISTENERS
toggleSwitch.addEventListener("change", switchTheme);
