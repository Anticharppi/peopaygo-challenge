import { useState } from 'react';
import { Schema } from 'zod';

export const useForm = (
  initialState: Record<string, string>,
  schema: Schema,
) => {
  const [values, setValues] = useState(initialState);
  const [formErrors, setErrors] = useState<Record<string, string | null>>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
    } else {
      setErrors({});
      result.error.errors.map((error) => {
        setErrors((prev) => ({
          ...prev,
          [error.path.join('.')]: error.message,
        }));
      });
    }
  };

  return {
    values,
    onChange,
    formErrors,
    setValues,
  };
};
