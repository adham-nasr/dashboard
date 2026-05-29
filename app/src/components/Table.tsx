import Card from "./Card";
import TableHeader from "./TableHeader";
import "./Table.css"

type args={
    columns:string[]
    children?:any
}

function Table({columns,children}:args){

    return(
        <Card style={{  padding: 0, overflow: "hidden" }}>
            <table>
                <TableHeader columns={columns}/>
                {children}
            </table>
        </Card>
    )
}
export default Table;