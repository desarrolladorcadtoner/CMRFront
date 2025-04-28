import React, { useState } from "react";
import Image from "next/image";
import { Button } from "primereact/button";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { FloatLabel } from "primereact/floatlabel";

export default function Login() {
  const [value, setValue] = useState<string[]>([]);
  const [password, setPassword] = useState<string>("");

  return (
    <>
      {/* Div background con posición absoluta */}


      <div className="container min-w-screen min-h-screen flexjustify-center items-center bg-gradient-to-br from-[#0b4468] to-[#0072b1] 
        flex flex-col justify-center items-center">
        <Image
          src="/images/Background_cadToner.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full opacity-20 z-0"
        />

        {/* Div boxLogin */}
        <div className="boxLogin relative w-[900px] h-[600px] shadow-xl rounded-xl bg-white flex flex-row justify-center items-center z-10">
          <div className="imageCadToner rounded-tl-lg rounded-bl-lg w-[500px] h-full flex justify-center items-center bg-gradient-to-br from-[#0b4468] to-[#0072b1]">
            <Image
              src="/images/logo-cadtoner.png"
              alt="Logo"
              width={250}
              height={250}
              className="rounded-tl-lg rounded-bl-lg"
            />
          </div>

          <div className="formLogin w-[400px] h-full flex flex-col justify-center items-center">
            <h1 className="mb-8 text-3xl">USER LOGIN</h1>
            <FloatLabel className="mb-4">
              <Chips
                id="username"
                value={value}
                onChange={(e: ChipsChangeEvent) => setValue(e.value || [])}         
                />
              <label htmlFor="username" >Username</label>
            </FloatLabel>
            <FloatLabel className="mb-4 mt-6">
              <input
                id="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-inputtext p-component w-full"
              />
              <label htmlFor="username">Password</label>
            </FloatLabel>
            <a href="/home" className="ml-24 mb-6 text-xs text-cyan-400 underline">Olvidaste tu contraseña?</a>
            <Button label="Submit" />
          </div>
        </div>
      </div>


    </>

  );
}
