"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const koa_session_ts_1 = require("koa-session-ts");
const PORT = process.env.PORT || 3000;
const app = new Koa();
app.keys = ['some secret hurr'];
app.use(koa_session_ts_1.default());
app.listen(PORT);
console.log(`listening on port ${PORT}`);
//# sourceMappingURL=index.js.map