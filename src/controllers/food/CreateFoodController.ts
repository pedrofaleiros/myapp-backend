import { Request, Response } from "express";
import { CreateFoodService } from "../../services/food/CreateFoodService";
import { FoodModel } from "../../models/FoodModel";

class CreateFoodController {

	async handle(req: Request, res: Response) {

		const {
			name, kcal, carb, prot, fat, fiber, liquid,
		} = req.body;

		const newFood = new FoodModel(name, kcal, carb, prot, fat, fiber, liquid);

		const service = new CreateFoodService();
		const food = await service.execute(newFood);

		return res.json(food);
	}
}

export { CreateFoodController }