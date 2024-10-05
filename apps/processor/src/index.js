"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./Client/db"));
while (1) {
    /// Remove all the Entries from RunOut Box Pattern and add In the kakfa Queues
    const PerformAction = () => {
        db_1.default.$transaction(async (tx) => {
            const Zaps = tx.zapRunOutBox.findMany({});
            (await Zaps).map(zap => {
                console.log(zap);
            });
            tx.zapRunOutBox.deleteMany({});
        });
    };
    PerformAction();
}
