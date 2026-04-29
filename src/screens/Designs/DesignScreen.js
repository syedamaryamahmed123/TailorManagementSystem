import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { Header, EmptyState, Modal, Input, Button } from '../../components/common';
import { AppContext } from '../../context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.md * 3) / 2;

const DesignScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [designName, setDesignName] = useState('');
  const [designNotes, setDesignNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const saveDesign = () => {
    if (!designName.trim()) {
      Alert.alert('Error', 'Please enter a design name');
      return;
    }
    dispatch({
      type: 'ADD_DESIGN',
      payload: {
        id: Date.now().toString(),
        name: designName,
        notes: designNotes,
        imageUri: selectedImage,
        createdAt: new Date().toISOString(),
      },
    });
    setModalVisible(false);
    setDesignName('');
    setDesignNotes('');
    setSelectedImage(null);
  };

  const handleDelete = (design) => {
    Alert.alert('Delete Design', `Delete "${design.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          dispatch({ type: 'DELETE_DESIGN', payload: design.id }),
      },
    ]);
  };

  const renderDesignCard = ({ item }) => (
    <TouchableOpacity
      style={styles.designCard}
      onPress={() => {}}
      activeOpacity={0.8}
    >
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.designImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Ionicons name="image-outline" size={36} color={colors.secondary} />
        </View>
      )}
      <View style={styles.designInfo}>
        <Text style={styles.designName} numberOfLines={1}>
          {item.name}
        </Text>
        {item.notes && (
          <Text style={styles.designNotes} numberOfLines={2}>
            {item.notes}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => handleDelete(item)}
      >
        <Ionicons name="trash-outline" size={16} color={colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Designs"
        subtitle={`${state.designs.length} designs`}
        rightIcon="add-circle-outline"
        onRightPress={() => setModalVisible(true)}
      />

      <FlatList
        data={state.designs}
        keyExtractor={(item) => item.id}
        renderItem={renderDesignCard}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="color-palette-outline"
            title="No designs yet"
            message="Upload reference images for your clothing designs"
            actionTitle="Add Design"
            onAction={() => setModalVisible(true)}
          />
        }
      />

      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Add New Design"
        size="lg"
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.uploadedImage}
              />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={32}
                  color={colors.secondary}
                />
                <Text style={styles.uploadText}>Tap to upload image</Text>
              </View>
            )}
          </TouchableOpacity>

          <Input
            label="Design Name"
            value={designName}
            onChangeText={setDesignName}
            placeholder="e.g., Summer Collection - Floral Dress"
            required
          />
          <Input
            label="Notes"
            value={designNotes}
            onChangeText={setDesignNotes}
            placeholder="Design details, fabric preferences..."
            multiline
            numberOfLines={3}
          />
          <Button
            title="Save Design"
            onPress={saveDesign}
            style={styles.saveButton}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  list: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  designCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    ...shadows.sm,
  },
  designImage: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  designInfo: {
    padding: spacing.sm,
  },
  designName: {
    ...typography.h3,
    fontSize: 14,
  },
  designNotes: {
    ...typography.bodySmall,
    fontSize: 11,
    marginTop: 2,
  },
  deleteIcon: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    padding: spacing.xs + 2,
    ...shadows.sm,
  },
  modalContent: {
    paddingVertical: spacing.md,
  },
  imageUpload: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBackground,
  },
  uploadText: {
    ...typography.bodySmall,
    marginTop: spacing.sm,
  },
  saveButton: {
    marginTop: spacing.sm,
  },
});

export default DesignScreen;
