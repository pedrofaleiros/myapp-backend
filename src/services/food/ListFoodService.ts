import repository from "../../prisma";

class ListFoodService {
	async execute() {
		const foods = await repository.food.findMany({
			select: {
				id: true,
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

		return foods;
	}
}

export { ListFoodService }