const { useLocalSearchParams } = require("expo-router");

jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Linking.canOpenURL = jest.fn().mockResolvedValue(true);
  RN.Linking.openURL = jest.fn().mockResolvedValue(true);
  return RN;
});