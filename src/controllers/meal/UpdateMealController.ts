import { Request, Response } from "express";
import { UpdateMealService } from "../../services/meal/UpdateMealService";

class UpdateMealController {

	async handle(req: Request, res: Response) {

		const { name, hour, minutes } = req.body;
		const user_id = req.user_id as string;
		const meal_id = req.query.meal_id as string;

		const service = new UpdateMealService();
		
		const meal = await service.execute({
			name, hour, minutes, meal_id, user_id
		});

		return res.json(meal);
	}
}

export { UpdateMealController }