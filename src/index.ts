import * as Koa from 'koa';
import * as session from 'koa-session';
import * as koaBody from 'koa-body';
import * as koaStatic from 'koa-static';
import * as pug from 'pug';
import answers from './answers';

const PORT = process.env.PORT || 3000;

const app = new Koa();
app.keys = ['some secret hurr'];

app.use(session({
  key: 'session', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  // autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/

}, app));

app.use(koaBody());
app.use(koaStatic('./static'));

interface Request {
  answer: string;
  reset: boolean;
}

interface Response {
  level: number;
  error?: boolean;
  win?: boolean;
}

function getLevel(level: number, answer: string): Response{
  if(!(answer || '').trim().length){
    return {level};
  }
  if(answers.length - 1 <= level){
    return {level: level + 1, win: true};
  }

  if(answers[level](answer)){
    return { level: level + 1};
  }
  return {level, error: true};
}

app.use(async ctx => {

  const session = ctx.session as any;

  if(typeof session.level === 'undefined'){
    session.level = 0;
  }

  const { body } = ctx.request;

  ctx.type = 'text/html; charset=utf-8';

  if(ctx.originalUrl === '/answer'){
    const result = getLevel(session.level, body.answer);
    Object.assign(session, result);
    session.answer = body.answer;
    ctx.redirect('/');
    return; 
  }

  ctx.body = pug.renderFile('./tmpl/index.pug', {
    ...session,
    answer: (session.error? session.answer: ''),
  });

  session.error = false;
})

app.listen(PORT);
console.log(`listening on port ${PORT}`);
