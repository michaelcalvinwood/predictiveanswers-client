import { IonApp, IonRouterOutlet, setupIonicReact, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from "react-router-dom";

/* Import the App Pages */
import Questions from './pages/Questions';
import Results from './pages/Results';

/* Import navigation icons */
import { helpOutline, newspaperOutline, logInOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/theme.css';

setupIonicReact();

const App: React.FC = () => {
  console.log('running App.tsx');

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/results">
              <Results />
            </Route>
            <Redirect to="/questions" />
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            {/* Note: The tab prop in IonTabButton is just an identifier. Choose anything you like. */}
            <IonTabButton href="/questions" tab="questions">
              <IonIcon icon={helpOutline} />
              <IonLabel>Questions</IonLabel>
            </IonTabButton>
            <IonTabButton href="/results" tab="results">
              <IonIcon icon={newspaperOutline} />
              <IonLabel>Results</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
