import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ProductSingle } from '../../../helpers/misc/Products';

const { width } = Dimensions.get('window');

export default function ProductDetail({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    const data = await ProductSingle(productId);
    setProduct(data);
    setLoading(false);
  };

  const formatPrice = (price) => {
    return price?.toLocaleString('en-US', {
      style: 'currency',
      currency: 'MWK',
      maximumFractionDigits: 0,
    });
  };

  const handleBid = () => {
    // Handle bid submission here
    console.log('Bid submitted:', bidAmount);
    setModalVisible(false);
    setBidAmount('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image Carousel */}
      <View style={styles.carousel}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const offset = e.nativeEvent.contentOffset.x;
            setActiveImageIndex(Math.round(offset / width));
          }}
          scrollEventThrottle={16}
        >
          {product.images.map((image, index) => (
            <Image
              key={image._id}
              source={{ uri: image.url }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        
        {/* Carousel Indicators */}
        <View style={styles.indicators}>
          {product.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === activeImageIndex && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        
        <View style={styles.timerContainer}>
          <MaterialIcons name="timer" size={20} color="#666" />
          <Text style={styles.timerText}>2d 15h remaining</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity
          style={styles.bidButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="gavel" size={24} color="white" />
          <Text style={styles.bidButtonText}>Place Bid</Text>
        </TouchableOpacity>
      </View>

      {/* Bid Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Place Your Bid</Text>
            
            <View style={styles.currentPriceContainer}>
              <Text style={styles.currentPriceLabel}>Current Price:</Text>
              <Text style={styles.currentPrice}>{formatPrice(product.price)}</Text>
            </View>

            <Text style={styles.minimumBidText}>
              Minimum bid: {formatPrice(product.price + 10000)}
            </Text>

            <TextInput
              style={styles.bidInput}
              placeholder="Enter your bid amount"
              keyboardType="numeric"
              value={bidAmount}
              onChangeText={setBidAmount}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleBid}
              >
                <Text style={styles.submitButtonText}>Submit Bid</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    height: width * 0.8,
    position: 'relative',
  },
  image: {
    width: width,
    height: width * 0.8,
  },
  indicators: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    color: '#2E8B57',
    fontWeight: '600',
    marginBottom: 15,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  timerText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  bidButton: {
    backgroundColor: '#2E8B57',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  bidButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  currentPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  currentPriceLabel: {
    fontSize: 16,
    color: '#666',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E8B57',
  },
  minimumBidText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  bidInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  submitButton: {
    backgroundColor: '#2E8B57',
  },
  cancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});