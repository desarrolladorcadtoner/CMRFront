import "../styles/globals.css"; // Ajusta la ruta si es necesario
import '@/styles/tabPanel.css'
import { PrimeReactProvider, PrimeReactContext, AppendToType } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css'; // Estilos base de PrimeReact
import 'primeicons/primeicons.css';
import type { AppProps } from "next/app";

export default function MyApp({ Component }: AppProps) {
    const value = {
        appendTo: 'self' as AppendToType,
        // Add valid properties here or remove the spread operator
    };

    return (
        <PrimeReactProvider value={value}>
            <Component />
        </PrimeReactProvider>
    );
}