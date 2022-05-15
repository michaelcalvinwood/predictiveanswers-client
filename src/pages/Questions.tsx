import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Questions: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Questions
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Questions</h2>
      </IonContent>
    </IonPage>
  )
}

export default Questions;