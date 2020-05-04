"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = 3000;
app.use(body_parser_1.default.json());
const messages_1 = __importDefault(require("./messages"));
app.get('/', (req, res) => {
    res.send("PBXLink Queue Worker");
});
app.use('/', messages_1.default);
app.listen(port, (err) => {
    if (err) {
        return console.error('AppListenError', err);
    }
    return console.log(`server is listening on ${port}. testing on ${process.env.APP_URL}`);
});
//# sourceMappingURL=server.js.map