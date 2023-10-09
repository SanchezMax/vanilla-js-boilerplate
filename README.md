# Telegram Mini App - Weather Forecast
This is a basic and straightforward Telegram Mini App(TMA) implemented using plain JavaScript, HTML, and CSS. This project is based on [this template](https://github.com/twa-dev/vanilla-js-boilerplate). It aims to provide a minimalistic example of how to create a simple TMA and launch it within Telegram without relying on complex build tools or bleeding-edge libraries. Also, this project uses API for searching cities and getting weather information. Server side of this project is [here](https://github.com/SanchezMax/weather-tma-backend.git).

- You can launch app with a bot menu button: https://t.me/justANiceTgBot
- Deployment URL: https://sanchezmax.github.io/weather-tma/

## Features
- Minimalistic user interface.
- No external libraries or frameworks used.
- Easy to understand and modify.

## Getting Started

### Prerequisites

To run this example, you'll need a modern web browser with JavaScript enabled.

### Before installation

1. Get your API key for cities autocompletion on https://myprojects.geoapify.com

2. Get your API key for getting weather information on https://openweathermap.org/

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/SanchezMax/weather-tma.git

2. Navigate to the project directory:

	```bash
	cd weather-tma

Open project in your preferred code editor or IDE.

### Usage
1. Open project in your preferred code editor or IDE.
2. Insert your API key from "Before installation" step 1 in autocomplete.js (comment "Your GeoApify API key here").
3. Insert your API key from "Before installation" step 2 in weather.js (comment "Your OpenWeatherMap API key here").
4. Make your changes
5. Create your own GitHub repository, commit and push your updates.
6. Go to your repository GitHub page and open Settings. Check the Pages tab and Build and deployment section. If GitHub Actions option was selected, assets should be deployed to Pages and there will be an URL like `https://<username>.github.io/weather-tma/`. You can copy this URL and use it with [BotFather](https://t.me/BotFather) bot to create your very own TMA.

### Customization
Feel free to customize this web app to suit your needs. You can modify the HTML, CSS, and JavaScript files as required.

## Contributing
If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your branch to your fork.
5. Create a pull request to the main repository's main branch.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
