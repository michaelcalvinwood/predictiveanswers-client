import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import axios from 'axios';

interface Questions {
    num: number;
    question: string;
}

const Questions: React.FC = () => {
    const [curNum, setCurNum] = useState<number>(0);
    const [questions, setQuestions] = useState<Questions[]>([]);

    useEffect(() => {
        
        const request = {
            url: `https://predictiveanswers.com:8080/questions`,
            method: 'get',
          }
      
          axios(request)
          .then(res => {
            console.log (res.data);
            setQuestions(res.data);
          })
          .catch(err => {
            console.log ('Questions axios get questions', err);
          })
    }, []);

    return (
        <IonPage className="questions">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Questions
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className='questions__card'>
                    <IonCardHeader className="ion-text-center">
                        <IonCardTitle>
                            Question {curNum+1}
                        </IonCardTitle>
                        <IonCardSubtitle>
                    
                        </IonCardSubtitle>
                    </IonCardHeader>
                    {questions && curNum < questions.length && <IonCardContent>
                      <p className="questions__current-question">{questions[curNum].question}</p>
                    </IonCardContent>}
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Questions;