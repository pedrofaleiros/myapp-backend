import { FoodModel } from "../../models/FoodModel";
import repository from "../../prisma";

class CreateFoodService {

	async execute(newFood: FoodModel) {

		this.validateFood(newFood);

		const food = await this.createFood(newFood);

		return food;
	}

	private async createFood(food: FoodModel) {
		return await repository.food.create({
			data: {
				name: food.name,
				kcal: food.kcal,
				carb: food.carb,
				prot: food.prot,
				fat: food.fat,
				fiber: food.fiber,
				liquid: food.liquid,
			},
			select: {
				id: true,
				name: true,
			}
		});
	}

	private validateFood(food: FoodModel) {

		if (food.name.length > 30 || food.name.length < 2) {
			throw new Error('Nome invalido');
		}

		if (food.kcal < 0) {
			throw new Error('Kcal invalidas');
		}
		if (food.carb < 0 || food.prot < 0 || food.fat < 0 || food.fiber < 0) {
			throw new Error('Quantidades invalidas');
		}
		if (food.fiber > food.carb) {
			throw new Error('A qtd de fibras não pode ser maior que a de carboidratos.');
		}

	}
}

export { CreateFoodService }