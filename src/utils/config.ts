import 'dotenv/config';

// TODO: zod validation would be nicer to have here

// const requiredEnvironment = ['BOT_TOKEN', 'DATABASE_URL'];
const requiredEnvironment = ['BOT_TOKEN'];

const missingEnv = requiredEnvironment.filter((req) => !process.env[req]);

if (missingEnv.length > 0)
  throw new Error(
    'Missing required environment variables: \n- ' +
      missingEnv.reduce((a, b) => (b += `\n- ${a}`))
  );

export const {
  BOT_TOKEN = '',
  SERVER_ID = '420594746990526466', // default: Arduino Official
} = process.env;
