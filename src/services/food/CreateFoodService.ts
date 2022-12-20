import repository from "../../prisma";

interface FoodRequest {
	name: string;

	kcal: number;
	carb: number;
	prot: number;
	fat: number;
	fiber: number;

	liquid: boolean;
}

class CreateFoodService {

	async execute({
		name, kcal, carb, prot, fat, fiber, liquid
	}: FoodRequest) {

		//validate

		//validate

		const food = await repository.food.create({
			data: {
				name: name,
				kcal: kcal,
				carb: carb,
				prot: prot,
				fat: fat,
				fiber: fiber,
				liquid: liquid,
			},
			select: {
				id: true,
				name: true,
			}
		});

		return food;
	}
}

export { CreateFoodService }