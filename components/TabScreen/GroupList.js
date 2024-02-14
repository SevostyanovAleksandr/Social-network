import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Chat from './Chat';
const GroupList = ({ groups, navigateToChat }) => {
    return (
        <View>
            {groups.map(group => (
                <TouchableOpacity key={group.id} onPress={() => navigateToChat(group.id)}>
                    <Text>{group.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default GroupList;