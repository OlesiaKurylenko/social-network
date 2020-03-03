import { bootstrap, snu } from "@socialNetwork";
import  appModule  from "./app/add.module";
snu.delay(500).then(() => {
  bootstrap(appModule);
});
