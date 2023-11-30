'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import React from 'react';

const Correo = () => {
  const { data: session, status } = useSession();
  const correo = session?.user.data.Correo_Electronico;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
      Iniciaste sesion como: {session.user?.data.Correo_Electronico} <br />
        <code>{JSON.stringify(session, null, 2)}</code>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
    </>
  );
}

export default Correo;
