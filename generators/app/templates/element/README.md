# <%= element_name %>

<%= element_description %>

## Trust the local SSL certificate

You need to locally trust the SSL certificates in this project:

- You can find the certificates in `/ssl` folder.
- Open up Keychain Access. You can get to it from `Application/Utilities/Keychain Access.app`.
- Drag your certificate into Keychain Access.
- Go into the Certificates section and locate the certificate you just added
- Double click on it, enter the trust section and under "When using this certificate" select "Always Trust".

## Install

```bash
npm install
```

## Develop

The element is `<%= element_name %>.html` in the root directory of this project.

## Run

```bash
npm run start-dev
```

and visit: https://localhost:<%= port %>

## Test

Ensure you have the latest [Firefox][firefox] installed, then:

```bash
npm test
```

Unit tests are currently only run on Firefox due to a Chrome issue.

You can also run tests in any browser by visiting https://localhost:<%= port %>/test while `$ npm run start-dev` is running.
The test results are in the browser console.

## Deploy

This element is set up to be deployed on [Heroku][heroku].

Just create a Heroku app using the NodeJS buildpack, connect Github deployment
and make sure that Heroku runs the `$ npm start` script.

## License

MIT

## Authors

[@<%= author %>][<%= author %>]

[firefox]: https://firefox.com
[heroku]: https://heroku.com
[<%= author %>]: https://github.com/<%= author %>
