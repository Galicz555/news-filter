export function compose<A, B, C>(
  fn1: (arg: B) => C,
  fn2: (arg: A) => B,
): (arg: A) => C;
export function compose<A, B, C, D>(
  fn1: (arg: C) => D,
  fn2: (arg: B) => C,
  fn3: (arg: A) => B,
): (arg: A) => D;

export function compose(...fns: Array<(arg: any) => any>) {
  return (x: any) => fns.reduceRight((v, f) => f(v), x);
}

// function isBiggerThanThree(value: number): boolean {
//   return value > 3;
// }

// function mapBoolToHumanOutput(value: boolean): string {
//   return value ? 'yes' : 'no';
// }

// const biggerThanThreeAndMapOutput = compose(
//   mapBoolToHumanOutput,
//   isBiggerThanThree,
// );

// biggerThanThreeAndMapOutput(3);
