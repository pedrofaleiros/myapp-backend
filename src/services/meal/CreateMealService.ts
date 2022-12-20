import repository from "../../prisma";
import { MealValidator } from "../../validators/meal/MealValidator";

interface MealRequest {
	name: string;
	hour: number;
	minutes: number;
	user_id: string;
}

class CreateMealService {

	async execute({ name, hour, minutes, user_id }: MealRequest) {

		hour = Math.round(hour);
		minutes = Math.round(minutes);

		//validate
		const validator = new MealValidator();
		await validator.validate({
			name,
			hour,
			minutes
		});
		//validate

		const meal = await repository.meal.create({
			data: {
				name: name,
				hour: hour,
				minutes: minutes,
				user_id: user_id
			}
		});

		return meal;
	}
}

export { CreateMealService }