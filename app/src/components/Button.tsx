import { C } from "../utils/constants";

function Button({ children, onClick = () => {}, type="submit",variant = "primary", style = {}, className, ...rest }: any) {
  const isPrimary = variant === "primary";
  return (
    <button
      {...rest}
      className={className}
      onClick={onClick}
      type={type}
      style={{
        height: 38,
        padding: "0 20px",
        fontSize: 14,
        fontWeight: 500,
        borderRadius: 8,
        cursor: "pointer",
        fontFamily: "inherit",
        background: isPrimary ? C.accent : "transparent",
        color: isPrimary ? "var(--surface)" : C.text,
        border: isPrimary ? "none" : `0.5px solid ${C.borderMd}`,
        transition: "opacity 0.15s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default Button