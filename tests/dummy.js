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

var assert = require('assert')

describe('Animal module', function () {
  describe('Dog module', function () {
    it('should bark', function () {
      var sound = 'boww'
      assert.equal('boww', sound, 'Dog is not barking')
    })
    it('should use linux', function () {
      throw new Error('dog says no idea !')
    })
  })
  describe('Cat module', function () {
    it('should meow', function () {
      var sound = 'meow'
      assert.equal('meow', sound, 'Unable to meow')
    })
  })

  it('should have 5 senses', function () {
    var senses = 5
    assert.equal(4, senses, 'Out of sense')
  })
})
