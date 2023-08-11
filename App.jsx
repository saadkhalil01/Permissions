import React, { Component, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native'
import Contacts from 'react-native-contacts';


export default function App() {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [list, setList] = useState([])

  const ContactCard = ({ name, number }) => {
    return (
      <View style={styles.ContactCardDesign}>
        <Text style={{ color: 'black', fontSize: 19, fontWeight: '500' }}>{name}</Text>
        <Text style={{ color: 'black', fontSize: 19, fontWeight: '500' }}>{number}</Text>
      </View>
    )
  }
  const  DataRendered = () => {

    return (
      list.map((item, key) => {
        console.log(list)
        return 
        <ContactCard key={key} name={item.displayName}
          number={'98098098'} />
      }))



  }
  const requestContactsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      })
        .then((res) => {
          console.log('Permission: ', res);
          Contacts.getAll()
            .then((contacts) => {
              setList(prevList => [...prevList, ...contacts]);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((error) => {
          console.error('Permission error: ', error);
        });
    }
    catch (err) {
      return err
    }
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={{ flex: 1, backgroundColor: '#F09898', width: '100%', paddingHorizontal: '1%' }}>
      {list.map((contact, index) => (
        <ContactCard
         key={index}
         name={contact.displayName}
         number={contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : 'No number'}/>
      ))}
      </ScrollView>
      <View style={styles.buttonDesign}>
        <TouchableOpacity onPress={() => { requestContactsPermission(); }} style={styles.buttonInnerContainer} >
          <Text>.</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F09898',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: '8%',
    paddingTop: 20,
  },
  buttonDesign: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 50
  },
  buttonInnerContainer: {
    height: 55,
    width: 55,
    backgroundColor: 'red',
    borderRadius: 50
  },
  ContactCardDesign: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
    height: 90,
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
    marginBottom:'2%'
  }
});