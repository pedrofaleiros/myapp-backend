import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AuthUserRequest } from "../../models/user/AuthUserRequest";
import repository from "../../prisma";

class AuthUserService {

	async execute({ email, password }: AuthUserRequest) {

		if (!email) {
			throw new Error('email invalido');
		}

		const user = await repository.user.findFirst({
			where: {
				email: {
					equals: email
				}
			}
		});

		if (!user) {
			throw new Error('email nao cadastrado');
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

export { AuthUserService }