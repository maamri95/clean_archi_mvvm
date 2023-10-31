
export class FeatureFlag {
  /**
   * @param name - The name of the feature flag.
   * @param isEnabled - Indicates if the feature is enabled.
   */
    public uuid: string;
    constructor(public name: string, public isEnabled: boolean) {
      this.uuid = name;
  }
}
  