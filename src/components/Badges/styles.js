import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1A3636',
    },
    title: {
        color: '#D6BD98',
        marginTop: 90,
        fontSize: 24,
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 3,
    },
    content: {
        marginTop: 60,
        width: '100%',
    },
    titleMedal: {
        color: '#D6BD98',
        fontSize: 14,
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginLeft: 20,
        marginBottom: 5,
    },
    line: {
        width: '60%',
        height: 1,
        backgroundColor: '#D6BD98',
    },
    boxMedals: {
        flexDirection: 'row',
        gap: 30,
        marginTop: 40,
        justifyContent: 'center',
    },
    medals: {
        alignItems: 'center',
    },
    textMedal: {
        color: '#677D6A',
        top: 14,
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 2,
    },
});

export default styles;
