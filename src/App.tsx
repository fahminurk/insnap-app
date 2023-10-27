import AuthLayout from "./_auth/authLayout";
import { SigninForm, SignupForm } from "./_auth/forms";
import { Home } from "./_root/pages";
import RootLayout from "./_root/rootLayout";
import "./globals.css";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <main>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
