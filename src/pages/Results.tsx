import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Results: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Results
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Results</h2>
      </IonContent>
    </IonPage>
  )
}

export default Results;