import { Service } from 'diod';
import { AbstractMeal } from './meal.abstract';

@Service()
export class VegetarianMeal implements AbstractMeal {
  public main: string = 'rice';
  public side: string = 'vegetables';
}
