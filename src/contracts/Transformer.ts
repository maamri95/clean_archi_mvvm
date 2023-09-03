export interface Transformer<From, To> {
  transform(input: From): To;
}
