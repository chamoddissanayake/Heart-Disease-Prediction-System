import React from 'react';
import HeartForm from "./HeartDiseasePrediction";
import { SnackbarProvider, useSnackbar } from 'notistack';

function App() {
  return (
   <div>
       <SnackbarProvider maxSnack={3}>
           <HeartForm/>
       </SnackbarProvider>
   </div>
  );
}

export default App;
