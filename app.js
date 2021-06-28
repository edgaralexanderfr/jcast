const express = require('express');

const port = process.env.PORT || 9999;

const app = express();
app.use('/lib', express.static('lib'));
app.use('/dev', express.static('dev'));
app.use('/examples', express.static('examples'))
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App running at port ${port}.`);
});
