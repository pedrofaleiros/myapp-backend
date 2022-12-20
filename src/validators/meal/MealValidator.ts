interface MealRequest {
	name: string;
	hour: number;
	minutes: number;
}

class MealValidator {

	async validate({ name, hour, minutes }: MealRequest) {

		const validHour = await this.validateHour(hour, minutes);

		if(name === '' || name.length > 30){
			throw new Error('Nome invalido');
		}

		if(!validHour){
			throw new Error('Horario invalido');
		}
		
		return true;
	}

	async validateHour(hour: number, minutes: number) {

		if (hour > 24 || hour < 0) {
			return false;
		}
		
		if (minutes >= 60 || minutes < 0) {
			return false;
		}

		return true;
	}
}

export { MealValidator }