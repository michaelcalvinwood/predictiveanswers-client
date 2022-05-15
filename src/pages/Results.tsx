import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { logInOutline } from 'ionicons/icons';
import axios from 'axios';

interface AdminData {
  id: string;
  question_number: Number;
  answer: string;
}

const Results: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminData[]>([]);
  const [lastRequestTs, setLastRequestTs] = useState<Number>(0);

  useEffect(() => {
    if (!sessionStorage.getItem('token')) return;

    // to avoid infinite loop, only allow data retrieval once per minute

    const curTime = Date.now();
    const diff = curTime - Number(lastRequestTs);
    
    console.log ('time diff', diff);

    if ( diff < 60000) return;

    setLastRequestTs(curTime);

    const request = {
      url: `https://predictiveanswers.com:8080/results`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }

    axios(request)
      .then(res => {
        setIsAdmin(true);
        setAdminData(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {isAdmin ? 'Admin Results' : 'Results'}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/login" color="light" routerDirection='none'>
              <IonIcon slot="icon-only" icon={logInOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol className="ion-align-self-center">Id</IonCol>
          <IonCol className="ion-align-self-center">Number</IonCol>
          <IonCol className="ion-align-self-center">Answer</IonCol>
        </IonRow>
        {!!adminData && 
          <IonGrid>
            {adminData.map(result => {
              return (
                <IonRow key={result.id + result.question_number}>
                  <IonCol>{result.id}</IonCol>
                  <IonCol>{result.question_number}</IonCol>
                  <IonCol>{result.answer}</IonCol>
                </IonRow>
              )
            })}
          </IonGrid>
        }
      </IonContent>
    </IonPage>
  )
}

export default Results;