export const mockBasePlugin = jest.fn();
const cycleMock = jest.fn().mockImplementation(() => {
  return { cycle: mockBasePlugin };
});

export default cycleMock;
