"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const amqplib_1 = __importDefault(require("amqplib"));
const router = express_1.Router();
router.post('/message-inbound', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib_1.default.connect(process.env.AMQP_URL);
        const channel = yield connection.createChannel();
        yield channel.sendToQueue('messages', Buffer.from(JSON.stringify(req.body)), { persistent: true });
        yield channel.close();
        yield connection.close();
        res.json({ success: true, message: 'Event Succesfully Queued' });
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}));
exports.default = router;
//# sourceMappingURL=messages.js.map