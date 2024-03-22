source "${HOME}"/.bashrc;
source ./.env;

git init
git config --local user.name "$GIT_USER_NAME";
git config --local user.email "$GIT_USER_EMAIL";

#git config --list --local;

ssh-add -D # delete all identities
ssh-add "${GITLAB_KEY_PATH}";
ssh-add "${GITHUB_KEY_PATH}";

# https://docs.gitignore.io/install/command-line
git config --local alias.ignore '!gi() { curl -sL https://www.toptal.com/developers/gitignore/api/$@ ;}; gi';

{
echo "### This project specific ###"
echo ""
echo ".env"
echo "dev-notes.md"
echo ""
} > .gitignore; # replaces .gitignore if it exists

git ignore linux,windows,macos,jetbrains,kate,sublimetext,visualstudiocode,node >> .gitignore;

# add remote repositories:

# GitLab
# GitLab can create new private repo on first push (see https://stackoverflow.com/a/64656788/1697878)
# if you run: git remote add gitlab "git@gitlab.com:${namespace/gitlabUser}/${appName}.git" && git push -u gitlab master
# https://docs.gitlab.com/ee/user/project/
#git remote add gitlab "git@gitlab.com:${GIT_USER_NAME}/${APP_NAME}.git"
git remote add gitlab "git@gitlab.com:${GITLAB_NAMESPACE}/${APP_NAME}.git"

git push --set-upstream gitlab main

# GitHub
git remote add github "git@github.com:${GITHUB_NAMESPACE}/${APP_NAME}.git"
git push --set-upstream github main

# see: https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories
# git remote add origin git@github.com:<user>/<repo>.git
# git push --set-upstream origin master
# git push --set-upstream origin main

git config --list --local;