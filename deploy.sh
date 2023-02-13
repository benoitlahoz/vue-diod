#!/usr/bin/env sh

set -e

yarn docs:build

cd docs/.vitepress/dist

touch .nojekyll

# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# git push -f git@github.com:benoitlahoz/benoitlahoz.github.io.git master:main

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:benoitlahoz/vue-diod.git gh-pages

cd -