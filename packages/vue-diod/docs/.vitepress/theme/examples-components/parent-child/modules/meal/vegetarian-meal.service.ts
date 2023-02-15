import { Service } from 'diod';
import { AbstractMeal, DishModel } from './meal.abstract';

@Service()
export class VegetarianMeal implements AbstractMeal {
  public main: DishModel = { name: 'rice', icon: '🍚' };
  public side: DishModel = { name: 'carrots', icon: '🥕' };
}
