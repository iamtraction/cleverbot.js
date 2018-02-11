# cleverbot.js
A [Node.js](https://nodejs.org) Cleverbot API wrapper library. Go make a chat bot in a flash!

[![GitHub release](https://img.shields.io/github/release/k3rn31p4nic/cleverbot.js.svg?style=flat)](https://github.com/k3rn31p4nic/cleverbot.js/releases)
[![Dependencies](https://david-dm.org/k3rn31p4nic/cleverbot.js.svg)](https://david-dm.org/k3rn31p4nic/cleverbot.js)
[![Known Vulnerabilities](https://snyk.io/test/github/k3rn31p4nic/cleverbot.js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/k3rn31p4nic/cleverbot.js?targetFile=package.json)
[![license](https://img.shields.io/github/license/k3rn31p4nic/cleverbot.js.svg)](LICENSE)
[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg)](https://saythanks.io/to/k3rn31p4nic)

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)

## Installation
This is a [Node.js](https://nodejs.org/en) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
I recommend installing the latest LTS version of Node.js.

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install cleverbot.js --save
```

## Usage
### Constructor
```js
new Cleverbot();
```
| Parameter | Type | Optional | Default | Description |
| - | - | - | - | - |
| `options` | `Object` | ❌ | - | The options for initializing cleverbot.js |
| `options.APIKey` | `String` | ❌ | - | The API key that you got from the [cleverbot website](https://www.cleverbot.com/api) |
| `options.preserveState` | `Boolean` | ✔ | `false` | Whether to preserve the state of the conversations. |

#### Example

```js
const Cleverbot = require('cleverbot.js');
let options = {
  APIKey: 'CFDoi4234falFOFaSfwepxXhBRW',
  preserveState: true
};
cleverbot = new Cleverbot(options);

cleverbot.write('Hi how\'re you?').then(response => {
  console.log(response.output); // Fine, How're you?
}).catch(e => {
  console.error(e);
});
```

## Contributors
[List of all contributors](https://github.com/k3rn31p4nic/cleverbot.js/graphs/contributors)

## License
[GPL-3.0](https://github.com/k3rn31p4nic/cleverbot.js/blob/master/LICENSE)

> If you liked this project you can **⭐ Star** it on
> [GitHub](https://github.com/k3rn31p4nic/cleverbot.js) to show your love and/or
> [send a thank you note](https://saythanks.io/to/k3rn31p4nic).
