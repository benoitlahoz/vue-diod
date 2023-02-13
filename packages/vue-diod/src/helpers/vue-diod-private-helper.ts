import { VueDiodBuilder } from '../builder';

/**
 * A private (not exported) helper class that keeps the default builder
 * when VueDiod is used as a plugin.
 */
export class VueDiodHelper {
  /**
   * Default VueDiodBuilder when used as a plugin.
   *
   * @private
   * @static
   */
  private static _defaultBuilder?: VueDiodBuilder;

  /**
   * Sets the default builder on the static class.
   */
  public static set defaultBuilder(builder: VueDiodBuilder) {
    VueDiodHelper._defaultBuilder = builder;
  }

  /**
   * Gets the default builder.
   */
  public static get defaultBuilder(): VueDiodBuilder {
    return VueDiodHelper._defaultBuilder!;
  }
}
