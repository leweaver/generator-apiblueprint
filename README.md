# apiblueprint yeoman generator

> Yeoman generator for apiblueprint - lets you quickly set up a project with sensible defaults and best practices.

## Usage

For step-by-step instructions on using Yeoman, see http://yeoman.io/

For details about apiblueprint, including syntax, see https://apiblueprint.org/

Install `yo`, `grunt-cli`, `generator-apiblueprint`:
```
npm install -g grunt-cli yo generator-apiblueprint
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo apiblueprint`
```
yo apiblueprint
```

Run `grunt build` for building and `grunt serve` for in-browser preview

## Conventions
The boilerplate directory structure assumes that all apiblueprint source code will be place inside the `src` directory. When built, the output will be placed in the `dist` directory.

The `src` directory has been designed such that there is a single `index.html` file, which pulls in various modules from the `modules` directory. When building, these are combined into a single index.html file.