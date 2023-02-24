type TaskNoneInput<Data> = () => Promise<Data> | Data;
type TaskWithInput<Data, Input> = (
  input: Input,
) => Promise<Data> | Data;
type Task<Data, Input = undefined> =
  | TaskNoneInput<Data>
  | TaskWithInput<Data, Input>;

type ExecuteOrReturnCache<Data, Input = undefined> = (
  input?: Input,
) => Promise<Data>;

export interface CacheAdapter {
  get: <Data>(key: string) => Promise<Data | undefined>;
  put: <Data>(key: string, value: Data) => Promise<void>;
}

export type CreateInstantCache = <Data, Input>(
  task: Task<Data, Input>,
) => ExecuteOrReturnCache<Data, Input>;

export function createInstantCacheFactory(
  adapter: CacheAdapter | (() => CacheAdapter),
) {
  const createInstantCache: CreateInstantCache = <
    Data,
    Input,
  >(task: Task<Data, Input>) => {
    const _adapter = typeof adapter === "function" ? adapter() : adapter;

    const executeOrReturnCache: ExecuteOrReturnCache<Data, Input> = async (
      input,
    ): Promise<Data> => {
      const key = input == null
        ? ""
        : typeof input === "object"
        ? JSON.stringify(input)
        : String(input);

      const cachedData = await _adapter.get<Data>(key);
      if (cachedData) {
        return cachedData;
      }

      const result = input
        ? await task(input)
        : await (task as TaskNoneInput<Data>)();
      await _adapter.put(key, result);
      return result;
    };

    return executeOrReturnCache;
  };

  return createInstantCache;
}
