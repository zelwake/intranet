type NonNullableObject<T> = T extends null | undefined ? never : T;

export type AsyncReturnType<T extends (...args: any) => any> =
  NonNullableObject<Awaited<ReturnType<T>>>;
