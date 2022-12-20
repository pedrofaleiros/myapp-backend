import { Request, Response } from "express";
import { DeleteMealService } from "../../services/meal/DeleteMealService";

class DeleteMealController {

	async handle(req: Request, res: Response) {

		const user_id = req.user_id as string;
		const meal_id = req.query.meal_id as string;

		const service = new DeleteMealService();

		const meal = await service.execute({
			meal_id, user_id
		});

		return res.json(meal);
	}
}

export { DeleteMealController }