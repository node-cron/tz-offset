# tz-offset
![npm](https://img.shields.io/npm/v/tz-offset.svg)
[![npm](https://img.shields.io/npm/l/tz-offset.svg)](https://github.com/node-cron/tz-offset/blob/master/LICENSE.md)
[![Build Status](https://travis-ci.org/node-cron/tz-offset.svg?branch=master)](https://travis-ci.org/node-cron/tz-offset)
[![dependencies Status](https://david-dm.org/node-cron/tz-offset/status.svg)](https://david-dm.org/node-cron/tz-offset)
[![devDependencies Status](https://david-dm.org/node-cron/tz-offset/dev-status.svg)](https://david-dm.org/node-cron/tz-offset?type=dev)

A lib to work with JavaScript timezone offset 

# Usage

```js
var tzOffset = require("tz-offset")
tzOffset.offsetOf("America/Sao_Paulo"); // 180.

tzOffset.removeOffset(new Date()); // a givend date without timezone offset.

tzOffset.timeAt(new Date(), "Europe/London"); // a given date represented in another.
```