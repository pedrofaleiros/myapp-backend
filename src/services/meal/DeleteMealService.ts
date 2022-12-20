import repository from "../../prisma";

interface MealRequest {
	meal_id: string;
	user_id: string;
}

class DeleteMealService {

	async execute({ meal_id, user_id }: MealRequest) {

		const mealUserId = await repository.meal.findFirst({
			where: {
				id: meal_id
			},
			select: {
				user_id: true,
			}
		});


		if (mealUserId.user_id !== user_id) {
			throw new Error('Nao autorizado');
		}

		const meal = await repository.meal.delete({
			where: {
				id: meal_id
			}
		});

		return meal;
	}
}

export { DeleteMealService }