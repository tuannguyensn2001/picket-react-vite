export const set = (key: string, item: string) => {
  localStorage.setItem(key, item);
};

export const deleteKey = (key: string) => {
  localStorage.removeItem(key);
};
