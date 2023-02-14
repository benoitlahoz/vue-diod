import { VueDiodBuilder } from '../builder';

/**
 * A private (not exported) helper class to cache the default builder
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
   * Set the default builder on the static class.
   */
  public static set defaultBuilder(builder: VueDiodBuilder) {
    // Builder can be assigned only once.

    if (!VueDiodHelper._defaultBuilder) {
      VueDiodHelper._defaultBuilder = builder;

      // Just in case: Prevent from further modifications.

      Object.seal(VueDiodHelper);
    }
  }

  /**
   * Get the default builder.
   */
  public static get defaultBuilder(): VueDiodBuilder {
    return VueDiodHelper._defaultBuilder!;
  }
}
