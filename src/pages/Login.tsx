import './Login.scss';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useRef } from "react";

const Login: React.FC = () => {
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passwordRef = useRef<HTMLIonInputElement>(null);

    const submitCredentialsHandler = () => {

    }
    return (
        <IonPage className="login">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref="/questions" color="light" />
                    </IonButtons>
                    <IonTitle>
                        Login
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="login__content">
                    <div className="login__modal">
                        <IonItem>
                            <IonLabel position="floating" color="primary">Email</IonLabel>
                            <IonInput
                                type='text'
                                ref={emailRef} />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating" color="primary">Password</IonLabel>
                            <IonInput
                                type='password'
                                ref={passwordRef} />
                        </IonItem>
                        <div className="login__button-container">
                            <IonButton className="login__button" onClick={submitCredentialsHandler}>
                                Submit
                            </IonButton>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Login;