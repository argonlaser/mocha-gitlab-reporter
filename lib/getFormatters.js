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

var _ = require('underscore')
var leftPad = require('left-pad')
var getTemplateContent = require('./getTemplateContent.js')
var path = require('path')

var formatters = {
  'all-suites': function (suite, level, failedTests) {
    try {
      var suiteContent = ''
      if (level === 0) {
        suiteContent += '### Report\n'
        suiteContent += '```\n'
      }

      suiteContent += leftPad(suite.title, (suite.title.length + (level * 2))) + '\n'

      _.each(suite.tests, function (test) {
        var testString = '[' + test.state + '] ' + test.title
        suiteContent += leftPad(testString, (testString.length + (level * 4))) + '\n'
      })

      _.each(suite.suites, function (innerSuite) {
        suiteContent += formatters['all-suites'](innerSuite, level + 1)
      })

      if (level === 0) {
        suiteContent += '```\n'
        suiteContent += getTemplateContent(path.join(__dirname, '../templates/failed-ordered-list-with-error.template'), {
          failedTests: failedTests
        })
      }
      return suiteContent
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  },
  'all-suites-emoji': function (suite, level, failedTests) {
    try {
      var passedEmoji = process.env['PASSED_EMOJI'] || 'white_check_mark'
      var failedEmoji = process.env['FAILED_EMOJI'] || 'x'
      var suiteContent = ''

      var suiteTitle = ''

      if (level === 0) {
        suiteContent += '### Report\n'
      }

      if (level !== 0) {
        suiteTitle = ':open_file_folder: __' + suite.title + '__'
      }

      suiteContent += leftPad(suiteTitle, (suiteTitle.length + (level * 2)), '-') + '\n'

      var getEmoji = function (testState) {
        return testState === 'passed' ? passedEmoji : failedEmoji
      }

      _.each(suite.tests, function (test) {
        var testString = ':' + getEmoji(test.state) + ': ' + test.title
        suiteContent += leftPad(testString, (testString.length + (level * 4)), '-') + '\n'
      })

      _.each(suite.suites, function (innerSuite) {
        suiteContent += formatters['all-suites-emoji'](innerSuite, level + 1)
      })

      if (level === 0) {
        suiteContent += getTemplateContent(path.join(__dirname, '../templates/failed-ordered-list-with-error.template'), {
          failedTests: failedTests
        })
      }

      return suiteContent
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  },
  'failed-checklist': function (suite, level, failedTests) {
    try {
      var reportContent = getTemplateContent(path.join(__dirname, '../templates/failed-checklist-with-error.template'), {
        failedTests: failedTests
      })
      return reportContent
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  }
}
module.exports = formatters
