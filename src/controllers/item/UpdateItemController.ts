import { Request, Response } from "express";
import { UpdateItemService } from "../../services/item/UpdateItemService";

class UpdateItemController {

	async handle(req: Request, res: Response){

		const {item_id, amount} = req.body;
		const user_id = req.user_id as string;

		const service = new UpdateItemService();

		const item = await service.execute({
			user_id, item_id, amount
		});

		return res.json(item);
	}
}

export { UpdateItemController }