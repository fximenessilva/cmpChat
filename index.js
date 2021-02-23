const express = require('express');
const app = express();

const debug = require('debug')('app');
const chalk = require('chalk');


const PORT = 3030 || process.env.PORT;


app.listen(PORT, () => {
    debug(`Server is running on port ${chalk.blue(PORT)}`);
  });