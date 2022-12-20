import repository from "../../prisma";

interface ItemRequest {
	user_id: string;
	item_id: string;
}

class DeleteItemService {

	async execute({ user_id, item_id }: ItemRequest) {

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

		if (!user) {
			throw new Error('Refeicao invalida');
		}

		if (user.user_id !== user_id) {
			throw new Error('Nao autorizado');
		}

		const deleteItem = await repository.item.delete({
			where: {
				id: item_id
			}
		});

		return deleteItem;
	}
}

export { DeleteItemService }