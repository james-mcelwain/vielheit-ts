import kernel from "./config/index";
import IApp from "./interfaces/app";
import __ from "./config/constants";

declare var process: any;

const title =
    `
    ___       ___       ___       ___   
   /\\__\\     /\\  \\     /\\  \\     /\\__\\  
  /:/ _/_   _\\:\\  \\   /::\\  \\   /:/  /  
 |::L/\\__\\ /\\/::\\__\\ /::\\:\\__\\ /:/__/   
 |::::/  / \\::/\\/__/ \\:\\:\\/  / \\:\\  \\   
  L;;/__/   \\:\\__\\    \\:\\/  /   \\:\\__\\  
             \\/__/     \\/__/     \\/__/  
    ___       ___       ___       ___   
   /\\__\\     /\\  \\     /\\  \\     /\\  \\  
  /:/__/_   /::\\  \\   _\\:\\  \\    \\:\\  \\ 
 /::\\/\\__\\ /::\\:\\__\\ /\\/::\\__\\   /::\\__\\
 \\/\\::/  / \\:\\:\\/  / \\::/\\/__/  /:/\\/__/
   /:/  /   \\:\\/  /   \\:\\__\\    \\/__/   
   \\/__/     \\/__/     \\/__/            
________________________________________                                                       
`;


console.log(title);
const app = kernel.get<IApp>(__.App);

process.on('uncaughtException', (err: Error) => { app.logger.fatal(err); process.exit(1) });
process.on('unhandledRejection', (err: Error) => { app.logger.fatal(err); process.exit(1) });

app.bootstrap();
