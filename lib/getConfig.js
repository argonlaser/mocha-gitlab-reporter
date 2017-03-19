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

var formatters = require('./getFormatters.js')

module.exports =
{
  reportAlways: (process.env['REPORT_ALWAYS'] === 'true') || false,
  gitlabAccessToken: process.env['GITLAB_ACCESS_TOKEN'],
  gitlabRepoSlug: process.env['GITLAB_REPO_SLUG'],
  gitlabIssueAssignee: process.env['GITLAB_ISSUE_ASSIGNEE'] || undefined,
  reportTitle: process.env['REPORT_TITLE'],
  reportLabels: process.env['REPORT_LABELS'] || undefined,
  formatter: formatters[process.env['REPORT_FORMATTER']] || formatters['all-suites'],
  passedEmoji: process.env['PASSED_EMOJI'] || 'white_check_mark',
  failedEmoji: process.env['FAILED_EMOJI'] || 'x'
}
