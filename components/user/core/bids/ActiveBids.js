import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';

const ActiveBids = ({ navigation }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBidRankings = async (productId) => {
    try {
      // Fetch all bids for this product to determine rank
      const response = await axios.get(`${ApiUrl}/product/bids/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success && response.data.bidders) {
        // Sort bidders by bid amount (highest first)
        const sortedBidders = [...response.data.bidders].sort((a, b) => 
          b.bidAmount - a.bidAmount
        );
        
        // Find user's position in the sorted list
        const userIndex = sortedBidders.findIndex(bidder => 
          bidder.userId.toString() === user._id.toString()
        );
        
        const userRank = userIndex !== -1 ? userIndex + 1 : null;
        const isWinning = userRank === 1;
        const totalBidders = sortedBidders.length;
        const highestBid = sortedBidders.length > 0 ? sortedBidders[0].bidAmount : 0;
        
        return {
          rank: userRank,
          isWinning,
          totalBidders,
          highestBid
        };
      }
      
      return null;
    } catch (error) {
      console.error(`Error fetching rankings for product ${productId}:`, error);
      return null;
    }
  };

  const fetchBids = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${ApiUrl}/user/my_bids`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data.success) {
        // First, map the basic bid information
        const basicBids = response.data.bids.map(bid => {
          const product = bid.productId;
          const userBidAmount = bid.bidAmount;
          
          return {
            bidId: product._id,
            productId: product._id,
            productName: product.name,
            productCategory: product.productCat,
            productImage: product.images && product.images.length > 0 ? product.images[0] : null,
            bidAmount: userBidAmount,
            startingPrice: product.price,
            timeLeft: calculateTimeLeft(product.bidExpire),
            // These will be populated later
            rank: null,
            isWinning: null,
            totalBidders: null,
            highestBid: null
          };
        });
        
        // Now fetch ranking information for each bid in parallel
        const bidsWithRankings = await Promise.all(
          basicBids.map(async (bid) => {
            const rankingInfo = await fetchBidRankings(bid.productId);
            if (rankingInfo) {
              return {
                ...bid,
                rank: rankingInfo.rank,
                isWinning: rankingInfo.isWinning,
                totalBidders: rankingInfo.totalBidders,
                highestBid: rankingInfo.highestBid
              };
            }
            return bid;
          })
        );
        
        setBids(bidsWithRankings);
      }
    } catch (error) {
      console.error('Error fetching bids:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token, user._id]);
  
  // Function to calculate time left
  const calculateTimeLeft = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffMs = expiry - now;
    
    if (diffMs <= 0) return "Expired";
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      return `${diffMinutes}m`;
    }
  };

  useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBids();
  };

  // Helper function to get ordinal suffix
  const getOrdinalSuffix = (num) => {
    if (num > 3 && num < 21) return 'th';
    switch (num % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const renderBidItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.bidCard}
        onPress={() => navigation.navigate('BidDetails', { bidId: item.bidId })}
      >
        <View style={styles.bidHeader}>
          <View style={styles.productImageContainer}>
            {item.productImage ? (
              <Image 
                source={{ uri: "https://avatar.iran.liara.run/public/41" }} 
                style={styles.productImage} 
                resizeMode="cover"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <MaterialIcons name="image" size={24} color="#ccc" />
              </View>
            )}
          </View>
          
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={1}>{item.productName}</Text>
           
          </View>
        </View>
  
        <View style={styles.bidDetails}>
          <View style={styles.bidInfoRow}>
            <Text style={styles.bidInfoLabel}>Your Bid:</Text>
            <Text style={styles.bidAmount}>MWK {item.bidAmount.toLocaleString()}</Text>
          </View>
          
          <View style={styles.bidInfoRow}>
            <Text style={styles.bidInfoLabel}>
              {item.highestBid ? "Highest Bid:" : "Starting Price:"}
            </Text>
            <Text style={styles.bidHighest}>
              MWK {(item.highestBid || item.startingPrice).toLocaleString()}
            </Text>
          </View>
          
          <View style={styles.bidInfoRow}>
            <Text style={styles.bidInfoLabel}>Status:</Text>
            <Text style={item.timeLeft === "Expired" ? styles.bidExpired : styles.bidTimeLeft}>
              {item.timeLeft === "Expired" ? "Ended" : `Ends in: ${item.timeLeft}`}
            </Text>
          </View>
        </View>
        
        {/* Add Ranking Section */}
        {item.rank !== null && (
          <View style={styles.bidStatus}>
            <View style={styles.rankContainer}>
              <Text style={styles.rankLabel}>Your Rank:</Text>
              <View style={[
                styles.rankBadge,
                item.rank === 1 ? styles.rankFirst : 
                item.rank === 2 ? styles.rankSecond : 
                item.rank === 3 ? styles.rankThird : styles.rankOther
              ]}>
                <Text style={styles.rankText}>
                  {item.rank}{getOrdinalSuffix(item.rank)} / {item.totalBidders}
                </Text>
              </View>
            </View>
            
            <View style={styles.statusContainer}>
              {item.isWinning ? (
                <View style={styles.winningStatus}>
                  <FontAwesome name="trophy" size={16} color="#FFD700" />
                  <Text style={styles.winningText}>Leading</Text>
                </View>
              ) : (
                <View style={styles.notWinningStatus}>
                  <FontAwesome name="arrow-circle-up" size={16} color="#FF6B6B" />
                  <Text style={styles.notWinningText}>Outbid</Text>
                </View>
              )}
            </View>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.bidAgainButton}
          onPress={() => navigation.navigate('PlaceBid', { 
            productId: item.productId,
            currentBid: item.bidAmount,
            highestBid: item.highestBid || item.startingPrice
          })}
        >
          <Text style={styles.bidAgainText}>Place New Bid</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a085" />
        <Text style={styles.loadingText}>Loading your bids...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Active Bids</Text>
      
      {bids.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="local-offer" size={60} color="#ccc" />
          <Text style={styles.emptyText}>You don't have any active bids</Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => navigation.navigate('ExploreProducts')}
          >
            <Text style={styles.exploreButtonText}>Explore Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bids}
          keyExtractor={(item) => item.bidId.toString()}
          renderItem={renderBidItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#16a085"]}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  listContainer: {
    paddingBottom: 20,
  },
  bidCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bidHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  productImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  bidDetails: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingBottom: 12,
  },
  bidInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bidInfoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  bidAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#16a085',
  },
  bidHighest: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  bidTimeLeft: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '500',
  },
  bidExpired: {
    fontSize: 14,
    color: '#95a5a6',
    fontWeight: '500',
  },
  bidStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginRight: 8,
  },
  rankBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  rankFirst: {
    backgroundColor: '#FFD700',
  },
  rankSecond: {
    backgroundColor: '#C0C0C0',
  },
  rankThird: {
    backgroundColor: '#CD7F32',
  },
  rankOther: {
    backgroundColor: '#ecf0f1',
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  winningStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    
}, })


export default ActiveBids;