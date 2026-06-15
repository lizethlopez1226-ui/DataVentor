import { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

function Card({
  title,
  children
}: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>

      <div>
        {children}
      </div>
    </div>
  );
}

export default Card;