import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/registerfail' }), async (req, res) => {
  console.log(req.user);
  res.send({ status: 'success', payload: req.user._id });
});

router.get('/registerfail', async (req, res) => {
  console.log('Register failed');
  res.status(500).send({ status: 'error', error: 'Register failed' });
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/loginfail' }), async (req, res) => {
  req.session.user = {
    first_name: req.user.first_name,
    email: req.user.email,
    id: req.user._id,
  };
  res.send({ status: 'success', payload: req.session.user });
});

router.get('/loginfail', async (req, res) => {
  console.log('Login failed');
  res.status(500).send({ status: 'error', error: 'Login failed' });
});

router.get('/logout', async (req, res) => {
  const nombre = req.session?.user?.first_name;
  req.session.destroy((err) => {
    if (err) return res.status(500).send('error');
    res.send({ status: 'success', payload: nombre });
  });
});

export default router;
