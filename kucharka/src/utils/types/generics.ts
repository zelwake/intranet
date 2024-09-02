export type PickFromArray<T extends any[], K extends keyof any> = Pick<
  T[number],
  K
>;

export type NonNullableObject<T> = T extends null | undefined ? never : T;

export type InferFromArray<T extends any[]> = T[number];
