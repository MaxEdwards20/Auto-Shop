import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Error {
  statusText: string;
  message: string;
}
export default function ErrorPage() {
  let error: Error = {
    statusText: "403 Error",
    message: "Please refresh while we try again",
  };
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1000); // redirect user to home page after 1 second on wrong page
  });

  return (
    <div id="error-page">
      <h1>Oops! This page was not found</h1>
      <p>
        Sorry, this page no longer exists. Sending you back to home page ...
      </p>
    </div>
  );
}
