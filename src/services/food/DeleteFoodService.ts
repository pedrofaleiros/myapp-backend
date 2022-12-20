import repository from "../../prisma"

class DeleteFoodService {
	async execute(food_id: string) {

		const food = await repository.food.delete({
			where: {
				id: food_id
			}
		});

		return food;
	}
}

export { DeleteFoodService }