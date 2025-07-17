import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;
import { AuthContext } from '../contexts/AuthContext';

export default function AccountScreen() {
  const { user, setUser } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');

  const handleSave = () => {
    setUser({ ...user, name: editName, email: editEmail });
    setModalVisible(false);
  };

  const handleEditPersonalInfo = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setModalVisible(true);
  };

  const handleEditProfilePicture = () => {};
  const handleNavigate = (screen) => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title} accessibilityRole="header">Profile</Text>

        <View style={styles.profileImageWrapper}>
          <Image
            source={{ uri: user?.avatar || 'https://placehold.co/96x96' }}
            style={styles.profileImage}
            accessibilityLabel="Profile picture"
          />
          <TouchableOpacity
            style={styles.editIconWrapper}
            onPress={handleEditProfilePicture}
            accessibilityLabel="Edit profile picture"
            accessibilityRole="button"
          >
            <FontAwesome5 name="pen" size={18} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.card} accessibilityLabel="Personal info section">
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} accessibilityRole="header">Personal info</Text>
            <TouchableOpacity
              onPress={handleEditPersonalInfo}
              accessibilityLabel="Edit personal info"
              accessibilityRole="button"
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome5 name="user" size={20} color="#1c1c1e" style={styles.icon} />
            <View>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.infoText}>{user?.name}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome5 name="envelope" size={20} color="#1c1c1e" style={styles.icon} />
            <View>
              <Text style={styles.label}>E-mail</Text>
              <Text style={styles.infoText}>{user?.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome5 name="phone-alt" size={20} color="#1c1c1e" style={styles.icon} />
            <View>
              <Text style={styles.label}>Phone number</Text>
              <Text style={styles.infoText}>{user?.phone || '—'}</Text>
            </View>
          </View>

          <View style={[styles.infoRow, { alignItems: 'flex-start' }]}>
            <FontAwesome5 name="home" size={20} color="#1c1c1e" style={styles.icon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Home address</Text>
              <Text style={[styles.infoText, { lineHeight: 20 }]}>{user?.address || '—'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.accountInfoCard} accessibilityLabel="Account info section">
          <Text style={styles.cardTitle} accessibilityRole="header">Account info</Text>
        </View>
      </ScrollView>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Edit Personal Info</Text>
            <TextInput
              style={modalStyles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Name"
            />
            <TextInput
              style={modalStyles.input}
              value={editEmail}
              onChangeText={setEditEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={modalStyles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={modalStyles.cancelBtn}>
                <Text style={modalStyles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={modalStyles.saveBtn}>
                <Text style={modalStyles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f3',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 140,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 32,
  },
  profileImageWrapper: {
    position: 'relative',
    marginBottom: 40,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#d1d5db',
  },
  editIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  card: {
    width: 335,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  editText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 24,
    marginRight: 16,
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#1c1c1e',
  },
  accountInfoCard: {
    position: 'absolute',
    bottom: 90,
    left: '50%',
    marginLeft: -167.5,
    width: 335,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
});

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1c1c1e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  cancelBtn: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: '#888',
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 