class FoodModel {
	name: string;
	kcal: number;
	carb: number;
	prot: number;
	fat: number;
	fiber: number;
	liquid: boolean;

	constructor(name: string, kcal: number, carb: number, prot: number, fat: number, fiber: number, liquid: boolean) {
		this.name = name;
		this.kcal = kcal;
		this.carb = carb;
		this.prot = prot;
		this.fat = fat;
		this.fiber = fiber;
		this.liquid = liquid;
	}
}

export { FoodModel };