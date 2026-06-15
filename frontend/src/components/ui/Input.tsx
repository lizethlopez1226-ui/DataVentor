interface InputProps {
  type: string;
  placeholder: string;
}

function Input({
  type,
  placeholder
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="custom-input"
    />
  );
}

export default Input;