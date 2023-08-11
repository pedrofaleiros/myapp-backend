import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";
import { AuthUserbyNameService } from "../../services/user/AuthUserbyNameService";

class AuthUserbyNameController {

	async handle(req: Request, res: Response) {
		const { name, password } = req.body;

		const service = new AuthUserbyNameService();

		const auth = await service.execute({name, password});

		return res.json(auth);
	}
}

export { AuthUserbyNameController }