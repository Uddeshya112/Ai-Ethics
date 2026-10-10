import type { Metadata } from "next";
import PresentationClient from "./PresentationClient";
export const metadata:Metadata={title:"Presentation",description:"Interactive presentation preview with presenter notes, timer, and navigation controls."};
export default function PresentationPage(){return <PresentationClient/>;}
