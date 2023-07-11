import dotenv from "dotenv";
dotenv.config();
const tgStreamBaseURL = process.env.VITE_TG_STREAM_BASE_URL;
const urlRegex = /(ws)s?:\/\/.+(?<!\/)$/;

function checkEnv() {
  if (tgStreamBaseURL && !urlRegex.test(tgStreamBaseURL)) {
    console.log("Invalid environment variable format");
    console.log("- Must start with ws:// or wss://");
    console.log("- Must NOT have a trailing slash at the end");
    process.exitCode = 1;
    // throw Error(
    //   "Invalid environment variable format for VITE_TG_STREAM_BASE_URL."
    // );
  }
  if (process.exitCode !== 1) {
    console.log("All checks completed successfully!");
  }
}

checkEnv();
