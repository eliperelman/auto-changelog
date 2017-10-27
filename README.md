auto-changelog
==============

Command line tool for generating a changelog from git tags and commit history

[![Latest npm version](https://img.shields.io/npm/v/auto-changelog.svg)](https://www.npmjs.com/package/auto-changelog)
[![Build Status](https://img.shields.io/travis/CookPete/auto-changelog/master.svg)](https://travis-ci.org/CookPete/auto-changelog)
[![Greenkeeper](https://img.shields.io/badge/greenkeeper-enabled-brightgreen.svg)](https://greenkeeper.io)
[![Test Coverage](https://img.shields.io/codecov/c/github/cookpete/auto-changelog.svg)](https://codecov.io/gh/CookPete/auto-changelog)


#### Migrating to `1.0.0`

If you are upgrading from `0.x`, the same options are still supported out of the box. Nothing will break, but your changelog may look slightly different:

- The default template is now `compact`
  - If you still want to use the [`keepachangelog`](http://keepachangelog.com) format, use `--template keepachangelog`
- Templates now use `-` instead of `*` for lists
- Up to 3 commits are now shown per release
- Unreleased changes are no longer listed by default, use `--unreleased` to list them
- [GitLab](https://gitlab.com) and [BitBucket](https://bitbucket.org) are now fully supported


### Installation

```bash
npm install -g auto-changelog
```


### Usage

Simply run `auto-changelog` in the root folder of a git repository. `git log` is run behind the scenes in order to parse the commit history.

```bash
Usage: auto-changelog [options]

Options:

  -o, --output [file]        # output file, default: CHANGELOG.md
  -t, --template [template]  # specify template to use [compact, keepachangelog, json], default: compact
  -r, --remote [remote]      # specify git remote to use for links, default: origin
  -p, --package              # use version from package.json as latest release
  -u, --unreleased           # include section for unreleased changes
  -V, --version              # output the version number
  -h, --help                 # output usage information


# Write log to CHANGELOG.md in current directory
auto-changelog

# Write log to HISTORY.md
auto-changelog --output HISTORY.md

# Write log using keepachangelog template
auto-changelog --template keepachangelog

# Write log using custom handlebars template in current directory
auto-changelog --template my-custom-template.hbs
```

#### What you might do if you’re clever

- `npm install auto-changelog --save-dev`
- Add `auto-changelog -p; git add CHANGELOG.md` to the `version` scripts in your `package.json`:

```json
{
  "name": "package",
  "devDependencies": {
    "auto-changelog": "*"
  },
  "scripts": {
    "version": "auto-changelog -p; git add CHANGELOG.md"
  }
}
```

Using `-p` or `--package` uses the `version` from `package.json` as the latest release, so that all commits between the previous release and now become part of that release. Essentially anything that would normally be parsed as `Unreleased` will now come under the `version` from `package.json`

Now every time you run [`npm version`](https://docs.npmjs.com/cli/version), the changelog will automatically update and be part of the version commit.


#### Custom templates

If you aren’t happy with the default templates or want to tweak something, you can point to a [handlebars](http://handlebarsjs.com) template in your local repo. Check out the [existing templates](templates) to see what is possible.

Save `changelog-template.hbs` somewhere in your repo:

```hbs
### Changelog
My custom changelog template. Don’t worry about indentation here; it is automatically removed from the output.

{{#each releases}}
  Every release has a {{title}} and a {{href}} you can use to link to the commit diff.
  It also has an {{isoDate}} and a {{niceDate}} you might want to use.
  {{#each merges}}
    - A merge has a {{message}}, an {{id}} and a {{href}} to the PR.
  {{/each}}
  {{#each fixes}}
    - Each fix has a {{commit}} with a {{commit.subject}}, an {{id}} and a {{href}} to the fixed issue.
  {{/each}}
  {{#limit commits limit="5"}}
    - Commits have a {{shorthash}}, a {{subject}} and a {{href}}, amongst other things.
  {{/limit}}
{{/each}}
```

Then just use `--template` to point to your template:

```bash
auto-changelog --template changelog-template.hbs
```

To see exactly what data is passed in to the templates, you can generate a JSON version of the changelog:

```bash
auto-changelog --template json --output changelog-data.json
```

### FAQ

#### What’s a changelog?
See [keepachangelog.com](http://keepachangelog.com).

#### What does this do?
The command parses your git commit history and generates a changelog based on tagged versions, merged pull requests and closed issues. See a simple example in [this very repo](CHANGELOG.md).

#### Why do I need it?
Because keeping a changelog can be tedious and difficult to get right. If you don’t have the patience for a hand-crafted, bespoke changelog then this makes keeping one rather easy. It also can be [automated if you’re feeling extra lazy](#what-you-might-do-if-youre-clever).
