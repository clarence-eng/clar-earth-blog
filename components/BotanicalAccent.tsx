export default function BotanicalAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main stem */}
      <path
        d="M60 155 C60 140 58 120 55 100 C52 80 50 60 53 40 C56 20 60 10 60 5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* Left branch 1 */}
      <path
        d="M57 95 C50 88 38 82 28 80"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      {/* Left leaf */}
      <path
        d="M28 80 C22 74 20 65 26 60 C32 55 38 60 38 68 C38 75 34 79 28 80Z"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
        opacity="0.4"
      />
      {/* Right branch 1 */}
      <path
        d="M56 75 C63 68 74 63 84 62"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      {/* Right leaf */}
      <path
        d="M84 62 C90 56 92 47 86 42 C80 37 74 42 74 50 C74 57 78 61 84 62Z"
        stroke="currentColor"
        strokeWidth="0.7"
        fill="none"
        opacity="0.4"
      />
      {/* Upper left branch */}
      <path
        d="M57 48 C50 42 40 38 32 38"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
        opacity="0.38"
      />
      {/* Small left leaf */}
      <path
        d="M32 38 C26 33 24 25 30 21 C36 17 42 22 41 30 C40 36 37 38 32 38Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        opacity="0.35"
      />
      {/* Upper right branch */}
      <path
        d="M59 30 C66 24 75 21 83 22"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
        opacity="0.38"
      />
      {/* Small right leaf */}
      <path
        d="M83 22 C89 17 90 9 84 6 C78 3 73 9 74 17 C75 23 78 22 83 22Z"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
        opacity="0.35"
      />
      {/* Small seed dots */}
      <circle cx="60" cy="5" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="28" cy="80" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="84" cy="62" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}
