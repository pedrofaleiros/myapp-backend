import { Request, Response } from "express";
import { SearchFoodService } from "../../services/food/SearchFoodService";

class SearchFoodController {

	async handle(req: Request, res: Response){
		const name = req.query.name as string;

		const service =  new SearchFoodService();

		const foods = await service.execute(name);

		return res.json(foods);
	}
}

export { SearchFoodController }