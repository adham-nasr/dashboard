import { C } from "../utils/constants"

function Input ({ placeholder="default", type = "text", value="", onChange=()=>{}, style={} })  {

    return (
        <input
            type={type} placeholder={placeholder} value={value} onChange={onChange}
            style={{
            width: "100%", boxSizing: "border-box",
            height: 40, padding: "0 14px",
            fontSize: 14, color: C.text,
            background: C.bg, border: `0.5px solid ${C.borderMd}`,
            borderRadius: 8, outline: "none",
            fontFamily: "inherit", ...style,
            }}
        />
    )
}

export default Input