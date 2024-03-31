import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
      let auth = { token: true };
      return auth.token ? <Outlet /> : <Navigate to="/auth" />;
}

export default App;
