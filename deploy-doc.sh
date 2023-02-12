#!/bin/sh

yarn docs:build

git subtree push --prefix docs/.vitepress/dist main gh-pages