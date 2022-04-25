import { Suspense, lazy, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./ErrorBoundary";
import {SurveyContext, survey, surveyReducer} from "./state/surveyState"

const Survey = lazy(() => import('./pages/Survey'));
const Statistics = lazy(() => import('./pages/Statistics'));
const NotFound  = lazy(() => import ('./pages/NotFound'));

function App() {
  const [surveyState, surveyDispatch] = useReducer(surveyReducer,  survey.state)
  return (
    <SurveyContext.Provider value={{ state : surveyState, dispatch: surveyDispatch}}>
    <Router>

      <ErrorBoundary 
      FallbackComponent={ErrorFallBack}
      onReset={() => surveyDispatch({type: "RESTART"})}
      >
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<Survey />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="*" element ={<NotFound />}/>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
    </SurveyContext.Provider>
  );
}

export default App;

