import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import auth from '@react-native-firebase/auth';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthData {
  user: User;
  token: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>({} as AuthData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setData({
          user: {
            id: user.uid,
            name: user.displayName ? user.displayName : '',
            email: user.email ? user.email : '',
          },
          token: '',
        });
      } else {
        setData({} as AuthData);
      }

      setLoading(false);
    });
  }, []);

  const signUp = useCallback(async ({ email, password }) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log('User signed up!'))
      .catch(error => {
        if (error.code === 'auth/email-already-in-use')
          throw new Error('Email já cadastrado.');
        else if (error.code === 'auth/invalid-email')
          throw new Error('Email inválido.');
        else if (error.code === 'auth/weak-password')
          throw new Error('Senha fraca.');
        else throw new Error(error.code);
      });
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true);
    await auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        setLoading(false);
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        )
          throw new Error('Email/Senha iválidos.');
        else throw new Error(error.code);
      });
  }, []);

  const signOut = useCallback(() => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
