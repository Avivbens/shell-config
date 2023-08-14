import { IGroup } from './group.model';

export interface IAppSetup {
  name: string;
  group: IGroup;
  commands: readonly string[];
  description?: string;
  default?: boolean;
  deps?: readonly string[];
  /**
   * @default false
   * @description If true, the app will be installed last. Cannot be a dependency!
   */
  last?: boolean;
}
