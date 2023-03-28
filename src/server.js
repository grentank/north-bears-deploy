import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import store from 'session-file-store';
import path from 'path';
import jsxRender from './utils/jsxRender';
import indexRouter from './routes/indexRouter';
// import apiRouter from './routes/apiRouter';
import authRouter from './routes/authRouter';
import resLocals from './middlewares/resLocals';
import studentsRouter from './routes/studentsRouter';
import postsRouter from './routes/postsRouter';

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
const FileStore = store(session);

const sessionConfig = {
  name: 'students_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  },
};

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));
app.use(resLocals);

app.use('/api/auth', authRouter);
app.use('/api/students', studentsRouter);
app.use('/api/posts', postsRouter);
app.use('/', indexRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
