import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native";

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
const getToken = async({phoneNumber,oneTimePassword,setUserLoggedIn}) => {

  console.log(phoneNumber,oneTimePassword);
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber,
      oneTimePassword:oneTimePassword
    })

  });
  const responseCode = loginResponse.status;
  console.log(responseCode);
  if(responseCode == 200){
    setUserLoggedIn(true);
  }
  const tokenResponseString = await loginResponse.text();
}
const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOTP] = useState(null);

  return (
    <SafeAreaView style = {styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="555-555-5555"
      />
      <Button
        title="Heck yeah that's my phone number!"
        onPress={() => SendText(phoneNumber)}
      />
      <TextInput
        style={styles.input}
        onChangeText={setOTP}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
        maxLength={4}
      />
      <Button
        title="Login"
        onPress={() => getToken({phoneNumber,oneTimePassword,setUserLoggedIn:props.setUserLoggedIn})}
      />
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
});

export default Login;