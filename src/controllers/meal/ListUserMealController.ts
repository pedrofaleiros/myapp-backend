import { Request, Response } from "express";
import { ListUserMealService } from "../../services/meal/ListUserMealService";

class ListUserMealController {

	async handle(req: Request, res: Response){

		const user_id = req.user_id as string;

		const service = new ListUserMealService();

		const meals = await service.execute(user_id);

		return res.json(meals);
	}
}

export { ListUserMealController }