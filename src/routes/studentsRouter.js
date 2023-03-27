import express from 'express';
import { User } from '../../db/models';
import ownerCheck from '../middlewares/ownerCheck';

const studentsRouter = express.Router();

studentsRouter.get('/delete/student/:id', ownerCheck, async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default studentsRouter;
