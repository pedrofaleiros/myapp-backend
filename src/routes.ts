import { Router } from "express";
import { CreateFoodController } from "./controllers/food/CreateFoodController";
import { ListMealItemsController } from "./controllers/item/ListMealItemsController";
import { ListFoodController } from "./controllers/food/ListFoodController";
import { CreateItemController } from "./controllers/item/CreateItemController";
import { CreateMealController } from "./controllers/meal/CreateMealController";
import { DeleteMealController } from "./controllers/meal/DeleteMealController";
import { ListUserMealController } from "./controllers/meal/ListUserMealController";
import { UpdateMealController } from "./controllers/meal/UpdateMealController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticaded } from "./middlewares/isAuthenticaded";
import { UpdateItemController } from "./controllers/item/UpdateItemController";
import { DeleteItemController } from "./controllers/item/DeleteItemController";
import { DeleteFoodController } from "./controllers/food/DeleteFoodController";
import { SearchFoodController } from "./controllers/food/SearchFoodController";

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticaded, new DetailUserController().handle);

//meal
router.post('/meal', isAuthenticaded, new CreateMealController().handle);
router.get('/meal', isAuthenticaded, new ListUserMealController().handle);
router.put('/meal', isAuthenticaded, new UpdateMealController().handle);
router.delete('/meal', isAuthenticaded, new DeleteMealController().handle);


//food
router.post('/food', isAuthenticaded, new CreateFoodController().handle);
router.get('/food', new ListFoodController().handle);
router.delete('/food', isAuthenticaded, new DeleteFoodController().handle);
router.get('/food/search', isAuthenticaded, new SearchFoodController().handle);

//item
router.post('/item', isAuthenticaded, new CreateItemController().handle);
router.put('/item', isAuthenticaded, new UpdateItemController().handle);
router.get('/meal/items', isAuthenticaded, new ListMealItemsController().handle);
router.delete('/item', isAuthenticaded, new DeleteItemController().handle);

export { router };