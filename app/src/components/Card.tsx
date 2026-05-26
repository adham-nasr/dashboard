
import { C } from "../utils/constants"

function Card ({ children, style, className } : any) {
    return (
        <div className={className} style={{
            background: C.surface, borderRadius: 12,
            border: `0.5px solid ${C.border}`,
            padding: "20px 24px", ...style,
            }}>{children}
        </div>
    )
}
  
export default Card