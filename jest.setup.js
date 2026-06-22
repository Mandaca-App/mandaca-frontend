const mockNavigate = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

const mockUseRouter = jest.fn(() => ({
  push: mockNavigate,
  replace: mockReplace,
  back: mockBack,
}));

jest.mock('expo-router', () => ({
  router: {
    navigate: mockNavigate,
    replace: mockReplace,
    back: mockBack,
    push: mockNavigate,
  },
  useRouter: mockUseRouter,
  useLocalSearchParams: jest.fn(() => ({})),
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Linking.canOpenURL = jest.fn().mockResolvedValue(true);
  RN.Linking.openURL = jest.fn().mockResolvedValue(true);
  return RN;
});
