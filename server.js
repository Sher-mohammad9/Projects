const app = require("./application/app.js");
const config = require("./config.js");
app.listen(config.PORT, config.IP, ()=> console.log(`Server start at PORT ${config.PORT}`));