type Props = {
  size?: number;
  class?: string;
};

// A small editorial paw mark (circles + ellipse only, no dependencies).
// Used once, in the footer colophon.
export function PawMark(props: Props) {
  const { size = 20, class: className } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      class={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <ellipse cx="11" cy="14.5" rx="5.4" ry="4.4" />
      <circle cx="4.4" cy="9.2" r="1.95" />
      <circle cx="8.3" cy="5.3" r="2.05" />
      <circle cx="13.7" cy="5.3" r="2.05" />
      <circle cx="17.6" cy="9.2" r="1.95" />
    </svg>
  );
}
