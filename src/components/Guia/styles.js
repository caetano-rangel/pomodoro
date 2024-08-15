import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A3636',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  faqTitle: {
    color: '#D6BD98',
    marginTop: 90,
    marginBottom: 70,
    fontSize: 27,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 3,
    alignSelf: 'center',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#D6BD98',
    paddingVertical: 15,
    marginTop: 50,
  },
  itemExpanded: {
    backgroundColor: '#243E3E',
    borderRadius: 8,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#D6BD98',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
    flex: 1,
    marginRight: 10,
  },
  answerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  answer: {
    fontSize: 14,
    color: "#677D6A",
    marginLeft: 15,
    marginRight: 15,
    fontWeight: '400',
    textTransform: 'uppercase',
    lineHeight: 20,
  },
  icon: {
    marginRight: 10,
  },
});

export default styles;
