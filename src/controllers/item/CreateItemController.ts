import { Request, Response } from "express";
import { CreateItemService } from "../../services/item/CreateItemService";

class CreateItemController {
	async handle(req: Request, res: Response) {

		const { meal_id, food_id, amount } = req.body;
		const user_id = req.user_id as string;

		const service = new CreateItemService();

		const item = await service.execute({
			meal_id, food_id, user_id, amount
		});

		return res.json(item);
	}
}

export { CreateItemController }