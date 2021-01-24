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
    async function loadStoragedData(): Promise<void> {
      // Verificar se ta logado
      //        api.defaults.headers.authorization = `Bearer ${token[1]}`;
      //        setData({ token: token[1], user: JSON.parse(user[1]) });

      setLoading(false);
    }

    loadStoragedData();
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
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('User signed in!'))
      .catch(error => {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        )
          throw new Error('Email/Senha iválidos.');
        else throw new Error(error.code);
      });
  }, []);
  const signOut = useCallback(() => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
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
