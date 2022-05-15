import './Login.scss';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import React, { useRef, useState } from "react";
import { useHistory, withRouter } from 'react-router';
import axios from 'axios';

const Login: React.FC = () => {
    const userRef = useRef<HTMLIonInputElement>(null);
    const passwordRef = useRef<HTMLIonInputElement>(null);
    const [toast, setToast] = useState<string>('');

    const history = useHistory();

    const submitCredentialsHandler = () => {
        const user = userRef.current!.value!.toString();
        const password = passwordRef.current!.value!.toString();

        if (!user) {
            setToast("Please enter an email address.");
            return;
        }

        if (!password) {
            setToast("Please enter a password");
        }

        const request = {
            url: `https://predictiveanswers.com:8080/login`,
            method: 'post',
            data: {
                user,
                password
            }
        }

        axios(request)
        .then (response => {
            if (!response.data.token) {
                setToast("Invalid login");
                return;
            }

            const token = response.data.token;

            if (!token.length) {
                setToast("Invalid login credentials.");
                return;
            }

            sessionStorage.setItem('token', token);
            history.push('/results');
        })
        .catch(error => {
            setToast("Invalid login credentials.")
        });
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
                            <IonLabel position="floating" color="primary">User Name</IonLabel>
                            <IonInput
                                type='text'
                                ref={userRef} />
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
            <IonToast
                color="secondary"
                message={toast}
                isOpen={!!toast}
                duration={2000}
                onDidDismiss={() => setToast('')} />
        </IonPage>
    )
}

export default withRouter(Login);