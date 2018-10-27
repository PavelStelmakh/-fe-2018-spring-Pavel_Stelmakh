import * as express from 'express';
const cors = require('cors');
import * as bodyParse from 'body-parser';
import * as cookieParser from 'cookie-parser';
const router = require('./routes/users');

const app = express();
app.set('port', 3000);
app.set('secret', 'I love Angular 2+');

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(__dirname));

app.use(router);

app.listen(app.get('port'), () => console.log(`listening on port ${app.get('port')}`));