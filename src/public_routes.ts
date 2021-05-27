import { Router } from 'express';
import { safe } from './utils';
import { login } from './actions'
import { createUser, getPersonaje, getPersonajeById, getPlaneta, getPlanetaById } from './actions';

const router = Router();

router.post('/users', safe(createUser));
router.post('/login', safe(login));
router.get('/people', safe(getPersonaje));
router.get('/people/:id', safe(getPersonajeById));
router.get('/planets', safe(getPlaneta));
router.get('/planets/:id', safe(getPlanetaById));

export default router;
