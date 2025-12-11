import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={[styles.screen, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
      <ThemedText type="title">Home</ThemedText>
      <ThemedText>Bienvenido a tu aplicación</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffecb9', 
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30, 
  },
  text: {
    marginBottom: 50,
    textAlign: 'center',
  },
  countdown: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b5998',
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    height: 30,
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b5998',
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20, 
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
    color: '#ccc', 
  },
  starSelected: {
    color: '#FFD700',
  },
});