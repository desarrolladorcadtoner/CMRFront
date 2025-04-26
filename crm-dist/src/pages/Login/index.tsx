import Image from "next/image";

export default function Login() {
  return (
    <div className="container min-w-screen min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0b4468] to-[#0072b1]">
      <div className="boxLogin w-[900px] h-[600px] shadow-xl rounded-xl bg-white">
        <div className="imageCadToner rounded-tl-lg rounded-bl-lg w-[500] h-[600] 
        flex justify-center items-center bg-gradient-to-br from-[#0b4468] to-[#0072b1]">
          <Image
            src="/images/logo-cadtoner.png"
            alt="Logo"
            width={250}
            height={250}
            className="rounded-tl-lg rounded-bl-lg"
          />
        </div>
        <div className="formLogin"></div>
      </div>
    </div>
  );
}
