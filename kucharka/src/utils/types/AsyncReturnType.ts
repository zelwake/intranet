import { NonNullableObject } from "./generics";

export type AsyncReturnType<T extends (...args: any) => any> =
  NonNullableObject<Awaited<ReturnType<T>>>;
