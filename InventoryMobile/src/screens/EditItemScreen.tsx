import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {itemService, UpdateItemData, Item} from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

type EditItemRouteProp = RouteProp<RootStackParamList, 'EditItem'>;
type EditItemNavigationProp = StackNavigationProp<RootStackParamList, 'EditItem'>;

const EditItemScreen: React.FC = () => {
  const route = useRoute<EditItemRouteProp>();
  const navigation = useNavigation<EditItemNavigationProp>();
  const {itemId} = route.params;

  const [item, setItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<UpdateItemData>({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    category: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<UpdateItemData>>({});

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const data = await itemService.getItemById(itemId);
      setItem(data);
      setFormData({
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
        category: data.category,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch item details');
      console.error('Error fetching item:', error);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UpdateItemData> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.category?.trim()) {
      newErrors.category = 'Category is required';
    }
    if (formData.quantity !== undefined && formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }
    if (formData.price !== undefined && formData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      await itemService.updateItem(itemId, formData);
      Alert.alert('Success', 'Item updated successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update item. Please try again.');
      console.error('Error updating item:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: keyof UpdateItemData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'quantity' || field === 'price' ? 
        parseFloat(value) || 0 : value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: undefined}));
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading item details..." />;
  }

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Item not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={formData.name || ''}
              onChangeText={value => updateField('name', value)}
              placeholder="Enter item name"
              placeholderTextColor="#a0aec0"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                errors.description && styles.inputError,
              ]}
              value={formData.description || ''}
              onChangeText={value => updateField('description', value)}
              placeholder="Enter item description"
              placeholderTextColor="#a0aec0"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Quantity *</Text>
              <TextInput
                style={[styles.input, errors.quantity && styles.inputError]}
                value={(formData.quantity || 0).toString()}
                onChangeText={value => updateField('quantity', value)}
                placeholder="0"
                placeholderTextColor="#a0aec0"
                keyboardType="numeric"
              />
              {errors.quantity && (
                <Text style={styles.errorText}>{errors.quantity}</Text>
              )}
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Price ($) *</Text>
              <TextInput
                style={[styles.input, errors.price && styles.inputError]}
                value={(formData.price || 0).toString()}
                onChangeText={value => updateField('price', value)}
                placeholder="0.00"
                placeholderTextColor="#a0aec0"
                keyboardType="decimal-pad"
              />
              {errors.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Category *</Text>
            <TextInput
              style={[styles.input, errors.category && styles.inputError]}
              value={formData.category || ''}
              onChangeText={value => updateField('category', value)}
              placeholder="Enter category"
              placeholderTextColor="#a0aec0"
            />
            {errors.category && (
              <Text style={styles.errorText}>{errors.category}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={submitting}>
            <Text style={styles.submitButtonText}>
              {submitting ? 'Updating...' : 'Update Item'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2d3748',
  },
  inputError: {
    borderColor: '#e53e3e',
  },
  textArea: {
    height: 100,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  errorText: {
    color: '#e53e3e',
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#2c5282',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#a0aec0',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e53e3e',
    textAlign: 'center',
  },
});

export default EditItemScreen;
