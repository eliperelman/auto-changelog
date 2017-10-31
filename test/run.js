/* eslint-disable no-unused-expressions */

import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import run, { __Rewire__ as mock } from '../src/run'

chai.use(chaiAsPromised)

describe('run', () => {
  it('does not error', () => {
    mock('writeFile', () => {})
    mock('cmd', () => {})
    expect(run()).to.be.fulfilled
  })
})
