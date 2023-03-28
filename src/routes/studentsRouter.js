import express from 'express';
import { User } from '../../db/models';
import ownerCheck from '../middlewares/ownerCheck';

const studentsRouter = express.Router();

studentsRouter
  .route('/:id')
  .delete(ownerCheck, async (req, res) => {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id } });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .patch(ownerCheck, async (req, res) => {
    try {
      const { id } = req.params;
      const foundUser = await User.findOne({ where: { id } });
      await foundUser.update(req.body);
      return res.json(foundUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .get(async (req, res) => {
    const foundUser = await User.findOne({ where: { id: req.params.id } });
    return res.json(foundUser);
  });

studentsRouter.post('/', async (req, res) => {
  const newUser = await User.create(req.body);
  return res.json(newUser);
});

export default studentsRouter;
