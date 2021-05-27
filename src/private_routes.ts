import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken'
import { createPersonaje, createPlaneta, updatePersonaje, updatePlaneta, deleteUser } from './actions';

const router = Router();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json('ACCESO DENEGADO');

    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;
    console.log(decoded);

    next()
}

router.get('/users', safe(actions.getUsers));
router.post('/people', verifyToken, safe(createPersonaje));
router.put('/people/:id', verifyToken, safe(updatePersonaje));
router.delete('/users/:id', safe(deleteUser));
router.post('/planets', verifyToken, safe(actions.createPlaneta));
router.put('/planets/:id', verifyToken, safe(updatePlaneta));
router.post('/favoritos/planets/:userid/:planetsid', verifyToken, safe(actions.addFavPlanetas));

export default router;
