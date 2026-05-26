type args={
    columns:string[]
}

function TableHeader({columns}:args){
    return(
        <thead>
            <tr style={{ borderBottom: "0.5px solid var(--border)" }}>
            {columns.map((h, i) => (
                <th key={i} style={{
                textAlign: i === 5 ? "right" : "left",
                padding: "14px 20px",
                fontSize: 12, fontWeight: 500, color: "var(--muted)",
                letterSpacing: "0.04em", textTransform: "uppercase",
                }}>{h}</th>
            ))}
            </tr>
        </thead>
    )

}

export default TableHeader