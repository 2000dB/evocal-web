#!/bin/bash

echo -e "deploying site public updates to github"

#grunt

git add public/* -f

msg="deploy site `date`"
if [ $# -eq 1 ]
    then msg="$1"
fi

git commit -m "$msg"
git push origin master
git subtree push --prefix=public origin gh-pages
