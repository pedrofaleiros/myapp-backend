import repository from "../../prisma"

class DetailUserService {
	async execute(user_id: string) {

		const user = await repository.user.findFirst({
			where: {
				id: {
					equals: user_id
				}
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

export { DetailUserService }