/*
* MIT License
*
* Copyright (c) 2017 Vishnu Bharathi

* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:

* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

var mocha = require('mocha')
var _ = require('underscore')
var superagent = require('superagent')
var fs = require('fs')
var leftPad = require('left-pad')
var path = require('path')
var getTemplateContent = require('./lib/getTemplateContent.js')
var gitlabCreateIssue = require('gitlab-create-issue')

module.exports = GitlabReporter

function GitlabReporter (runner, options) {
  var self = this
  self.passedTests = []
  self.failedTests = []
  self.config = require('./lib/getConfig.js')
  self.rootSuite = null
  self.suiteLevel = 0

  mocha.reporters.Base.call(this, runner)

  runner.on('start', function () {
    console.log(':: Mocha Gitlab Reporter ::')
  })

  runner.on('suite', function (suite) {
    if (self.suiteLevel === 0) {
      self.rootSuite = suite
    }
    self.suiteLevel++
  })

  runner.on('suite end', function () {
    self.suiteLevel--
  })

  runner.on('pass', function (test) {
    self.passedTests.push({test: test})
  })

  runner.on('fail', function (test, err) {
    self.failedTests.push({test: test, error: err})
  })

  runner.on('end', function () {
    var config = self.config

    var opts = {
      passedTests: self.passedTests,
      failedTests: self.failedTests
    }

    var overallContent = getTemplateContent(path.join(__dirname, './templates/overall.template'), opts)
    config.reportContent = overallContent + config.formatter(self.rootSuite, 0, self.failedTests)
  })
}

GitlabReporter.prototype.done = function () {
  var self = this
  if (_.isEmpty(self.failedTests) && (self.config.reportAlways === false)) {
    console.log('Pass - ' + self.passedTests.length)
    console.log('Failure - ' + self.failedTests.length)
    console.log('Total - ' + (self.passedTests.length + self.failedTests.length))
    console.log('Skipping report, due to 0 failures. To report always, set REPORT_ALWAYS=true env.')
    console.log()
    process.exit(0)
  }

  var mandatoryPayload = {
    namespace: self.config.gitlabRepoSlug.split('/')[0],
    project: self.config.gitlabRepoSlug.split('/')[1],
    privateToken: self.config.gitlabAccessToken,
    title: self.config.reportTitle
  }

  var optionalPayload = {
    description: self.config.reportDescription,
    assigneeName: self.config.gitlabIssueAssignee,
    labels: self.config.reportLabels
  }

  gitlabCreateIssue(mandatoryPayload, optionalPayload, function (err, res) {
    if (err) {
      // Handle error
      console.error('Error creating issue in the repository')
      console.error(err.text)
      process.exit(1)
    }
    // Do something with response
    console.log('Pass - ' + self.passedTests.length)
    console.log('Failure - ' + self.failedTests.length)
    console.log('Total - ' + (self.passedTests.length + self.failedTests.length))
    console.log()

    console.log('Report created => ' + res.body.web_url)

    process.exit(_.isEmpty(self.failedTests) ? 0 : 1)
  })
}
