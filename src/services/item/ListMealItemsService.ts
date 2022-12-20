import repository from "../../prisma";

interface MealRequest {
	user_id: string;
	meal_id: string;
}

class ListMealItemsService {

	async execute({ user_id, meal_id }: MealRequest) {

		const meal = await repository.meal.findFirst({
			where: {
				id: meal_id,
			},
			select: {
				user_id: true,
			}
		});

		if (!meal) {
			throw new Error('Refeicao invalida');
		}

		if (meal.user_id !== user_id) {
			throw new Error('Nao autorizado');
		}

		const foods = await repository.item.findMany({
			where: {
				meal_id: meal_id
			},
			include: {
				food: true,
			}
		});

		return foods;
	}
}

export { ListMealItemsService }