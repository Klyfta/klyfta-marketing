export type ProductIconKey =
  | "mail"
  | "calendar"
  | "contacts"
  | "files"
  | "wikis"
  | "messaging"
  | "api"
  | "signIn";

type IconProps = React.ComponentPropsWithoutRef<"svg">;

function strokeProps(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

function MailIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function CalendarIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ContactsIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20a7 7 0 0114 0" />
    </svg>
  );
}

function DocumentIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5M9 14h6M9 17h4" />
    </svg>
  );
}

function WikiIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <rect x="2" y="2" width="11" height="14" rx="1.5" />
      <rect x="6" y="5" width="11" height="14" rx="1.5" />
      <rect x="10" y="8" width="11" height="14" rx="1.5" />
    </svg>
  );
}

function MessagingIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <path d="M21 11.5a8.38 8.38 0 0 1-9.08 8.4 8.5 8.5 0 0 1-3.42-.7L3 21l1.9-5.5a8.38 8.38 0 0 1-.9-3.93C4 7.4 7.4 4 11.5 4s8.5 3.4 8.5 7.5z" />
    </svg>
  );
}

function ApiIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <path d="M8 6L3 12l5 6M16 6l5 6-5 6M14 4l-4 16" />
    </svg>
  );
}

function SignInIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
    </svg>
  );
}

export const productIcons: Record<
  ProductIconKey,
  (props: IconProps) => React.JSX.Element
> = {
  mail: MailIcon,
  calendar: CalendarIcon,
  contacts: ContactsIcon,
  files: DocumentIcon,
  wikis: WikiIcon,
  messaging: MessagingIcon,
  api: ApiIcon,
  signIn: SignInIcon,
};

export function ChevronDown(props: IconProps) {
  return (
    <svg {...strokeProps({ ...props, strokeWidth: 2 })}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
