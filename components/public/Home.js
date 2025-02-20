import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ProductsAll } from '../../helpers/misc/Products';
import { CategoriesAll } from '../../helpers/misc/Categories';


const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 45) / 2; // 45 = padding (15) * 2 + gap between cards (15)

export default function Home({navigation}) {
  const [products, setProducts] = useState([]);
  const[categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await ProductsAll();
      if (data?.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log('Error fetching products:', error);
    }
    setLoading(false);
  };


  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(product => product.productCat === selectedCategory);
  }, [selectedCategory, products]);



  const fetchCategories = async () => {
    setLoading(true)
    try {

      const data = await CategoriesAll()

      if(data) {
        setCategories(data)
      }
      
    } catch (error) {
      console.log('Error fetching categories:', error)
      
    }
    setLoading(false)
  }


  useEffect(() => {
    fetchProducts();
    fetchCategories()
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchProducts().then(() => setRefreshing(false));
    fetchCategories().then(() => setRefreshing(false))
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'MWK',
      maximumFractionDigits: 0,
    });
  };

  


const renderCategoryItem = ({ item }) => {
  // Special case for "All" category
  if (item === 'All') {
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          selectedCategory === 'All' && styles.categoryItemSelected,
        ]}
        onPress={() => setSelectedCategory('All')}
      >
        <Text
          style={[
            styles.categoryText,
            selectedCategory === 'All' && styles.categoryTextSelected,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item._id && styles.categoryItemSelected,
      ]}
      onPress={() => setSelectedCategory(item._id)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item._id && styles.categoryTextSelected,
        ]}
      >
        {item.catName}
      </Text>
    </TouchableOpacity>
  );

}



  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => {
        
        navigation.navigate('ProductDetail', { productId: item._id });
      }}
    >
      <Image
        source={{ uri: item.images[0].url }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.timerContainer}>
          <MaterialIcons name="timer" size={12} color="#666" />
          <Text style={styles.timerText}>2d 15h</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Categories Section */}
      <View style={styles.categoriesContainer}>
       

<FlatList
          horizontal
          data={['All', ...categories]} // Add 'All' to the categories
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item === 'All' ? 'all' : item._id}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
        />


      </View>

      {/* Products Grid */}
      


<FlatList
        key={`grid-${selectedCategory}`}
        data={filteredProducts} // Use filtered products instead of all products
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        columnWrapperStyle={styles.productRow}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          )
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  categoryItemSelected: {
    backgroundColor: '#333',
  },
  categoryText: {
    fontSize: 13,
    color: '#666',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  productsList: {
    padding: 15,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: CARD_WIDTH, // Square image
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 4,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});