import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Text, View } from 'react-native'
import {  useSelector } from 'react-redux';
import { ApiUrl } from '../../../../helpers/ApiUrl';


export default function BidComp({route}) {
    const {productId} = route.params
    const { token } = useSelector((state) => state.auth);
    const[bids, setBids] = useState([])
     
    const fetchBids = async () => {
        if(!productId) {
            return ""
        }
             try {
                const response = await axios.get(`${ApiUrl}/user/product_bidders/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if(response.data) {
                    setBids(response.data.bidders)
                }
             } catch (error) {

                console.log("there was a problem")
                
             }    
    }


    console.log(bids)



  return (
    <View>

        <Text>Bid Component {productId}</Text>
    </View>
  )
}
