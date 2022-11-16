# generator-polymer-1-element

Generate [Polymer 1.x][polymer-1] elements with HTTPS support

## Install

```bash
$ npm install -g yo
$ npm install -g generator-polymer-1-element
```

## Create repo

Create the Github repository, clone it and `cd` into it.

## Generate element

```bash
$ yo polymer-1-element
# and follow the instructions
```

## Trust the local SSL certificate

You need to *locally* trust the SSL certificate:

- You can find the certificates in `/ssl` folder of the generated element.
- Open up Keychain Access. You can get to it from `Application/Utilities/Keychain Access.app`.
- Drag your certificate into Keychain Access.
- Go into the Certificates section and locate the certificate you just added
- Double click on it, enter the trust section and under "When using this certificate" select "Always Trust".

You don't need to trust this certificate for *every* generated element.
Trust it once and it will work for all subsequent generated elements.

## Deploy

The generated element is set up to be deployed on [Heroku][heroku].

Just create a Heroku app using the NodeJS buildpack, connect Github deployment
and make sure that Heroku runs the `$ npm start` script.

## License

MIT

## Authors

[@nicholaswmin][nicholasmin]

[polymer-1]: https://polymer-library.polymer-project.org/1.0/docs/about_10
[heroku]: https://heroku.com
[nicholasmin]: https://github.com/nicholaswmin
