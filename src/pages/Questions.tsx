import './Questions.scss';
import { IonAlert, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { RouteComponentProps, useHistory, withRouter } from 'react-router';
import { logInOutline } from 'ionicons/icons';

interface Questions {
    num: number;
    question: string;
}

interface Answers {
    num: number;
    answer: string;
}

let answersPosted = false;

const Questions: React.FC = () => {
    const [curNum, setCurNum] = useState<number>(0);
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [answers, setAnswers] = useState<Answers[]>([]);
    const [toast, setToast] = useState<string>('');
    const [userId, setUserId] = useState<string>(localStorage.getItem('userId') || '');
    const [readyToSend, setReadyToSend] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);

    const answerRef = useRef<HTMLIonInputElement>(null);

    const history = useHistory();

    const submitAnswerHandler = () => {
        const answer: string = answerRef.current!.value!.toString();
        if (!answer) {
            setToast('Please enter a response.')
        }

        console.log('submitAnswerHandler', curNum, answer, answers);

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
        } else {
            setReadyToSend(true);
        }
    }

    // When the number of answers equals the number of questions, post the answers to the server
    useEffect(() => {
        if (!questions.length || answers.length < questions.length) return;

        if (answersPosted) return;
        answersPosted = true;

        const dbAnswers = answers.map((answer, index) => {
            const dbAnswer = {
                id: userId,
                questionNumber: index + 1,
                answer: answer.answer
            }
            return dbAnswer;
        });

        const request = {
            url: `https://predictiveanswers.com:8080/answers`,
            method: 'post',
            data: dbAnswers
        }

        axios(request)
            .then(result => {
                setFinished(true);
            })
            .catch(error => {
                console.log('error posting answers', request, error);
            })

    })

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

        if (!userId) {
            const uniqueId = uuid();
            setUserId(uniqueId);
            localStorage.setItem('userId', uniqueId);
        }
    }, []);

    if (finished) {
        return (
            <>
                <IonAlert
                    isOpen={finished}
                    onDidDismiss={() => history.push('/results')}
                    header={'All Done'}
                    message={'Thank you for completing this questionaire.'}
                    buttons={['OK']} />
            </>
        )
    }

    return (
        <IonPage className="questions">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Questions
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton routerLink="/login" color="light" routerDirection='none'>
                            <IonIcon slot="icon-only" icon={logInOutline} />
                        </IonButton>
                    </IonButtons>
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

export default withRouter(Questions);