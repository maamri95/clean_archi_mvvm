import { container } from "tsyringe";
import { useMemo } from "react";

function useDi<T>(token: string): T {
  const instance = useMemo(() => container.resolve<T>(token), [token]);
  return instance;
}
export default useDi;
