import { GoogleLogin } from "@react-oauth/google";
import { setLogin } from "../api-connection.js";

async function acceptGoogleLogin({credential}, create) {
  let success = await setLogin('google', credential, create);
  if (success) {
    console.log(create ? 'created account' : 'logged in');
  } else {
    console.log(`failed to ${create ? 'create account' : 'log in'}$`);
  }
}

export default function LoginPage({ create }) {
  return (
    <GoogleLogin
      onSuccess={arg=>acceptGoogleLogin(arg, create)}
      onError={() => console.log("Google login error")}
    />
  );
}
