import { describe, it } from 'mocha'
import { expect } from 'chai'

import { fetchOrigin, __Rewire__, __ResetDependency__ } from '../src/origin'

const origin = {
  github: {
    hostname: 'github.com',
    repoURL: 'https://github.com/user/repo'
  },
  gitlab: {
    hostname: 'gitlab.com',
    repoURL: 'https://gitlab.com/user/repo'
  },
  bitbucket: {
    hostname: 'bitbucket.org',
    repoURL: 'https://bitbucket.org/user/repo'
  }
}

const TEST_DATA = [
  {
    remote: 'https://github.com/user/repo',
    expected: origin.github
  },
  {
    remote: 'https://github.com:8080/user/repo',
    expected: origin.github
  },
  {
    remote: 'git@github.com:user/repo.git',
    expected: origin.github
  },
  {
    remote: 'https://gitlab.com/user/repo',
    expected: origin.gitlab
  },
  {
    remote: 'git@gitlab.com:user/repo.git',
    expected: origin.gitlab
  },
  {
    remote: 'https://bitbucket.org/user/repo',
    expected: origin.bitbucket
  },
  {
    remote: 'git@bitbucket.org:user/repo.git',
    expected: origin.bitbucket
  }
]

describe('fetchOrigin', () => {
  for (let test of TEST_DATA) {
    it(`parses ${test.remote}`, async () => {
      __Rewire__('cmd', () => test.remote)

      expect(await fetchOrigin('origin')).to.include(test.expected)

      __ResetDependency__('cmd')
    })
  }
})
