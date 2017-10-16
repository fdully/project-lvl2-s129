#!/usr/bin/env node

import gendiff from '../program';

if (!gendiff.args.length) {
  gendiff.help();
}
