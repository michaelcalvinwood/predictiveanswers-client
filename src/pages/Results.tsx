import './results.scss';
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

  const generateCards = (answers: AdminData[]) => {
    answers.sort((a: AdminData, b:AdminData) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      if (a.question_number < b.question_number) return -1;
      if (a.question_number > b.question_number) return 1;
      return 0; 
    })

    let curId = '';
    let output = '';

    for (let i = 0; i < answers.length; ++i) {
      if (answers[i].id !== curId) {
        if (curId) {
          output += '</IonCardContent></IonCard>' + "\n";
        }
        output += `<IonCard><IonCardHeader><IonCardTitle>${answers[i].id}</IonCardTItle></IonCardHeader></IonCardHeader>` + "\n";
        output += '<IonCardContent>';
        curId = answers[i].id;
      }
      output += `<p>${answers[i].question_number}: ${answers[i].answer}</p>`;
    }
    output += '</IonCardContent></IonCard>';

    console.log (output);
    return output;
  }

  if (adminData.length) generateCards(adminData);

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
        {/* <IonRow>
          <IonCol className="ion-align-self-center">Id</IonCol>
          <IonCol className="ion-align-self-center">Number</IonCol>
          <IonCol className="ion-align-self-center">Answer</IonCol>
        </IonRow> */}
        {!!adminData.length && 
          <IonGrid>
            {adminData.map((result, index) => {
              return (
                <div key={result.id + result.question_number}>
                  {index === 0 && <h3 className="results__title">{result.id}</h3>}
                  {index > 0 && result.id !== adminData[index-1].id && <h3 className="results__title">{result.id}</h3>}
                  <IonRow >
                    <IonCol size="1">{result.question_number}</IonCol>
                    <IonCol>{result.answer}</IonCol>
                  </IonRow>
                </div>
              )
            })}
          </IonGrid>
        }
      </IonContent>
    </IonPage>
  )
}

export default Results;