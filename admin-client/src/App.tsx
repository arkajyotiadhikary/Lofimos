import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { validateToken } from "./services/authServices";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function App() {
      const navigate = useNavigate();
      const [validated, setValidated] = useState<boolean | null>(null);
      useEffect(() => {
            const token = Cookies.get("token");
            if (validated === null && token) {
                  (async () => {
                        const valid = await validateToken(token);
                        setValidated(valid);
                  })();
            } else if (validated === null && !token) {
                  navigate("/auth");
            }
      }, [validated]);
      return validated === null ? null : validated ? <Outlet /> : <Navigate to="/auth" />;
}

export default App;
