import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import productRoutes from './product.route';
import modelRoutes from './models.route';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) =>
  res.send('Main')
);

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount product routes at /products
router.use('/products', productRoutes);
router.use('/makers', modelRoutes);

export default router;
