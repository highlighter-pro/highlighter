source "${HOME}"/.bashrc;
source ./.env;

rm -rf ./node_modules package.json package-lock.json
npm init -y
#npm pkg set 'version'='0.0.1';

# webpack
npm install --save-dev webpack webpack-cli
npm pkg set 'scripts.build'='webpack --config webpack/webpack.config.cjs';

# copy-webpack-plugin
# https://webpack.js.org/plugins/copy-webpack-plugin/
# Copies individual files or entire directories, which already exist, to the build directory.
npm install --save-dev copy-webpack-plugin

# (if needed) html-webpack-plugin
# https://www.npmjs.com/package/html-webpack-plugin
# https://webpack.js.org/plugins/html-webpack-plugin/
# npm i --save-dev html-webpack-plugin

# TypeScript and Webpack TypeScript loader
# https://webpack.js.org/guides/typescript/
npm install --save-dev typescript ts-loader

# [chrome-types]
# https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#types
# https://www.npmjs.com/package/chrome-types
# https://github.com/GoogleChrome/chrome-types
# [Chrome Extension with Typescript, to use @types/chrome, or chrome-types](https://stackoverflow.com/questions/76319798/chrome-extension-with-typescript-to-use-types-chrome-or-chrome-types)
# https://stackoverflow.com/a/77146966/1697878
# npm install --save-dev chrome-types
# [@types/chrome]
# https://www.npmjs.com/package/@types/chrome
# https://github.com/DefinitelyTyped/DefinitelyTyped
npm install --save-dev @types/chrome

# range-serializer
# A library for serializing and deserializing browser Range objects.
# The code is based on the rangy library (specifically the rangy/lib/rangy-serializer module).
# This library refactors it with modern ES syntax and TypeScript.
# https://www.npmjs.com/package/range-serializer
# https://github.com/qiushiyan/range-serializer
npm install range-serializer

# React
# https://react.dev/learn/add-react-to-an-existing-project
# https://react.dev/learn/typescript#adding-typescript-to-an-existing-react-project
npm install react react-dom @types/react @types/react-dom

# Font Awesome for React
# https://fontawesome.com/docs/web/use-with/react/
# https://fontawesome.com/docs/web/use-with/react/style 
# see:
# https://fontawesome.com/search?o=r&m=free&s=solid (1390 icons)
# https://fontawesome.com/search?o=r&m=free&s=regular (163 icons)
# https://fontawesome.com/search?o=r&f=brands (484 icons)
npm install @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome@latest @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons # @fortawesome/free-brands-svg-icons

# Markdown component for React
# https://github.com/remarkjs/react-markdown
# + https://github.com/remarkjs/remark-gfm
npm install react-markdown remark-gfm

# Firebase
npm install firebase
# get app config data from Firebase - register new project and add an app to this project
# https://console.firebase.google.com