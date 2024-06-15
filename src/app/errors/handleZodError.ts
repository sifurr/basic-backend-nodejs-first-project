import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";

const handleZodError = (err: ZodError) => {
  const statusCode = 422;
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

export default handleZodError;
