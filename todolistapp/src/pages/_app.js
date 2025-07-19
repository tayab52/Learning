import "@/styles/globals.css";

// Internal import 

import { ToDolistProvider } from '../../context/ToDoListApp';

const App = ({ Component, pageProps }) => (
  <ToDolistProvider>
    <div>
<Component {...pageProps} />;
    </div>
   
  </ToDolistProvider>
);

export default App;