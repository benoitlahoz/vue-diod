export interface DishModel {
  name: string;
  icon: string;
}

export abstract class AbstractMeal {
  public abstract main: DishModel;
  public abstract side: DishModel;
}
