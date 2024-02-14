import { useEffect, useState } from 'react';
import { Schema } from 'zod';

export const useForm = (
  initialState: Record<string, string | number>,
  schema: Schema,
) => {
  const [values, setValues] = useState(initialState);
  const [formErrors, setErrors] = useState<Record<string, string | null>>({});
  const [hasErrors, setHasErrors] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const inputType = e.target.type;
    const value = inputType === 'number' ? +e.target.value : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
    setErrors({});
  };

  const validate = () => {
    const result = schema.safeParse(values);
    if (!result.success) {
      result.error.errors.map((error) => {
        setErrors((prev) => ({
          ...prev,
          [error.path.join('.')]: error.message,
        }));
      });
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }
  };

  useEffect(validate, [schema, values]);

  return {
    values,
    onChange,
    formErrors,
    hasErrors,
    setValues,
  };
};
