import Decode from "./Decode";

type Props = {
  id: string;
  label: string;
  noise: string;
  signal: string;
  children?: React.ReactNode;
  as?: "h2" | "p"; // FAQ uses a visual heading so each question can be the H2
};

/** Rail label + the site's signature heading: the jargon struck out, then the plain version. */
export function RailLabel({ label }: { label: string }) {
  return (
    <p className="rail-label mono">
      <Decode text={label} />
    </p>
  );
}

export default function SectionHead({ id, noise, signal, children, as = "h2" }: Omit<Props, "label">) {
  const Tag = as;
  return (
    <div className="section-head reveal">
      <p className="noise-line">
        <span className="sr-only">Instead of: </span>
        <s>{noise}</s>
      </p>
      <Tag id={id} className="display h2">
        {signal}
      </Tag>
      {children}
    </div>
  );
}
