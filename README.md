
# Highlighter.pro 

This is a Chrome extension for highlighting text on webpages and (optionally) adding notes.

It's very lightweight and very fast. It makes maximum use of the browser's built-in capabilities and does not overload pages with its own scripts.

It does not transfer your highlights and notes to remote server, does not require permission to send/receive data to internet, and does not transfer any data to Internet. 

See introduction [video on YouTube](https://www.youtube.com/watch?v=2SCs8qEbkGI)

## Installation 

### From the Chrome Web Store

To install ```highlighter.pro``` from the Chrome Web Store open this [page](https://chromewebstore.google.com/detail/highlighterpro/gpdhplhmppgenpnkfilghnjiodfmnoap) 
and click on [Add to Chrome] button.

If you have tabs already opened, you have to reload/refresh these tabs to use extension on them.

### From the .zip file on GitHub

Download the latest .zip file from the [releases](https://github.com/highlighter-pro/highlighter/releases) section for the code repo.

Unzip it to local folder.

Go to [extensions](chrome://extensions/) page in Chrome browser.

Turn on 'Developer mode' (in the top right corner)

Click on the 'Load unpacked' button on the left right corner and choose the directory/folder where you have extracted downloaded .zip file.
This will install extension in your browser. 

If you have tabs already opened, you have to reload/refresh these tabs to use extension on them.

### From the source code 

You need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) installed on your machine. 

Download source code from GitHub: 

```shell
git clone https://github.com/highlighter-pro/highlighter.git  
```

Go to downloaded folder

```shell
cd highlighter/
```

and build the extension:

```shell
npm install 
npm run-script build 
```

This will create  ```dist``` folder with the extension production code. 

Go to [extensions](chrome://extensions/) page in Chrome browser.

Turn on 'Developer mode' (in the top right corner)

Click on the 'Load unpacked' button on the left right corner and choose the ```dist``` folder you just created. This will install extension in your browser. If you have tabs already opened, you have to reload/refresh these tabs to use extension on them. 

## Features:

* You can add (and remove) highlights on web page using browser's context menu.
* This extension uses browser's side panel to show list of highlights and notes
* You can add or edit notes to highlights in side panel
* Notes to highlights can be written in [GitHub flavored](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) Markdown. It means you can format text, add notes, task lists, code blocks etc.
* Highlights and notes can be saved to a backup file and then restored on another computer on in another Chrome browser. For this use extension's options page.
* Dark and light theme for side panel and options page. 
* On extension's 'options' page you can remove all your highlights and notes in current browser (it's recommended to save a backup file before)

## How to save and restore backup 

Right-click on the extension icon > choose 'options' > use corresponding buttons to save and restore backup file. 

## Where it does not work 

Highlights may not be shown on web pages, where content is changing, like Facebook, X.com etc. 
Your highlights will be saved and shown in the browser's side panel for such pages, but highlights may not be shown on the page itself.

It does not work on [Chrome Web Store](https://chromewebstore.google.com) website. 

## Support

For support go to: [Issues](https://github.com/highlighter-pro/highlighter/issues) 