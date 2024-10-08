# WestPeak Research Association Website

Static site built with Gatsby, React and JavaScript.

### How to Run Locally

First install all dependencies (force is required to clear conflicts from a legacy dependency we use).

```sh
npm install --force
```

Export the Google Analytics tracking ID (use random characters if it is a test build)

```sh
export GA_TRACKING_ID="."
```

Then, run the development server.

```sh
gatsby develop
```

Now you can access the site at `localhost:8000`.

### Automation Scripts

New JA/SA members can be created using the automation scripts. Using `rbenv` with Ruby 3.3.0,
you can run `ruby member.rb` and follow the instructions for quick creation of new members.

More scripts to come.

### Deployment

The GitHub master branch is configured to automatically deploy to Netlify. Check Netlify for 
build logs or in case of failures.
