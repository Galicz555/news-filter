export function próbáld_meg<T>(promise: Promise<T>): Promise<T> {
  return promise
    .then((data) => data as T)
    .catch((error) => {
      throw error;
    });
}
