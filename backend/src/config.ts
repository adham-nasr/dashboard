import process from 'node:process'

process.loadEnvFile()

export const config ={
    baseUrl:process.env.BASE_URL!,
    port:process.env.PORT || 3003,
    dbUrl:process.env.DB_URL!,
    dbName:process.env.DB_NAME!,
    jwtSecret:process.env.JWT_SECRET!,
    saltRounds:process.env.SALT_ROUNDS!
}