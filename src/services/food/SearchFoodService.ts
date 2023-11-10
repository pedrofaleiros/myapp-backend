import repository from "../../prisma"

class SearchFoodService {

	async execute(name: string) {

		const [firstName,] = name.split(' ');

		var foods = await this.getFoodsByName(name);

		if (foods.length == 0) {
			foods = await this.getFoodsByName(firstName);
		}

		return foods;
	}

	private async getFoodsByName(text: string) {
		return await repository.food.findMany({
			where: {
				name: {
					contains: text,
					// mode: 'insensitive'
				}
			},
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
	}
}

export { SearchFoodService }