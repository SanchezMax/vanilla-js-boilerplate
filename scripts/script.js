// Init TWA
Telegram.WebApp.ready();

var cityToSave

// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
Telegram.WebApp.onEvent('themeChanged', function () {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Show main button
Telegram.WebApp.MainButton.setParams({
    text: 'Finish bot'
});
Telegram.WebApp.MainButton.onClick(function () {
    let data = { city: cityToSave }

    Telegram.WebApp.sendData(JSON.stringify(data));
    Telegram.WebApp.close();
});

Telegram.WebApp.BackButton.onClick(function () {
    togglePage();
});

// Function to toggle main TWA button
function toggleMainButton() {
    if (Telegram.WebApp.MainButton.isVisible) {
        Telegram.WebApp.MainButton.hide();
    } else {
        Telegram.WebApp.MainButton.show();
    }
};

// Function to toggle back TWA button
function toggleBackButton() {
    if (Telegram.WebApp.BackButton.isVisible) {
        Telegram.WebApp.BackButton.hide();
    } else {
        Telegram.WebApp.BackButton.show();
    }
}

// Function to toggle page
function togglePage() {
    toggleShowAutocomplete()
    toggleShowWeather()
    toggleMainButton()
    toggleBackButton()
}

Telegram.WebApp.setHeaderColor('bg_color');