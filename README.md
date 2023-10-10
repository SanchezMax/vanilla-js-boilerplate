# Telegram Mini App - Weather Forecast
This is a basic and straightforward Telegram Mini App(TMA) implemented using plain JavaScript, HTML, and CSS. This project is based on [this template](https://github.com/twa-dev/vanilla-js-boilerplate). It aims to provide a minimalistic example of how to create a simple TMA and launch it within Telegram without relying on complex build tools or bleeding-edge libraries. Also, this project uses API for searching cities and getting weather information. 

- You can launch app with a bot menu button: https://t.me/justANiceTgBot
- Deployment URL: https://sanchezmax.github.io/weather-tma/

Server side of this project is implemented using Python and a couple of libraries for Telegram Bot API. It aims to provide an example of interaction between TMA, Telegram bot and user.

## Features
- Minimalistic user interface.
- No external libraries or frameworks used at frontend, only necessary at backend.
- Easy to understand and modify.

## Getting Started

### Prerequisites

To run TMA, you'll need a modern web browser with JavaScript enabled.
To run server, you'll need Python installed. You can download it [here](https://www.python.org/downloads/).

### Before installation

1. Get your Telegram Bot API Token for interacting with bot from [BotFather](https://t.me/BotFather).

2. Get your API key for cities autocompletion on https://myprojects.geoapify.com

3. Get your API key for getting weather information on https://openweathermap.org/

### Installation

1. Install pyTelegramBotAPI:

   ```bash
   pip install pyTelegramBotAPI

2. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/SanchezMax/weather-tma.git

3. Navigate to the project directory:

	```bash
	cd weather-tma

Open project in your preferred code editor or IDE.

### Usage
1. Open project in your preferred code editor or IDE.
2. Insert your Token from "Before installation" step 1 in main.py (comment "get your token from BotFather").
3. Insert your API key from "Before installation" step 2 in autocomplete.js (comment "Your GeoApify API key here").
4. Insert your API key from "Before installation" step 3 in weather.js (comment "Your OpenWeatherMap API key here").
5. Make your changes
6. Launch the bot
   ```bash
   cd backend
   python main.py
7. Create your own GitHub repository, commit and push your updates.
8. Go to your repository GitHub page and open Settings. Check the Pages tab and Build and deployment section. If GitHub Actions option was selected, assets should be deployed to Pages and there will be an URL like `https://<username>.github.io/weather-tma/`. You can copy this URL and use it with [BotFather](https://t.me/BotFather) bot to create your very own TMA.

### Potential errors
1. Several times I've faced a problem when autocomplete field don't work properly. Temporary solve is clear input area and enter city name again.
2. For some cities weather page can be empty after city name was entered - because of empty response from an API.

### Customization
Feel free to customize this mini app or server to suit your needs. You can modify the HTML, CSS, JavaScript and Python files as required.

## Contributing
If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your branch to your fork.
5. Create a pull request to the main repository's main branch.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
