# ChatGPT Email Reviewer

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Contributing](https://img.shields.io/badge/Contributing-Guidelines-blue)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-Respectful-orange)](CODE_OF_CONDUCT.md)
[![Visitors](https://visitor-badge.glitch.me/badge?page_id=bencgreenberg.chatgpt-gmail-suggestions-chrome-extension)](https://github.com/bencgreenberg/chatgpt-gmail-suggestions-chrome-extension)
[![Made with Love](https://img.shields.io/badge/Made%20with-Love-ff69b4.svg)](https://shields.io/)

This is a Chrome extension that integrates with Gmail to review email drafts using ChatGPT. The extension allows users to select different writing styles for their emails, such as friendly, business, authoritative, personal, casual, serious, and lighthearted. It then uses ChatGPT to analyze and provide suggestions for the email draft based on the chosen writing style.

## Installation
To use this extension, you'll need to install it on your Google Chrome browser or any Chromium-based browser. Follow the steps below:

Download or clone the project from GitHub:

```bash
git clone https://github.com/bencgreenberg/chatgpt-gmail-suggestions-chrome-extension
```

Open the Extensions page in Chrome by navigating to `chrome://extensions/`.

Enable "Developer mode" in the top right corner of the Extensions page.

Click the "Load unpacked" button and select the project directory that you cloned or downloaded.

The extension is now installed and ready to use in your Gmail account.

### Configuration

Before you can use the extension, you'll need to set up a few configuration variables:

#### OpenAI API Key

The extension uses the OpenAI API to analyze the email drafts and provide suggestions. To use the API, you'll need an API key from OpenAI. You can obtain an API key by [creating an account on the OpenAI website](https://beta.openai.com/signup/).

To configure the API key, click the extension icon in your browser's toolbar and enter your OpenAI API key in the provided input field. After entering the API key, click the "Save Settings" button to save it for future use.

#### Signature Delimiter

If your email signature is automatically appended to your email drafts in Gmail, you can specify a delimiter to distinguish the signature from the main content of the email. The extension will use this delimiter to exclude the signature from the analysis.

To configure the signature delimiter, click the extension icon in your browser's toolbar and enter the delimiter in the provided input field. Then click the "Save Settings" button.

## Usage

To use the extension, compose a new email draft in Gmail. After writing the email draft, click the extension icon in your browser's toolbar. Select the desired writing style(s) for your email and click the "Review Email" button.

The extension will analyze your email draft using ChatGPT and provide suggestions based on the chosen writing style. You can then choose to use the suggestions to improve your email draft.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.