import { Request, Response } from "express";
import { CreateMealService } from "../../services/meal/CreateMealService";

class CreateMealController {

	async handle(req: Request, res: Response) {

		const { name, hour, minutes } = req.body;
		const user_id = req.user_id as string;

		const service = new CreateMealService();

		const meal = await service.execute({
			name,
			hour,
			minutes,
			user_id,
		});

		return res.json(meal);
	}
}

export { CreateMealController }