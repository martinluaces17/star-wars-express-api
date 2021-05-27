"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.addFavPlanetas = exports.login = exports.updatePlaneta = exports.getPlanetaById = exports.getPlaneta = exports.createPlaneta = exports.updatePersonaje = exports.getPersonajeById = exports.getPersonaje = exports.createPersonaje = exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
var utils_1 = require("./utils");
var Personajes_1 = require("./entities/Personajes");
var Planetas_1 = require("./entities/Planetas");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                // if (!req.body.user_name) throw new Exception("Please provide a user_name")
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(User_1.User).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                typeorm_1.getRepository(User_1.User).merge(user, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.status(404).json({ msg: "No user found." })];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ msg: "This user doesn't exist." })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(User_1.User)["delete"](req.params.id)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.deleteUser = deleteUser;
var createPersonaje = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPersonaje, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                if (!req.body.altura)
                    throw new utils_1.Exception("Please provide a altura");
                if (!req.body.peso)
                    throw new utils_1.Exception("Please provide a peso");
                if (!req.body.color_de_piel)
                    throw new utils_1.Exception("Please provide a color de piel");
                if (!req.body.fecha_nacimiento)
                    throw new utils_1.Exception("Please provide a fecha nacimiento");
                if (!req.body.descripcion)
                    throw new utils_1.Exception("Please provide a descripcion");
                if (!req.body.img_url)
                    throw new utils_1.Exception("Please provide a img_url");
                newPersonaje = typeorm_1.getRepository(Personajes_1.Personajes).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Personajes_1.Personajes).save(newPersonaje)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPersonaje = createPersonaje;
var getPersonaje = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var personaje;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Personajes_1.Personajes).find()];
            case 1:
                personaje = _a.sent();
                return [2 /*return*/, res.json(personaje)];
        }
    });
}); };
exports.getPersonaje = getPersonaje;
var getPersonajeById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var personaje;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Personajes_1.Personajes).findOne(req.params.id)];
            case 1:
                personaje = _a.sent();
                if (!personaje)
                    throw new utils_1.Exception("Personaje with this Id doesn't exist");
                return [2 /*return*/, res.json(personaje)];
        }
    });
}); };
exports.getPersonajeById = getPersonajeById;
var updatePersonaje = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var persRepo, pers, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Personajes_1.Personajes)];
            case 1:
                persRepo = _a.sent();
                return [4 /*yield*/, persRepo.findOne(req.params.id)];
            case 2:
                pers = _a.sent();
                if (!pers)
                    throw new utils_1.Exception("Personaje with this Id doesn't exist");
                persRepo.merge(pers, req.body);
                return [4 /*yield*/, persRepo.save(pers)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updatePersonaje = updatePersonaje;
var createPlaneta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPlaneta, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                if (!req.body.diametro)
                    throw new utils_1.Exception("Please provide a diametro");
                if (!req.body.periodo_de_rotacion)
                    throw new utils_1.Exception("Please provide a periodo de rotacion");
                if (!req.body.gravedad)
                    throw new utils_1.Exception("Please provide a gravedad");
                if (!req.body.poblacion)
                    throw new utils_1.Exception("Please provide a poblacion");
                if (!req.body.terreno)
                    throw new utils_1.Exception("Please provide a terreno");
                if (!req.body.img_url)
                    throw new utils_1.Exception("Please provide a img_url");
                newPlaneta = typeorm_1.getRepository(Planetas_1.Planetas).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Planetas_1.Planetas).save(newPlaneta)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPlaneta = createPlaneta;
var getPlaneta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planeta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planetas_1.Planetas).find()];
            case 1:
                planeta = _a.sent();
                return [2 /*return*/, res.json(planeta)];
        }
    });
}); };
exports.getPlaneta = getPlaneta;
var getPlanetaById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planeta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planetas_1.Planetas).findOne(req.params.id)];
            case 1:
                planeta = _a.sent();
                if (!planeta)
                    throw new utils_1.Exception("Planeta with this Id doesn't exist");
                return [2 /*return*/, res.json(planeta)];
        }
    });
}); };
exports.getPlanetaById = getPlanetaById;
var updatePlaneta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetaRepo, planeta, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planetas_1.Planetas)];
            case 1:
                planetaRepo = _a.sent();
                return [4 /*yield*/, planetaRepo.findOne(req.params.id)];
            case 2:
                planeta = _a.sent();
                if (!planeta)
                    throw new utils_1.Exception("Planeta with this Id doesn't exist");
                planetaRepo.merge(planeta, req.body);
                return [4 /*yield*/, planetaRepo.save(planeta)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updatePlaneta = updatePlaneta;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Introduzca un correo electrónico", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Por favor introduzca una contraseña", 400);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User)];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
var addFavPlanetas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetasRepo, userRepo, user, planetas, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                planetasRepo = typeorm_1.getRepository(Planetas_1.Planetas);
                userRepo = typeorm_1.getRepository(User_1.User);
                return [4 /*yield*/, userRepo.findOne(req.params.userid, { relations: ["planetas"] })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, planetasRepo.findOne(req.params.planetasid)];
            case 2:
                planetas = _a.sent();
                if (!(user && planetas)) return [3 /*break*/, 4];
                user.Planetas = __spreadArray(__spreadArray([], user.Planetas), [planetas]);
                return [4 /*yield*/, userRepo.save(user)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 4: return [2 /*return*/, res.json("Error Fatal")];
        }
    });
}); };
exports.addFavPlanetas = addFavPlanetas;
