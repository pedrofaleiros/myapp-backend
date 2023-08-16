import repository from "../../prisma"

class ListUserMealService {

	async execute(user_id: string) {

		const meals = await repository.meal.findMany({
			where: {
				user_id: {
					equals: user_id,
				}
			},
			select: {
				id: true,
				name: true,
				hour: true,
				minutes: true,
				items: {
					select: {
						id: true,
						amount: true,
						food: true,
					},
					// orderBy: {
					// 	food: {
					// 		name: 'asc'
					// 	}
					// }
				}
			},
			orderBy: [
				{
					hour: 'asc'
				},
				{
					minutes: 'asc'
				}
			]
		});

		return meals;
	}
}

export { ListUserMealService }