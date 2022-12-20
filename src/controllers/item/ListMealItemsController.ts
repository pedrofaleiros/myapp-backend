import { Request, Response } from "express";
import { ListMealItemsService } from "../../services/item/ListMealItemsService";

class ListMealItemsController {

	async handle(req: Request, res: Response){
		const user_id = req.user_id as string;
		const meal_id = req.query.meal_id as string;

		const service = new ListMealItemsService();

		const foods = await service.execute({
			user_id, meal_id
		});

		return res.json(foods);
	}
}

export { ListMealItemsController }