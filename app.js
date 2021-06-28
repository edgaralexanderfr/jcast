const express = require('express');

const port = process.env.PORT || 9999;

const app = express();
app.use('/jcast/lib', express.static('lib'));
app.use('/jcast/dev', express.static('dev'));
app.use('/jcast/examples', express.static('examples'))
app.use('/jcast', express.static('public'));

app.listen(port, () => {
  console.log(`App running at port ${port}.`);
});
