import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { User } from './entities/User'
import { Exception } from './utils'
import { Personajes } from "./entities/Personajes"
import { Planetas } from "./entities/Planetas"

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if(!req.body.user_name) throw new Exception("Please provide a user_name")
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(User)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(User).create(req.body);  //Creo un usuario
	const results = await getRepository(User).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(User).find();
		return res.json(users);
}

export const getPersonajes = async (req: Request, res: Response): Promise<Response> =>{
		const personajes = await getRepository(Personajes).find();
		return res.json(personajes);
}

export const postPersonajes = async (req: Request, res: Response): Promise<Response> =>{
    let results
    for (let index = 0; index < req.body.length; index++) {
        
    if(!req.body[index].nombre) throw new Exception("Please provide a nombre")
    if(!req.body[index].altura) throw new Exception("Please provide a altura")
    if(!req.body[index].peso) throw new Exception("Please provide a peso")
    if(!req.body[index].color_de_piel) throw new Exception("Please provide a color_de_piel")
    if(!req.body[index].fecha_nacimiento) throw new Exception("Please provide a fecha_nacimiento")
    if(!req.body[index].descripcion) throw new Exception("Please provide a descripcion")
    if(!req.body[index].img_url) throw new Exception("Please provide a img_url")

    const personajesRepo = getRepository(Personajes)
    const personaje = await personajesRepo.findOne({ where: {nombre:req.body.nombre}})
    if(personaje) throw new Exception(`Este personaje ${req.body[index]}ya existe`)

    const newPersonaje = getRepository(Personajes).create(req.body);
    const results = await getRepository(Personajes).save(newPersonaje);
    }
    return res.json(results);
}