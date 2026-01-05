export const signUp = async (data: any) => {
  // Mock API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    data: {
      data: {
        ...data,
        id: 'mock-id',
      },
      message: 'Registration successful (Mock)',
    },
  };
};
