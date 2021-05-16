import express from 'express';

export default function pages() {
  const router = express.Router();
  router.get('/', (req, res) => {
    res.render('index', {
      title: 'loading',
    });
  });
  return router;
}
