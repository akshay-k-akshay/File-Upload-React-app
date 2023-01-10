const convict = require("convict");
const { url } = require("convict-format-with-validator");

const schema = {
  app: {
    port: {
      doc: "The port to bind.",
      format: "port",
      default: 4000,
      env: "PORT"
    }
  },
  node_env: {
    doc: "The application environment.",
    format: ["dev", "prod"],
    default: "dev",
    env: "NODE_ENV"
  },
  db: {
    url: {
      default: "mongodb://localhost/file-upload-app",
      env: "DB_URL"
    }
  },
  jwt: {
    secret: {
      doc: "The secret to use for JWT.",
      format: String,
      default: "%vVdW>)Jr2)3x*b^r^*L149{,jwVl9Rw6GoR/jF`,ihs^KPK.I<co^$_6'!NL",
      env: "JWT_SECRET"
    },
    expiresIn: {
      doc: "The time to expire the JWT.",
      format: String,
      default: "24h",
      env: "JWT_EXPIRES_IN"
    }
  }
};

convict.addFormat(url);

const config = convict(schema).validate({ allowed: "strict" });

module.exports = { config };
