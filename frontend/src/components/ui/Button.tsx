interface ButtonProps {
  text: string;
  type?: "button" | "submit";
}

function Button({
  text,
  type = "button"
}: ButtonProps) {
  return (
    <button
      type={type}
      className="custom-btn"
    >
      {text}
    </button>
  );
}

export default Button;