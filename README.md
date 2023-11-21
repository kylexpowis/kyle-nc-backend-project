# Northcoders News API

To get started, clone the repo and then create your own new repository

You will be working on each ticket on a new branch.
To create and switch to a new git branch, use the command:
git checkout -b <new branch name>
This will create a branch and move over to that branch. (Omit the -b flag if you wish to switch to an already existing branch).

You should name the branch after the task number and feature that it implements, e.g. 2-get-topics or 4-get-article-by-id.

When pushing the branch to GitHub, ensure that you make reference to the branch you are pushing to on the remote. For example:

git push origin 2-get-topics.

From GitHub, you can make a pull request and share the link and ticket number via a pull request specific nchelp using the command nchelp pr. A tutor will review your code on GitHub, so keep an eye on your email notifications. Support through nchelp will be available, but mentors will be prioritising pull requests and so nchelp should be used as a last resort.

Once a pull request been accepted, be sure to switch back to the main branch and pull down the updated changes.

git checkout main

git pull origin main

To ensure we are not committing broken code, this project makes use of git hooks. Git hooks are scripts triggered during certain events in the git lifecycle. Husky is a popular package that allows us to set up and maintain these scripts. This project makes use of a pre-commit hook. When we attempt to commit our work, the script defined in the pre-commit file will run. If any of our tests fail, then the commit will be aborted.

The Husky documentation explains how to configure Husky for your own project, as well as creating your own custom hooks.

You will need to make your own public repo so that you can share this project as part of your portfolio by doing the following:

Create a new public GitHub repository. Do not initialise the project with a readme, .gitignore or license.

From your cloned local version of this project you'll want to push your code to your new repository using the following commands:

git remote set-url origin YOUR_NEW_REPO_URL_HERE
git branch -M main
git push -u origin main

Creating the database:
You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

You'll need to run npm install at this point.

You have also been provided with a db folder with some data, a setup.sql file and a seeds folder.

Please take some to familiarise yourself with the project structure. The seed function has been written for you, but you should take a look at the table creations to see the structure of the database you'll be working with. You should also take a minute to familiarise yourself with the npm scripts you have been provided.

The job of index.js in each of the data folders is to export out all the data from that folder, currently stored in separate files. This is so that, when you need access to the data elsewhere, you can write one convenient require statement to the index file, rather than having to require each file individually. Think of it like the index of a book - a place to refer to! Make sure the index file exports an object with values of the data from that folder with the keys:

topicData
articleData
userData
commentData

