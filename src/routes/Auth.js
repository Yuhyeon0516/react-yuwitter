import React from "react";
import { authService } from "../fbase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocialLogin = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialLogin} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialLogin} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
