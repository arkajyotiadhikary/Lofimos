import { useState } from "react";

const Auth = () => {
      const [login, setLogin] = useState<boolean>(false);
      return <div className="Auth">{login ? "Login" : "Register"}</div>;
};

export default Auth;
