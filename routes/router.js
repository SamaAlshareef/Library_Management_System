import express from 'express';

import book from '../book/index.js';
import borrower from '../borrower/index.js';
import borrowering from '../borrowerings/index.js';

const router = express.Router();

const INSTALLED_MODULES = [
  book,
  borrower,
  borrowering
];

/**
 * Appends the routes of each module as follows:
 * /<module url>/
 * Example: /auth/..
 */
INSTALLED_MODULES.forEach(m => {
  router.use(`/${m.url}`, m.router);
});


export default router;