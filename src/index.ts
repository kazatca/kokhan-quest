import * as Koa from 'koa';
import * as session from 'koa-session';
import * as sessionStore from 'koa-session-store';
import * as koaBody from 'koa-body';
import * as koaStatic from 'koa-static';
import * as pug from 'pug';
import * as MongoStore from 'koa-session-mongo';
import answers from './answers';

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
