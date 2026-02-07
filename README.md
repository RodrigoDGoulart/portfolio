# Rodrigo Goulart Portfolio

This repository contains the source code of my personal portfolio, created to present my background, education, professional experience, and projects I developed or actively participated in. It allows content changes without necessarily modifying the code itself—only by editing JSON files and also provides support for both English and Portuguese.

## Running the Project

1. Make sure your environment is properly set up with Node.js installed (the project was developed using Node.js version `20.19.0` and npm version `10.8.2`).

2. Download the repository by ZIP file or Git.

```bash
git clone https://github.com/RodrigoDGoulart/portfolio.git
```

3. Enter the project folder and install the required dependencies.

```bash
cd portfolio

npm install
```

4. After installing the dependencies, simply run the project. By default, it runs on port 5173.

```bash
npm run dev
```

## Configuration

1. Adjusting translations

The project uses i18n. If you need to add new translated texts, simply edit the JSON files for each language.

- Portuguese (pt-BR): [src/i18n/locales/pt/translation.json](src/i18n/locales/pt/translation.json)
- English: [src/i18n/locales/en/translation.json](src/i18n/locales/en/translation.json)

2. Adjusting portfolio information

More specific information (name, projects, professional experience, etc.) is defined in the following JSON files:

- Portfolio information (Brazilian Portuguese): [src/assets/portfolioData/infos.pt.json](src/assets/portfolioData/infos.pt.json)
- Portfolio information (English): [src/assets/portfolioData/infos.en.json](src/assets/portfolioData/infos.en.json)
