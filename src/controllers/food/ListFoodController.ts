import { Request, Response } from "express";
import { ListFoodService } from "../../services/food/ListFoodService";

class ListFoodController {
	async handle(req: Request, res: Response) {

		const service = new ListFoodService();

		const foods = await service.execute();

		return res.json(foods);
	}
}

export { ListFoodController }