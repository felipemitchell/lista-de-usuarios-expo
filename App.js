import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarUsuarios() {
    setCarregando(true);
    setErro('');
    try {
      const resposta = await fetch(API_URL);
      if (!resposta.ok) throw new Error('Falha ao consultar a API');
      const dados = await resposta.json();
      setUsuarios(dados);
    } catch (e) {
      setErro('Não foi possível carregar os usuários. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { carregarUsuarios(); }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.titulo}>Lista de Usuários</Text>
      <Text style={styles.subtitulo}>Dados da API JSONPlaceholder</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#4f46e5" style={styles.centro} />
      ) : erro ? (
        <View style={styles.centro}>
          <Text style={styles.erro}>{erro}</Text>
          <Pressable style={styles.botao} onPress={carregarUsuarios}>
            <Text style={styles.botaoTexto}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <View style={styles.cartao}>
              <Text style={styles.nome}>{item.name}</Text>
              <Text style={styles.detalhe}>E-mail: {item.email}</Text>
              <Text style={styles.detalhe}>Cidade: {item.address.city}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', paddingTop: 48 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#182238', marginHorizontal: 20 },
  subtitulo: { fontSize: 14, color: '#64748b', marginHorizontal: 20, marginTop: 4, marginBottom: 16 },
  lista: { paddingHorizontal: 16, paddingBottom: 24 },
  cartao: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  nome: { fontSize: 17, fontWeight: 'bold', color: '#1e293b', marginBottom: 6 },
  detalhe: { fontSize: 14, color: '#475569', marginTop: 3 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  erro: { color: '#b91c1c', textAlign: 'center', marginBottom: 16 },
  botao: { backgroundColor: '#4f46e5', borderRadius: 8, paddingHorizontal: 18, paddingVertical: 12 },
  botaoTexto: { color: '#fff', fontWeight: 'bold' }
});
