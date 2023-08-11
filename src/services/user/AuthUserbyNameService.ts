import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import repository from "../../prisma";
import { AuthUserbyNameRequest } from "../../models/user/AuthUserbyNameRequest";

class AuthUserbyNameService {

	async execute({ name, password }: AuthUserbyNameRequest) {

		if (!name) {
			throw new Error('username invalido');
		}

		const user = await repository.user.findFirst({
			where: {
				name: {
					equals: name
				}
			}
		});

		if (!user) {
			throw new Error('username nao cadastrado');
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error('senha invalida');
		}

		const token = sign(
			{
				name: user.name,
				email: user.email,
			},
			process.env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: '30d'
			}
		);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			token: token,
		}
	}
}

export { AuthUserbyNameService }