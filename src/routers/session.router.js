import { Router } from 'express';
import passport from 'passport';
import { ServerResponse } from '../utils/server.response.js';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/registerfail' }), async (req, res) => {
  console.log(req.user);
  ServerResponse.success(res, req.user._id);
});

router.get('/registerfail', async (req, res) => {
  console.log('Register failed');
  ServerResponse.internalError(res, err);
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/loginfail' }), async (req, res) => {
  req.session.user = {
    first_name: req.user.first_name,
    email: req.user.email,
    id: req.user._id,
  };
  ServerResponse.success(res, req.session.user);
});

router.get('/loginfail', async (req, res) => {
  console.log('Login failed');
  ServerResponse.internalError(res, err);
});

router.get('/logout', async (req, res) => {
  const nombre = req.session?.user?.first_name;
  req.session.destroy((err) => {
    if (err) return ServerResponse.internalError(res, err);
    ServerResponse.success(res, nombre);
  });
});

export default router;
