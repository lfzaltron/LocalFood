import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface AuthData {
  user: User;
  token: string;
}

interface SignUpCredentials {
  name: string;
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
  updateUserData(data: User): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>({} as AuthData);
  const [loading, setLoading] = useState(true);

  const getUserData = useCallback(() => {
    const user = auth().currentUser;
    if (user === null) return;

    firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(doc => {
        const userData = doc.data();
        setData({
          user: {
            id: user.uid,
            email: user.email || '',
            name: userData?.name,
            phoneNumber: userData?.phoneNumber,
            address: userData?.address,
            latitude: userData?.latitude,
            longitude: userData?.longitude,
          },
          token: '',
        });
      });
  }, []);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        getUserData();
      } else {
        setData({} as AuthData);
      }

      setLoading(false);
    });
  }, [getUserData]);

  const signUp = useCallback(async ({ email, password, name }) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        const id = result.user.uid;
        firestore().collection('Users').doc(id).set({ name });
      })
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

  const updateUserData = useCallback(
    (updated: User) => {
      const { email, id, ...updatable } = updated;

      if (data.user.id !== id)
        throw new Error('User to be updated is not loged in');

      return firestore()
        .collection('Users')
        .doc(data.user.id)
        .set(updatable)
        .then(() => getUserData());
    },
    [data, getUserData],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signUp,
        signIn,
        signOut,
        updateUserData,
      }}
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
