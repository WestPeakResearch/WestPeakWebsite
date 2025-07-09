# WestPeak Research Association Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/a20733cc-ea2e-4fc8-97ac-d1b91270ad1f/deploy-status)](https://app.netlify.com/projects/westpeak/deploys)

Static site built with Gatsby, React and JavaScript.

<img width="1423" alt="Screenshot 2025-02-22 at 4 22 37 PM" src="https://github.com/user-attachments/assets/c4dbfeff-ff7e-4f79-aff5-4be795ca80bf" />

### How to Run Locally

Requires `node` and `npm` on the development machine. Production environment currently runs
Node v22.13.0, development is recommended on this specific version. Changing Node versions
can be done with `n` (install using `npm install -g n` and then run `n 22.13.0`).

First install all dependencies

```sh
npm install
```

Then, run the development server.

```sh
npm run develop
```

Now you can access the site at `localhost:8000`.

### Automation Scripts

New JA/SA members can be created using the automation scripts. Using `rbenv` with Ruby 3.3.0,
you can run `ruby member.rb` and follow the instructions for quick creation of new members.

More scripts to come.

### Deployment

The GitHub master branch is configured to automatically deploy to Netlify. Check Netlify for 
build logs or in case of failures.

### Development

Recommended VSCode Extensions:

- JavaScript and TypeScript: https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next
- GraphQL LSP: https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql

Use of Copilot is recommended.

TypeScript note: GraphQL Types are only generated when `develop` is run. If you seem to be missing GraphQL types,
run `npm run develop`.
