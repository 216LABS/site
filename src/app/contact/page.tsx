import { permanentRedirect } from "next/navigation";

// The old /contact page now lives in the homepage's booking section.
export default function ContactPage() {
  permanentRedirect("/#book");
}
