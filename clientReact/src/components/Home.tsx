import { useContext, useEffect } from "react";
import { AuthContext } from "../reducer/userReducer";
import { useNavigate } from "react-router-dom";

const Home = () => {
 
  return (
    <>
      <h1 style={{ fontSize: "200px", alignItems: "center" }}>HOME</h1>
    </>
  );
};

export { Home };
