import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { logInOutline } from 'ionicons/icons';
const Results: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Results
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/login" color="light" routerDirection='none'>
              <IonIcon slot="icon-only" icon={logInOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Results</h2>
      </IonContent>
    </IonPage>
  )
}

export default Results;