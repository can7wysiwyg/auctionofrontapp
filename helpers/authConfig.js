import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";

let GOOGLE_CLIENT_ID = "954706504386-hil2vs7fn00ohhmus0c04vqkoeepeqgb.apps.googleusercontent.com"


export async function signInWithGoogle() {
  try {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}
      &redirect_uri=${encodeURIComponent(redirectUri)}
      &response_type=token
      &scope=profile email`;

    const response = await AuthSession.startAsync({ authUrl });

    if (response.type === "success") {
      await SecureStore.setItemAsync("googleToken", response.params.access_token);
      return response.params;
    }
  } catch (error) {
    console.error("Google Sign-In Error", error);
  }
}
