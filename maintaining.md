# Maintaining [![Dependency Status](https://david-dm.org/schnittstabil/caesar-salad.svg)](https://david-dm.org/schnittstabil/caesar-salad) [![devDependency Status](https://david-dm.org/schnittstabil/caesar-salad/dev-status.svg)](https://david-dm.org/schnittstabil/caesar-salad#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/github/schnittstabil/caesar-salad/badge.svg?branch=master)](https://coveralls.io/github/schnittstabil/caesar-salad?branch=master)


## Testing

### Linting and Unit Tests

```bash
npm test
# or with coverage report
npm run test-cover-html
```

## Publish

### 1. gh-pages

#### Prerequisites

```bash
mkdir gh-pages
cd gh-pages
git clone git@github.com:schnittstabil/caesar-salad.git .
git checkout gh-pages
cd ..
```

#### Build

```bash
# bump package.json version
cd gh-pages && git pull && cd ..
npm run docs
```

#### Upload

```bash
cd gh-pages && git add . && git commit && git push && cd ..
# or
cd gh-pages && git add . && git commit --amend && git push --force && cd ..
```

### 2. master

```bash
# bump package.json version
git add . && git commit && git push
# or
git add . && git commit --amend  && git push --force
```

### 3. npm
```bash
# build and review package
npm pack && xdg-open caesar-salad*.tgz
rm caesar-salad*.tgz

# if ok
npm publish
```
