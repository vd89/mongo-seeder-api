import app from "./src/app.js";
import appConfig from "./src/appConfig.js";
import main from "./src/controller/dbConnect.js";

const { port } = appConfig;

(async () => {

  await main()

  app.listen(port, () => {
    try {
      console.info(`Server is running on the http://localhost:${port}`)
    } catch (err) {
      console.error(err.message)
    }
   })


 })();