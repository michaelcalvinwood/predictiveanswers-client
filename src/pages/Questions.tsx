import './Questions.scss';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';


interface Questions {
    num: number;
    question: string;
}

interface Answers {
    num: number;
    answer: string;
}

const Questions: React.FC = () => {
    const [curNum, setCurNum] = useState<number>(0);
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [answers, setAnswers] = useState<Answers[]>([]);
    const [toast, setToast] = useState<string>('');

    const answerRef = useRef<HTMLIonInputElement>(null);

    const submitAnswerHandler = () => {
        const answer: string = answerRef.current!.value!.toString();
        if (!answer) {
            setToast('Please enter a response.')
        }

        setAnswers((curAnswers: Answers[]) => {
            curAnswers[curNum] = {
                num: curNum + 1,
                answer: answer
            }
            return curAnswers;
        })

        answerRef.current!.value = '';

        if ((curNum + 1) < questions.length) {
            setCurNum(currentVal => currentVal + 1);
        }

    }

    useEffect(() => {
        const request = {
            url: `https://predictiveanswers.com:8080/questions`,
            method: 'get',
        }

        axios(request)
            .then(res => {
                console.log(res.data);
                setQuestions(res.data);
            })
            .catch(err => {
                console.log('Questions axios get questions', err);
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
            <IonContent className="questions__cards">
                <IonCard className='questions__card'>
                    <IonCardHeader className="ion-text-center">
                        <IonCardTitle>
                            Question {curNum + 1}
                        </IonCardTitle>
                        <IonCardSubtitle>

                        </IonCardSubtitle>
                    </IonCardHeader>
                    {questions && curNum < questions.length && <IonCardContent>
                        <p className="questions__current-question">{questions[curNum].question}</p>
                        <IonItem>
                            <IonLabel position="floating" color="primary">Answer</IonLabel>
                            <IonInput
                                type='text'
                                ref={answerRef} />
                        </IonItem>
                        <div className="questions__button-container">
                            <IonButton className="questions__button" onClick={submitAnswerHandler}>
                                Submit
                            </IonButton>
                        </div>
                    </IonCardContent>}
                </IonCard>
            </IonContent>
            <IonToast
                color="secondary"
                message={toast}
                isOpen={!!toast}
                duration={2000}
                onDidDismiss={() => setToast('')} />
        </IonPage >
    )
}

export default Questions;