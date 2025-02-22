import React from 'react'
import { Text, View } from 'react-native'

export default function BidComp({route}) {
    const {productId} = route.params
  return (
    <View>

        <Text>Bid Component {productId}</Text>
    </View>
  )
}
