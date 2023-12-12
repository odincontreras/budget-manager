export default function throwError(
  errorProps: {
    name: string;
    message: string;
  },
  customMessage?: string,
): never {
  const { name, message } = errorProps;

  const error = new Error(customMessage || message);

  error.name = name;

  throw error;
}
