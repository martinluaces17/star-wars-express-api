import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'
import { Personajes } from "./entities/Personajes"
import { Planetas } from "./entities/Planetas"
import jwt from 'jsonwebtoken'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    // if (!req.body.user_name) throw new Exception("Please provide a user_name")
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(User)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(User).create(req.body);  //Creo un usuario
    const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if (user) {
        getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.json(results);
    }
    return res.status(404).json({ msg: "No user found." });
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if (!user) {
        return res.json({ msg: "This user doesn't exist." });
    } else {
        const results = await getRepository(User).delete(req.params.id);
        return res.json(user);
    }
}

export const createPersonaje = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.nombre) throw new Exception("Please provide a nombre")
    if (!req.body.altura) throw new Exception("Please provide a altura")
    if (!req.body.peso) throw new Exception("Please provide a peso")
    if (!req.body.color_de_piel) throw new Exception("Please provide a color de piel")
    if (!req.body.fecha_nacimiento) throw new Exception("Please provide a fecha nacimiento")
    if (!req.body.descripcion) throw new Exception("Please provide a descripcion")
    if (!req.body.img_url) throw new Exception("Please provide a img_url")

    const newPersonaje = getRepository(Personajes).create(req.body)
    const results = await getRepository(Personajes).save(newPersonaje);
    return res.json(results);
}

export const getPersonaje = async (req: Request, res: Response): Promise<Response> => {
    const personaje = await getRepository(Personajes).find();
    return res.json(personaje);
}

export const getPersonajeById = async (req: Request, res: Response): Promise<Response> => {
    const personaje = await getRepository(Personajes).findOne(req.params.id);
    if (!personaje) throw new Exception("Personaje with this Id doesn't exist")
    return res.json(personaje);
}

export const updatePersonaje = async (req: Request, res: Response): Promise<Response> => {
    const persRepo = await getRepository(Personajes)
    const pers = await persRepo.findOne(req.params.id);
    if (!pers) throw new Exception("Personaje with this Id doesn't exist")

    persRepo.merge(pers, req.body);
    const results = await persRepo.save(pers);
    return res.json(results);
}

export const createPlaneta = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.nombre) throw new Exception("Please provide a nombre")
    if (!req.body.diametro) throw new Exception("Please provide a diametro")
    if (!req.body.periodo_de_rotacion) throw new Exception("Please provide a periodo de rotacion")
    if (!req.body.gravedad) throw new Exception("Please provide a gravedad")
    if (!req.body.poblacion) throw new Exception("Please provide a poblacion")
    if (!req.body.terreno) throw new Exception("Please provide a terreno")
    if (!req.body.img_url) throw new Exception("Please provide a img_url")

    const newPlaneta = getRepository(Planetas).create(req.body)
    const results = await getRepository(Planetas).save(newPlaneta);
    return res.json(results);
}

export const getPlaneta = async (req: Request, res: Response): Promise<Response> => {
    const planeta = await getRepository(Planetas).find();
    return res.json(planeta);
}

export const getPlanetaById = async (req: Request, res: Response): Promise<Response> => {
    const planeta = await getRepository(Planetas).findOne(req.params.id);
    if (!planeta) throw new Exception("Planeta with this Id doesn't exist")
    return res.json(planeta);
}

export const updatePlaneta = async (req: Request, res: Response): Promise<Response> => {
    const planetaRepo = await getRepository(Planetas)
    const planeta = await planetaRepo.findOne(req.params.id);
    if (!planeta) throw new Exception("Planeta with this Id doesn't exist")

    planetaRepo.merge(planeta, req.body);
    const results = await planetaRepo.save(planeta);
    return res.json(results);
}

export const login = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.email) throw new Exception("Introduzca un correo electrónico", 400)
    if (!req.body.password) throw new Exception("Por favor introduzca una contraseña", 400)

    const userRepo = await getRepository(User)

    const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })
    if (!user) throw new Exception("Invalid email or password", 401)

    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });

    return res.json({ user, token });
}

export const addFavPlanetas = async (req: Request, res: Response): Promise<Response> => {
    const planetasRepo = getRepository(Planetas)
    const userRepo = getRepository(User)

    const user = await userRepo.findOne(req.params.userid, { relations: ["planetas"] })
    const planetas = await planetasRepo.findOne(req.params.planetasid)

    if (user && planetas) {
        user.Planetas = [...user.Planetas, planetas]
        const results = await userRepo.save(user)
        return res.json(results)
    }
    return res.json("Error Fatal")
}