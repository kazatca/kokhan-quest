"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Koa = require("koa");
const session = require("koa-session");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const pug = require("pug");
const PORT = process.env.PORT || 3000;
const app = new Koa();
app.keys = ['some secret hurr'];
app.use(session({
    key: 'session',
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    // autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
}, app));
app.use(koaBody());
app.use(koaStatic('./static'));
const answers = [
    'схватила распятие и бросила его в камин',
    'все идем бухать к аквамэну',
    'отсоси у аквалангиста',
    'там 19 чубров в соседнем вагоне',
    'лошадь глухого Джима',
    'xxx'
];
function getLevel(level, answer) {
    if (!(answer || '').trim().length) {
        return { level };
    }
    if (answers[level] === answer) {
        if (answers.length - 1 === level) {
            return { level, win: true };
        }
        return { level: level + 1 };
    }
    return { level, error: 'Nope' };
}
app.use((ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const session = ctx.session;
    if (typeof session.level === 'undefined') {
        session.level = 0;
    }
    const { body } = ctx.request;
    const { level, error, win } = getLevel(session.level, body.answer);
    session.level = level;
    ctx.type = 'text/html; charset=utf-8';
    ctx.body = pug.renderFile('./tmpl/index.pug', { level, win, answer: body.answer, error });
}));
app.listen(PORT);
console.log(`listening on port ${PORT}`);
//# sourceMappingURL=index.js.map