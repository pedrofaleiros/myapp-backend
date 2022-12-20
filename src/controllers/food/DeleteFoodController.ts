import { Request, Response } from "express";
import { DeleteFoodService } from "../../services/food/DeleteFoodService";

class DeleteFoodController {

	async handle(req: Request, res: Response){
		const food_id = req.query.food_id as string;

		const service = new DeleteFoodService();

		const food = await service.execute(food_id);

		return res.json(food);
	}
}

export { DeleteFoodController }