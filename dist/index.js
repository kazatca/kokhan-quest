"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Koa = require("koa");
const sessionStore = require("koa-session-store");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const pug = require("pug");
const MongoStore = require("koa-session-mongo");
const answers_1 = require("./answers");
const PORT = process.env.PORT || 3000;
const app = new Koa();
app.keys = ['some secret hurr'];
// app.use(session({
//   key: 'session',
//   maxAge: 86400000,
//   overwrite: true, 
//   httpOnly: true, 
//   signed: true,
//   rolling: false, 
//   renew: false,
// }, app));
app.use(sessionStore({
    store: MongoStore.create({
        url: process.env.MONGODB_URI
    })
}));
app.use(koaBody());
app.use(koaStatic('./static'));
function getLevel(level, answer) {
    if (!(answer || '').trim().length) {
        return { level };
    }
    if (answers_1.default.length - 1 <= level) {
        return { level: level + 1, win: true };
    }
    if (answers_1.default[level](answer)) {
        return { level: level + 1 };
    }
    return { level, error: true };
}
app.use((ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const session = ctx.session;
    if (typeof session.level === 'undefined') {
        session.level = 0;
    }
    const { body } = ctx.request;
    ctx.type = 'text/html; charset=utf-8';
    if (ctx.originalUrl === '/answer') {
        const result = getLevel(session.level, body.answer);
        Object.assign(session, result);
        session.answer = body.answer;
        ctx.redirect('/');
        return;
    }
    ctx.body = pug.renderFile('./tmpl/index.pug', Object.assign({}, session, { answer: (session.error ? session.answer : '') }));
    session.error = false;
}));
app.listen(PORT);
console.log(`listening on port ${PORT}`);
//# sourceMappingURL=index.js.map