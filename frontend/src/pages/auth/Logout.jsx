import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const run = async () => {
      await logout();
      navigate("/", { replace: true });
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;


