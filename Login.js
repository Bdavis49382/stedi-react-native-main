import {useState} from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, TextInput , Text, Image, View} from "react-native";

const SendText = async (phoneNumber) => {
  console.log(phoneNumber);
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'Post',
    headers: {
      'Content-Type': 'application/text'
    }
  });
  const loginResponseText = await loginResponse.text();
  console.log(loginResponseText);
  
}
const getTokenAndUserName = async ({phoneNumber,oneTimePassword,setUserLoggedIn,setToken,setUserName}) => {

  console.log(phoneNumber,oneTimePassword);
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber,
      oneTimePassword,
      setToken
    })

  });
  const responseCode = loginResponse.status;
  console.log(responseCode);
  if(responseCode == 200){
    setUserLoggedIn(true);
  }
  const tokenResponseString = await loginResponse.text();
  const userNameResponse = await fetch("https://dev.stedi.me/validate/"+token, {method: 'GET'});
  const userName = await userNameResponse.text();
  setToken(tokenResponseString);
  setUserName(userName);
}
const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style = {styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="555-555-5555"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => SendText(phoneNumber)}>
        <Text style= {styles.text}>Send Text</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
        maxLength={4}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => getTokenAndUserName({phoneNumber,oneTimePassword,setUserLoggedIn:props.setUserLoggedIn, setToken:props.setToken, setUserName:props.setUserName})}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 30,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  mainView: {
    marginTop: 200
  },
  button: {
    alignItems: "center",
    backgroundColor: "#009707",
    padding: 10,
    height: 40,
    alignSelf: "center"
  }
});

export default Login;