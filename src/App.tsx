import AuthLayout from "./_auth/authLayout";
import { SigninForm, SignupForm } from "./_auth/forms";
import {
  AllUsers,
  CreatePost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdatePost,
  UpdateProfile,
} from "./_root/pages";
import RootLayout from "./_root/rootLayout";
import { Toaster } from "./components/ui/toaster";
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
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
}

export default App;
