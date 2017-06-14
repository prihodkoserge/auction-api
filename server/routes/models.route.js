import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import ctrl from '../controllers/models.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/makers - Get list of makers */
  .get(ctrl.list)

  /** POST /api/users - Create new maker */
  .post(ctrl.create);

router.route('/:makerId/models')
  .get(ctrl.modelsList)
  .post(ctrl.createModel);

router.route('/:makerId')
/** GET /api/users/:userId - Get user */
  .get(ctrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), ctrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(ctrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('makerId', ctrl.load);

export default router;
