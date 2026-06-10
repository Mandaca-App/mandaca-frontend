const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

const mockUseRouter = jest.fn(() => ({
  push: mockPush,
  replace: mockReplace,
  back: mockBack,
}));

jest.mock('expo-router', () => ({
  useRouter: mockUseRouter,
  useLocalSearchParams: jest.fn(() => ({})),
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Linking.canOpenURL = jest.fn().mockResolvedValue(true);
  RN.Linking.openURL = jest.fn().mockResolvedValue(true);
  return RN;
});