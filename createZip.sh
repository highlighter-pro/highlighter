
# (!) first change mode to 'production' in webpack config and update version in manifest and package.json

npm run-script build
rm -rf ./zip/*
cd ./dist
zip -r ../zip/highlighter.zip *
cd -

