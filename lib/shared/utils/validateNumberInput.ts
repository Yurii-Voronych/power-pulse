interface ValidateNumberInputOptions {
  label: string;
  min?: number;
  max?: number;
  integer?: boolean;
}

export const validateNumberInput = (
  value: string,
  { label, min, max, integer = false }: ValidateNumberInputOptions,
) => {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return {
      value: null,
      error: `${label} is required`,
      isValid: false,
    };
  }

  const parsedValue = Number(trimmedValue);

  if (!Number.isFinite(parsedValue)) {
    return {
      value: null,
      error: `${label} must be a number`,
      isValid: false,
    };
  }

  if (integer && !Number.isInteger(parsedValue)) {
    return {
      value: null,
      error: `${label} must be a whole number`,
      isValid: false,
    };
  }

  if (min !== undefined && parsedValue < min) {
    return {
      value: null,
      error: `${label} must be at least ${min}`,
      isValid: false,
    };
  }

  if (max !== undefined && parsedValue > max) {
    return {
      value: null,
      error: `${label} must be no more than ${max}`,
      isValid: false,
    };
  }

  return {
    value: parsedValue,
    error: null,
    isValid: true,
  };
};
