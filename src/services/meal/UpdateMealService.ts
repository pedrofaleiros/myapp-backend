import repository from "../../prisma";
import { MealValidator } from "../../validators/meal/MealValidator";

interface MealRequest {
	hour: number;
	minutes: number;
	meal_id: string;
	user_id: string;
}

class UpdateMealService {

	async execute({ hour, minutes, meal_id, user_id }: MealRequest) {

		hour = Math.round(hour);
		minutes = Math.round(minutes);

		//validate
		const validator = new MealValidator();
		const validHour = await validator.validateHour(hour, minutes);

		if (!validHour) {
			throw new Error('Horario invalido');
		}
		//validate

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

		const meal = await repository.meal.update({
			where: {
				id: meal_id
			},
			data: {
				hour: hour,
				minutes: minutes,
			}
		});

		return meal;
	}
}

export { UpdateMealService }