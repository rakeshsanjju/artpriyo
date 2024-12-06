import { apiConnector } from "../apiconnector";
import { endpoints } from "../api"
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints

export function login(email,password,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password,
            })
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
              Toast.show({
                type: "success",
                position: "bottom",
                text1: "Login Success",
                visibilityTime: 3000,
              });
              dispatch(setUser({...response.data.user}));
              AsyncStorage.setItem("token",JSON.stringify(response.data.token));
              navigate("/Screens/home-screen")
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "Login Failed",
                visibilityTime: 3000,
              });
              dispatch(setLoading(false))
        }
    }
}