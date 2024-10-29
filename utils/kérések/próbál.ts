export function próbáld_meg<T>(promise: Promise<T>): Promise<T | void> {
  return promise
    .then((data) => data as T)
    .catch((error) => {
      if (error instanceof Error) {
        console.error(error.message);
      } else console.log(error);
    });
}
