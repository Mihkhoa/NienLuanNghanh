import React from "react";
import './landingpage.css';
import Banner from '../../components/Banner';
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

function LandingPage() {
  const isAdmin = useSelector((state) => state.user.current.role) === "ADMIN";
  if(isAdmin) {
    return <Redirect to="/manage" />
  }
  return (
    <div>
      <Banner />
    </div>
  );
}

export default LandingPage;