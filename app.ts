import * as express from 'express';
const cors = require('cors');
import * as bodyParse from 'body-parser';
const router = require('./routes/users');

const app = express();
app.set('port', 3000);

app.use(cors());
app.options('*', cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));

app.use(express.static(__dirname));

app.use(router);

app.listen(app.get('port'), () => console.log(`listening on port ${app.get('port')}`));