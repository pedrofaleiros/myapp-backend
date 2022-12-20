import { hash } from "bcryptjs";
import { UserRequest } from "../../models/user/UserRequest";
import repository from "../../prisma";

class CreateUserService {
	async execute({ name, email, password }: UserRequest) {

		//verificar
		const emailRegex = /^([a-z0-9.]+)@[a-z]+(\.[a-z]+){1,2}$/i;

		if(!emailRegex.test(email)){
			throw new Error('Email invalido');
		}

		if(password.length < 8){
			throw new Error('Senha invalida');
		}
		//verificar

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
}

export { CreateUserService }