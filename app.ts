import * as express from 'express';
import * as bodyParse from 'body-parser';
const router = require('./routes/users');

const app = express();
app.set('port', 3000);

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));

app.use(router);

app.listen(app.get('port'), () => console.log(`listening on port ${app.get('port')}`));