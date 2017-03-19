# mocha-gitlab-reporter

 ![code style standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)

Delivering mocha results from CI to Gitlab. 📋

## Install
```bash
$ npm install --save-dev mocha-gitlab-reporter
```

## Usage
Setup environment variables.

| ENVIRONMENT VARIABLE | EXAMPLE |
|----------------------|---------|
| GITLAB_ACCESS_TOKEN | XXXXX |
| GITLAB_REPO_SLUG | argonlaser/mocha-gitlab-reporter |
| REPORT_TITLE | Mocha report for Build $BUILD_NUMBER |
| REPORT_ALWAYS | true |
| REPORT_FORMATTER | `all-suites` (default). See below for more. |

Run mocha.

```bash
$ mocha --reporter mocha-gitlab-reporter tests/
```
## Reports
Any one of the following report formats could be setup by specifying it as `REPORT_FORMATTER` environment variable.

## Contribute
- Bug fixes.
- Adding new formatters.

[Open issue](https://github.com/argonlaser/mocha-gitlab-reporter/issues/new) to discuss more.

## Thanks
> "Thanks for taking time to evaluate `mocha-gitlab-reporter`. It means a lot to this project."

## Credits
[mocha-github-reporter](https://github.com/scriptnull/mocha-github-reporter/)
