#!/usr/bin/env node

"use strict";

var flags = [];
var enclose = require("enclose").exec;
flags.push("--config", "./config.js");
flags.push("./server.js");
enclose(flags);
