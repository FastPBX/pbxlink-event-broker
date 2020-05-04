import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

import MessagesRouter from './messages';

app.get('/', (req, res) => {
    res.send("PBXLink Queue Worker");
});

app.use('/', MessagesRouter);

app.listen(port, (err) => {
    if (err) { return console.error('AppListenError',err); }
    return console.log(`server is listening on ${port}. testing on ${process.env.APP_URL}`);
});