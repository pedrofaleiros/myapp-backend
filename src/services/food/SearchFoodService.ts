import repository from "../../prisma"

class SearchFoodService {

	async execute(name: string) {

		const [firstName,] = name.split(' ');

		var foods = await repository.food.findMany({
			where: {
				name: {
					contains: name,
					mode: 'insensitive'
				}
			},
			select: {
				name: true,
				kcal: true,
				carb: true,
				prot: true,
				fat: true,
				fiber: true,
				liquid: true,
			},
			orderBy: {
				name: 'asc',
			}
		});

		if (foods.length == 0) {
			foods = await repository.food.findMany({
				where: {
					name: {
						contains: firstName,
						mode: 'insensitive'
					}
				},
				select: {
					name: true,
					kcal: true,
					carb: true,
					prot: true,
					fat: true,
					fiber: true,
					liquid: true,
				},
				orderBy: {
					name: 'asc',
				}
			});
		}

		return foods;
	}
}

export { SearchFoodService }