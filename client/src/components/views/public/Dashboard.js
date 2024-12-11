import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthContext"; // Correct path for AuthContext

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Get user data from context
  const [roleContent, setRoleContent] = useState(null);

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "Fan":
          setRoleContent(
            <div>Welcome, Fan! You can view teams and leagues.</div>
          );
          break;
        case "Player":
          setRoleContent(<div>Player Dash Board</div>);
          break;
        case "Team":
          setRoleContent(<div>Team Dash Board.</div>);
          break;
        case "League":
          setRoleContent(<div>League Dash Board</div>);
          break;
        case "Sponsor":
          setRoleContent(<div>Sponsor Dash Board</div>);
          break;
        default:
          setRoleContent(<div>Role not recognized</div>);
      }
    }
  }, [user]);

  return <div>{roleContent}</div>;
};

export default Dashboard;
