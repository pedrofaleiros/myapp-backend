import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import repository from "../../prisma";
import { AuthUserbyNameRequest } from "../../models/user/AuthUserbyNameRequest";

class AuthUserbyNameService {

	async execute({ name, password }: AuthUserbyNameRequest) {

		if (!name) {
			throw new Error('Requisição invalida');
		}

		const user = await this.getUser(name);
		await this.verifyPasswordMatch(password, user.password);

		const token = this.getToken(user);
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			token: token,
		}
	}

	private getToken(user: { id: string, name: string, email: string }) {
		return sign(
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
	}

	private async verifyPasswordMatch(password: string, userPassword: string) {
		const passwordMatch = await compare(password, userPassword);
		if (!passwordMatch) {
			throw new Error('Senha invalida');
		}
	}

	private async getUser(name: string) {
		const user = await repository.user.findFirst({
			where: {
				name: {
					equals: name
				}
			}
		});
		if (!user) {
			throw new Error('Username nao cadastrado');
		}
		return user;
	}
}

export { AuthUserbyNameService }