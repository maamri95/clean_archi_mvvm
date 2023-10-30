import {container, InjectionToken} from "tsyringe";
import { useMemo } from "react";

function useDi<T>(token: InjectionToken<T>): T {
  const instance = useMemo(() => container.resolve<T>(token), [token]);
  return instance;
}
export default useDi;
