export const useAppAuth = () => {
  const uid = ref(null);
  const showAuthPopup = ref(null);
  const authTargetQuery = ref(null);

  const callbackUrl = "/";

  const { signIn } = useAuth();

  const login = async (provider: string, options?: any) => {
    const { error, url } = await signIn(provider, {
      ...options,
      redirect: false,
      callbackUrl,
    });
    if (error) {
      return signInErrors[error] ? signInErrors[error] : error;
    } else {
      navigateTo(url, { external: true });
      return null;
    }
  };

  const signInErrors: { [key: string]: string } = {
    default: "Unable to sign in.",
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallbackError: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "The e-mail could not be sent.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
  };

  return { login, signInErrors, uid, showAuthPopup, authTargetQuery };
};
