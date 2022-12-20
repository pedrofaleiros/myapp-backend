import { Request, Response } from "express";
import { DeleteItemService } from "../../services/item/DeleteItemService";

class DeleteItemController {

	async handle(req: Request, res: Response) {

		const user_id = req.user_id as string;
		const item_id = req.query.item_id as string;

		const service = new DeleteItemService();

		const item = await service.execute({
			user_id, item_id
		});

		return res.json(item);
	}
}

export { DeleteItemController }