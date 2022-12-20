import repository from "../../prisma";

interface ItemRequest {
	user_id: string;
	item_id: string;
	amount: number;
}

class UpdateItemService {

	async execute({ user_id, item_id, amount }: ItemRequest) {

		const item = await repository.item.findFirst({
			where: {
				id: item_id,
			},
			select: {
				meal_id: true,
			}
		});

		if (!item) {
			throw new Error('Item invalido');
		}

		const user = await repository.meal.findFirst({
			where: {
				id: item.meal_id,
			},
			select: {
				user_id: true,
			}
		});

		if(!user){
			throw new Error('Refeicao invalida');
		}

		if(user.user_id !== user_id){
			throw new Error('Nao autorizado');
		}

		if(amount > 10000 || amount < 0){
			throw new Error('Quantidade invalida');
		}

		const novoItem = await repository.item.update({
			where: {
				id: item_id,
			},
			data: {
				amount: amount,
			}
		});

		return novoItem;
	}
}

export { UpdateItemService }