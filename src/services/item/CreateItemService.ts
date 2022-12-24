import repository from "../../prisma";

interface ItemRequest {
	meal_id: string;
	food_id: string;
	user_id: string;
	amount: number;
}

class CreateItemService {
	async execute({ meal_id, food_id, user_id, amount }: ItemRequest) {

		if (amount <= 0 || amount > 10000) {
			throw new Error('Quantidade invalida');
		}

		const meal = await repository.meal.findFirst({
			where: {
				id: meal_id
			},
			select: {
				user_id: true,
			}
		});

		if(!meal){
			throw new Error('Refeicao invalida');
		}

		if(meal.user_id !== user_id){
			throw new Error('Nao autorizado');
		}

		const item = await repository.item.create({
			data: {
				amount: amount,
				food_id: food_id,
				meal_id: meal_id,
			},
			/* include: {
				food: true,
				meal: true,
			}, */
			select: {
				meal_id: true,
				food_id: true,
				amount: true,
			}
		});

		return item;
	}
}

export { CreateItemService }