import { hash } from "bcryptjs";
import { UserRequest } from "../../models/user/UserRequest";
import repository from "../../prisma";
import { UserValidator } from "../../validators/user/UserValidator";

class CreateUserService {
	async execute({ name, email, password }: UserRequest) {

		const validator = new UserValidator();
		validator.validate({ name, email, password });

		await this.verifyUsernameExists(name);
		await this.verifyUserExists(email);

		return await this.createUser(name, email, password);
	}

	private async createUser(name: string, email: string, password: string) {
		const hashPassword = await hash(password, 8);
		const user = await repository.user.create({
			data: {
				name: name,
				email: email,
				password: hashPassword,
			},
			select: {
				id: true,
				name: true,
				email: true,
			}
		});
		return user;
	}

	private async verifyUsernameExists(name: string) {
		const userNameExists = await repository.user.findFirst({
			where: {
				name: {
					equals: name
				}
			}
		});

		if (userNameExists) {
			throw new Error('Username ja cadastrado');
		}
	}
	private async verifyUserExists(email: string) {
		const userEmailExists = await repository.user.findFirst({
			where: {
				email: {
					equals: email
				}
			}
		});
		if (userEmailExists) {
			throw new Error('Email ja cadastrado');
		}
	}
}

export { CreateUserService }