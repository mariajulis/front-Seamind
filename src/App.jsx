//componenet reponsavel por emitir notificaçãoes utilizando a biblioteca react-hot-tost
import { AuthProvider } from "./context/AuthContext";
//importaçção do arquivo athprovider responsavel pela atenticação de usuarios de rotas privadas

//importação do appRoutes de gerenciamento de rotas
import { AppRoutes } from "./routes/AppRoutes";


//construção  codigo principal 
function App() {
  return (
    <AuthProvider>
    <AppRoutes />
    </AuthProvider>
  )
}
export default App;