export default {
  development: {
    username: "root",
    password: "password",
    database: "more_recipes",
    host: "127.0.0.1",
    port: 5432,
    secret_key: "MYNAMEISSEUNAGBEYEANDYOUCANCALLMESEUNA",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: "password",
    database: "more_recipes_test",
    host: "127.0.0.1",
    port: 5432,
    secret_key: "MYNAMEISSEUNAGBEYEANDYOUCANCALLMESEUNA",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "postgres://bthaddaurywhrt:a77576a4ba391101f7a6fd3a08993556a3bcf1f9e42d2d0acc83c3e5c96e2553@ec2-107-20-250-195.compute-1.amazonaws.com:5432/dduvbobv0s3vfu"
  }
}
