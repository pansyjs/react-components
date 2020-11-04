/// <reference types="@pansy/amap-types" />

export type Keys<T extends object> = keyof T;

export type NonUndefined<A> = A extends undefined ? never : A;

export type FunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];
