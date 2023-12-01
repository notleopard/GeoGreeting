import React, { useState } from "react";
import AppNavigator from "./navigation/AppNavigator";
import { AuthContext } from "./authcontext/AuthContext";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </AuthContext.Provider>
  );
}
