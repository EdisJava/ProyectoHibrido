import { FIREBASE_AUTH } from '@/FirebaseConf';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function ListScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      title: 'Primer Todo',
      description: 'Esta es la descripción del primer todo',
      completed: false,
    },
    {
      id: '2',
      title: 'Segundo Todo',
      description: 'Esta es la descripción del segundo todo',
      completed: false,
    },
  ]);

  const navigation = useNavigation<any>();

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      Alert.alert('Éxito', 'Sesión cerrada correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar la sesión');
    }
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <TouchableOpacity
      style={[styles.todoItem, item.completed && styles.completedTodo]}
      onPress={() => navigation.navigate('Details', { todo: item })}
    >
      <View style={styles.todoContent}>
        <Text style={[styles.todoTitle, item.completed && styles.completedText]}>
          {item.title}
        </Text>
        <Text style={styles.todoDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Tareas</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <Text style={styles.todoCount}>Total: {todos.length} tareas</Text>
        <Text style={styles.completedCount}>
          Completadas: {todos.filter(t => t.completed).length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 16,
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  logoutText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  todoItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedTodo: {
    opacity: 0.6,
    backgroundColor: '#e8f5e9',
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  todoDescription: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 18,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  todoCount: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  completedCount: {
    fontSize: 14,
    color: '#4CAF50',
  },
});
