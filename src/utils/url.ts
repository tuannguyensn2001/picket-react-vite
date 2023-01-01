export const getPreviousUrl = (): string | null => {
  return localStorage.getItem("previous_url");
};
