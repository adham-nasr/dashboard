import { LEVELS, type Logs, type LogsStats } from "./types";

export const getLogsStats = (logs:Logs)=>{  

    let counts:Record<string,number> = {}

    logs.forEach((logs)=>{
        counts[logs.level] = counts[logs.level] ? counts[logs.level]+1 : 1;
    })
    console.log("counts >>><>?<><><>?<>?<")
    console.log(counts)

    const logsStats:LogsStats = {
        logs:logs,
        "errorCount" : counts[LEVELS.ERROR] || 0,
        "infoCount" : counts[LEVELS.INFO] || 0,
        "warnCount" : counts[LEVELS.WARN] || 0
    }

    return logsStats

}