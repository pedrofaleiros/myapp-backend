import { Request, Response } from "express";
import { CreateFoodService } from "../../services/food/CreateFoodService";

class CreateFoodController {

	async handle(req: Request, res: Response) {

		const {
			name,
			kcal,
			carb,
			prot,
			fat,
			fiber,
			liquid,
		} = req.body;

		const service = new CreateFoodService();

		const food = await service.execute({
			name,
			kcal,
			carb,
			prot,
			fat,
			fiber,
			liquid,
		});

		return res.json(food);
	}
}

export { CreateFoodController }