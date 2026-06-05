import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ReservationSectionType =
  | 'confirmadas'
  | 'aguardando'
  | 'calendario';

interface ReservationsNavProps {
  onSectionChange: (section: ReservationSectionType) => void;
  initialSection?: ReservationSectionType;
}

const SECTION_OPTIONS: { id: ReservationSectionType; label: string }[] = [
  { id: 'confirmadas', label: 'Confirmadas' },
  { id: 'aguardando', label: 'Aguardando' },
  { id: 'calendario', label: 'Calendário' },
];

export const ReservationsNav = ({
  onSectionChange,
  initialSection = 'confirmadas',
}: ReservationsNavProps) => {
  const [activeSection, setActiveSection] =
    useState<ReservationSectionType>(initialSection);

  const handleSectionPress = (sectionId: ReservationSectionType) => {
    setActiveSection(sectionId);
    onSectionChange(sectionId);
  };

  return (
    <View className="flex-row gap-3 px-4 py-2">
      {SECTION_OPTIONS.map((section) => (
        <Pressable
          key={section.id}
          onPress={() => handleSectionPress(section.id)}
          className={`flex-1 h-[30px] rounded-lg justify-center items-center ${
            activeSection === section.id ? 'bg-primary' : 'bg-secondary'
          }`}
          style={[
            styles.sectionButton,
            activeSection === section.id
              ? styles.sectionButtonActive
              : styles.sectionButtonInactive,
          ]}
        >
          <Text
            className={`text-sm font-semibold ${
              activeSection === section.id ? 'text-light' : 'text-dark'
            }`}
          >
            {section.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionButton: {
    minHeight: 48,
  },
  sectionButtonActive: {
    shadowColor: '#C34342',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionButtonInactive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
