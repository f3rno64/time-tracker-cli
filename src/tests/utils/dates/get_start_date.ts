/* eslint-env mocha */

import { expect } from 'chai'
import { getStartOfDayDate } from '../../../dates'

describe('utils:dates:get_start_date', () => {
  it('returns a date set to the start of the provided date', () => {
    const date = new Date()
    const result = getStartOfDayDate(date)

    expect(result.getFullYear()).to.equal(date.getFullYear())
    expect(result.getMonth()).to.equal(date.getMonth())
    expect(result.getDay()).to.equal(date.getDay())
    expect(result.getHours()).to.equal(0)
    expect(result.getMinutes()).to.equal(0)
    expect(result.getSeconds()).to.equal(0)
    expect(result.getMilliseconds()).to.equal(0)
  })
})
