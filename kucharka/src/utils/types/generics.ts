export type NonNullableObject<T> = T extends null | undefined ? never : T;

export type ArrayElement<T extends any[]> = T[number];

export type PickFromArray<
  T extends any[],
  K extends keyof ArrayElement<T>
> = Pick<ArrayElement<T>, K>;
