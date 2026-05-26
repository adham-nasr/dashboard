function Tag ({ label="", style={}, className } : any) {
    return (
    <span className={className} style={{
        display: "inline-block",
        fontSize: 12, fontWeight: 500, letterSpacing: "0.02em",
        padding: "3px 10px", borderRadius: 99,
        border: `0.5px solid rgba(0,0,0,0.12)`,
        ...style,
    }}>{label}</span>
  )
}

export default Tag