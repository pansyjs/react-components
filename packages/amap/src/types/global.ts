// export type MapItem<T extends Object> =

/**
 * Get the union type of all the keys in an object type `T`
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 *
 * // Expect: "name" | "age" | "visible"
 * type PropsKeys = Keys<Props>;
 */
export type Keys<T extends object> = keyof T;

export type NonUndefined<A> = A extends undefined ? never : A;

export type FunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];
