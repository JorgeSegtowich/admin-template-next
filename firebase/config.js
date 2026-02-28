import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const requiredConfigKeys = ["apiKey", "authDomain", "projectId"];

const missingConfigKeys = requiredConfigKeys.filter(
    (key) => !firebaseConfig[key]
);

export const firebaseConfigError = missingConfigKeys.length
    ? `Configuração do Firebase ausente: ${missingConfigKeys.join(", ")}. Verifique as variáveis NEXT_PUBLIC_FIREBASE_* no .env.local.`
    : null;

if (!firebase.apps.length) {
    if (firebaseConfigError) {
        console.error(firebaseConfigError);
    } else {
        firebase.initializeApp(firebaseConfig);
    }
}

export default firebase;