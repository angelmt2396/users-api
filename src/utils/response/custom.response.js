export const customResponse = (data) => {
  return {
    status: data.status,
    code: data.code,
    message: data.message,
    data: data.data,
  };
};
