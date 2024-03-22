
chmod +x *.sh

./git-setup.sh

./add-packages.sh

# create directories
mkdir -p ./src ./webpack ./public/images

touch ./tsconfig.json ./public/manifest.json ./public/sidepanel.html ./webpack/webpack.config.js ./src/background.ts

