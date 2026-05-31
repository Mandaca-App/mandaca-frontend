import {
    ReservationsNav,
    type ReservationSectionType,
} from '@/components/MyBusiness/reservationsNav/main';
import { Header } from '@/components/general/header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dados temporários para exemplo
const MOCK_RESERVATIONS: ReservationCard[] = [
    {
        id: '1',
        clientName: 'Diego Clebson',
        clientPhone: '(81) 8958-6543',
        clientImage: 'https://via.placeholder.com/48',
        date: 'Sáb, 12 de setembro',
        calendarDate: '2026-09-12',
        time: '20:00',
        guests: 4,
        status: 'confirmada',
        reason: 'Aniversário da minha filha',
    },
    {
        id: '2',
        clientName: 'Hivison Santos',
        clientPhone: '(81) 8324-1887',
        clientImage: null,
        date: 'Dom, 13 de setembro',
        calendarDate: '2026-09-13',
        time: '19:30',
        guests: 2,
        status: 'confirmada',
        reason: 'Encontro em família',
    },
    {
        id: '3',
        clientName: 'Ronaldo Ribeiro',
        clientPhone: '(81) 9124-2656',
        clientImage: 'https://via.placeholder.com/48',
        date: 'Seg, 14 de setembro',
        calendarDate: '2026-09-14',
        time: '21:00',
        guests: 6,
        status: 'aguardando',
        reason: 'Festa de corporativa',
    },
];

interface ReservationCard {
    id: string;
    clientName: string;
    clientPhone: string;
    clientImage: string | null;
    date: string;
    calendarDate: string;
    time: string;
    guests: number;
    status: 'confirmada' | 'aguardando';
    reason: string;
}

const WEEKDAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MONTH_LABELS = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
];

const parseLocalDate = (value: string) => {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
};

const toCalendarKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const formatCalendarTitle = (date: Date) =>
    `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`;

const formatDayLabel = (date: Date) =>
    new Intl.DateTimeFormat('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
    }).format(date);

const getReservationStatusDots = (reservations: ReservationCard[]) => {
    const hasConfirmed = reservations.some((item) => item.status === 'confirmada');
    const hasPending = reservations.some((item) => item.status === 'aguardando');

    return {
        hasConfirmed,
        hasPending,
    };
};

// Componente para iniciais
const Initials = ({ name }: { name: string }) => {
    const initials = name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center">
            <Text className="text-primary font-bold text-lg">{initials}</Text>
        </View>
    );
};

// Componente para linha de informação
const InfoLine = ({
    icon,
    label,
    value,
}: {
    icon: string;
    label: string;
    value: string;
}) => (
    <View className="flex-row items-center justify-between px-5 py-3.5 border-b border-secondary">
        <View className="flex-row items-center gap-3">
            <Ionicons name={icon as any} size={18} color="#C34342" />
            <Text className="text-sm text-dark font-medium">{label}:</Text>
        </View>
        <Text className="text-sm text-dark font-semibold">{value}</Text>
    </View>
);

const sanitizePhoneNumber = (value: string) => value.replace(/\D/g, '');

const buildWhatsAppMessage = (reservation: ReservationCard) =>
    [
        `Olá, ${reservation.clientName}!`,
        '',
        'Segue um resumo da sua reserva:',
        `- Data: ${reservation.date}`,
        `- Horário: ${reservation.time}`,
        `- Pessoas: ${reservation.guests}`,
        `- Motivo: ${reservation.reason}`,
    ].join('\n');

const ReservationCardComponent = ({
    reservation,
    onChatPress,
}: {
    reservation: ReservationCard;
    onChatPress: (reservationId: string, clientName: string) => void;
}) => {
    const [imageError, setImageError] = useState(false);

    const handlePhonePress = async () => {
        const phoneNumber = sanitizePhoneNumber(reservation.clientPhone);
        if (!phoneNumber) return;

        const phoneUrl = `tel:${phoneNumber}`;
        if (await Linking.canOpenURL(phoneUrl)) {
            await Linking.openURL(phoneUrl);
        }
    };

    const handleWhatsAppPress = async () => {
        const phoneNumber = sanitizePhoneNumber(reservation.clientPhone);
        if (!phoneNumber) return;

        const message = buildWhatsAppMessage(reservation);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        if (await Linking.canOpenURL(whatsappUrl)) {
            await Linking.openURL(whatsappUrl);
        }
    };

    return (
        <View className="mx-4 mb-4 rounded-[14px] bg-light overflow-hidden" style={styles.card}>
            {/* Header */}
            <View className="h-[42px] bg-primary flex-row items-center justify-between px-5">
                <View className="flex-row items-center gap-3 flex-1">
                    <Ionicons name="person" size={20} color="#FFFFFF" />
                    <Text className="text-light font-bold text-sm uppercase flex-1">
                        {reservation.clientName}
                    </Text>
                </View>
                <Pressable
                    onPress={() =>
                        onChatPress(reservation.id, reservation.clientName)
                    }
                >
                    <Ionicons name="chatbubble-outline" size={20} color="#FFFFFF" />
                </Pressable>
            </View>

            {/* Client Info Section */}
            <View className="flex-row items-center gap-4 px-5 py-4 border-b border-secondary">
                {!imageError && reservation.clientImage ? (
                    <Image
                        source={{ uri: reservation.clientImage }}
                        className="w-16 h-16 rounded-full"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <Initials name={reservation.clientName} />
                )}
                <Pressable onPress={handlePhonePress} className="flex-1">
                    <View className="flex-row items-center gap-2">
                        <Ionicons name="call" size={16} color="#C34342" />
                        <Text className="text-sm text-dark font-semibold">
                            {reservation.clientPhone}
                        </Text>
                    </View>
                </Pressable>
            </View>

            {/* Info Lines */}
            <InfoLine
                icon="calendar-outline"
                label="Data"
                value={reservation.date}
            />
            <InfoLine
                icon="time-outline"
                label="Horário"
                value={reservation.time}
            />
            <InfoLine
                icon="people-outline"
                label="Pessoas"
                value={`${reservation.guests} ${reservation.guests > 1 ? 'pessoas' : 'pessoa'
                    }`}
            />

            {/* Reason/Notes Section */}
            <View className="px-5 py-4 border-b border-secondary gap-2.5">
                <View className="flex-row items-center gap-2.5">
                    <Ionicons name="document-text-outline" size={18} color="#C34342" />
                    <Text className="text-sm font-semibold text-dark">
                        Motivo da reserva
                    </Text>
                </View>
                <TextInput
                    editable={false}
                    value={reservation.reason}
                    multiline
                    className="bg-secondary/50 rounded-lg px-3.5 py-2.5 text-sm text-dark font-normal"
                    style={{ minHeight: 80 }}
                />
            </View>

            {/* Action Buttons */}
            {reservation.status === 'aguardando' ? (
                <View className="flex-row gap-3 px-5 py-4">
                    <Pressable className="flex-1 flex-row items-center justify-center gap-2.5 py-3 rounded-lg bg-primary">
                        <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                        <Text className="text-light font-semibold text-sm">
                            Confirmar
                        </Text>
                    </Pressable>
                    <Pressable className="flex-1 flex-row items-center justify-center gap-2.5 py-3 rounded-lg bg-secondary">
                        <Ionicons name="close" size={18} color="#2C2C2C" />
                        <Text className="text-dark font-semibold text-sm">
                            Cancelar
                        </Text>
                    </Pressable>
                </View>
            ) : (
                <View className="flex-row gap-3 px-5 py-4">
                    <Pressable className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-lg bg-primary/10">
                        <Ionicons name="calendar-outline" size={18} color="#C34342" />
                        <Text className="text-primary font-semibold text-sm">
                            Adicionar ao Calendário
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={handleWhatsAppPress}
                        className="h-12 w-12 flex-row items-center justify-center rounded-lg bg-green-100"
                    >
                        <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
                    </Pressable>
                </View>
            )}
        </View>
    );
};

const CalendarSection = ({ reservations }: { reservations: ReservationCard[] }) => {
    const initialMonth = parseLocalDate(reservations[0]?.calendarDate ?? '2026-09-01');
    const [currentMonth, setCurrentMonth] = useState(
        new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
    );
    const [selectedDate, setSelectedDate] = useState<string | null>(
        reservations[0]?.calendarDate ?? null,
    );

    const reservationsByDay = reservations.reduce<Record<string, ReservationCard[]>>(
        (accumulator, reservation) => {
            accumulator[reservation.calendarDate] = [
                ...(accumulator[reservation.calendarDate] ?? []),
                reservation,
            ];

            return accumulator;
        },
        {},
    );

    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0,
    ).getDate();
    const firstWeekday = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1,
    ).getDay();

    const calendarCells = [
        ...Array.from({ length: firstWeekday }).map(() => null),
        ...Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const calendarDate = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day,
            );
            return calendarDate;
        }),
    ];

    const selectedReservations = selectedDate ? reservationsByDay[selectedDate] ?? [] : [];

    const goToPreviousMonth = () => {
        setCurrentMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const goToNextMonth = () => {
        setCurrentMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    return (
        <View className="flex-1 px-4 py-4 gap-4">
            <View className="flex-row items-center justify-between px-2">
                <Pressable onPress={goToPreviousMonth} className="h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Ionicons name="chevron-back" size={18} color="#2C2C2C" />
                </Pressable>

                <Text className="text-lg font-bold text-dark capitalize">
                    {formatCalendarTitle(currentMonth)}
                </Text>

                <Pressable onPress={goToNextMonth} className="h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Ionicons name="chevron-forward" size={18} color="#2C2C2C" />
                </Pressable>
            </View>

            <View className="flex-row">
                {WEEKDAY_LABELS.map((label) => (
                    <View key={label} className="flex-1 items-center py-2">
                        <Text className="text-xs font-semibold text-black/50">{label}</Text>
                    </View>
                ))}
            </View>

            <View className="flex-row flex-wrap">
                {calendarCells.map((date, index) => {
                    if (!date) {
                        return <View key={`empty-${index}`} className="w-[14.285%] aspect-square" />;
                    }

                    const dayKey = toCalendarKey(date);
                    const dayReservations = reservationsByDay[dayKey] ?? [];
                    const dots = getReservationStatusDots(dayReservations);
                    const isSelected = selectedDate === dayKey;

                    return (
                        <Pressable
                            key={dayKey}
                            onPress={() => setSelectedDate(dayKey)}
                            className={`w-[14.285%] aspect-square items-center justify-center rounded-xl border ${isSelected ? 'bg-primary border-primary' : 'bg-light border-secondary'
                                }`}
                        >
                            <Text className={`text-sm font-semibold ${isSelected ? 'text-light' : 'text-dark'}`}>
                                {date.getDate()}
                            </Text>

                            {(dots.hasConfirmed || dots.hasPending) && (
                                <View className="flex-row gap-1 mt-1">
                                    {dots.hasConfirmed ? (
                                        <View className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    ) : null}
                                    {dots.hasPending ? (
                                        <View className="h-1.5 w-1.5 rounded-full bg-black/40" />
                                    ) : null}
                                </View>
                            )}
                        </Pressable>
                    );
                })}
            </View>

            <View className="bg-light rounded-2xl p-4 gap-3">
                <Text className="text-base font-bold text-dark">
                    {selectedDate ? formatDayLabel(parseLocalDate(selectedDate)) : 'Selecione um dia'}
                </Text>

                {selectedReservations.length > 0 ? (
                    selectedReservations.map((reservation) => (
                        <View key={reservation.id} className="rounded-xl bg-secondary/50 px-4 py-3 gap-1">
                            <Text className="text-sm font-semibold text-dark uppercase">
                                {reservation.clientName}
                            </Text>
                            <Text className="text-xs text-black/60">
                                {reservation.time} • {reservation.guests} pessoas • {reservation.status === 'confirmada' ? 'Confirmada' : 'Aguardando'}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text className="text-sm text-black/50">
                        Nenhuma reserva encontrada nesse dia.
                    </Text>
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
    },
});


export default function Reservations() {
    const [activeSection, setActiveSection] =
        useState<ReservationSectionType>('confirmadas');

    const handleChatPress = (reservationId: string, clientName: string) => {
        router.push({
            pathname: '/(mybusiness)/(reservations)/chat' as any,
            params: {
                reservationId,
                clientName,
            },
        });
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'confirmadas':
                return (
                    <FlatList
                        data={MOCK_RESERVATIONS.filter((r) => r.status === 'confirmada')}
                        renderItem={({ item }) => (
                            <ReservationCardComponent
                                reservation={item}
                                onChatPress={handleChatPress}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingVertical: 16 }}
                        showsVerticalScrollIndicator={false}
                    />
                );
            case 'aguardando':
                return (
                    <FlatList
                        data={MOCK_RESERVATIONS.filter((r) => r.status === 'aguardando')}
                        renderItem={({ item }) => (
                            <ReservationCardComponent
                                reservation={item}
                                onChatPress={handleChatPress}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingVertical: 16 }}
                        showsVerticalScrollIndicator={false}
                    />
                );
            case 'calendario':
                return (
                    <CalendarSection
                        reservations={MOCK_RESERVATIONS}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1">
                <Header title="Reservas" showBackButton showNotificationButton />
                <ReservationsNav
                    initialSection="confirmadas"
                    onSectionChange={setActiveSection}
                />
                {renderSection()}
            </View>
        </SafeAreaView>
    );
}
