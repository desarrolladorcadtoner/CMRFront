import "../styles/globals.css"; // Ajusta la ruta si es necesario
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

