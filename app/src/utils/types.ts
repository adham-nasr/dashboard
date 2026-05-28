

export type User = {
    _id:string,
    username:string,
    email:string,
    password:string,
    apiKey:string
}

export type UserCreate = Pick<User, "username"|"email"|"password">

export type UserLogin = Omit<UserCreate,"username">


export enum LEVELS {
    INFO = "info",
    ERROR = "error",
    WARN = "warn"
}


export type Log = {
    _id:string,
    applicationId:string,
    message:string,
    level:LEVELS,
    count?:string,
    createdAt:Date,
    UpdatedAt:Date,
}

export type Logs = Log[];

export type recivedLogs = {
    logs:Logs,
    stats:LogsStats
}

export type LogsStats = {
    totalCount:number,
    errorCount:number,
    infoCount:number,
    warnCount:number
}

export type Application = {
    _id:string,
    name:string,
    user_id:string,
    createdAt:Date,
    UpdatedAt:Date,
    logCount:number
}



export type ApplicationCreate = Pick<Application,"name">

export type Applications = Application[]

export type AuthState = User | null;

export type Dispatch = React.Dispatch<Record<string, any>>
export type AuthContextType = {
  user: AuthState;
  dispatch: Dispatch;
};


