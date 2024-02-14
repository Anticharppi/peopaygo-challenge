export const getSafetyLocalStorage = <T>(
  key: string,
  parse: boolean = false,
): T | null => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    if (!item) return null;
    if (parse) return JSON.parse(item) as T;
    return item as T;
  }
  return null;
};

export const getHeaders = () => {
  const token = getSafetyLocalStorage<string>('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};
