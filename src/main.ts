import kernel from './config/di-config'
import IApp from './interfaces/app'
import __ from './config/app-constants'


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

process.on('uncaughtException', (...args: Array<any>) => { app.logger.fatal(...args); process.exit(1) });
process.on('unhandledRejection', (...args: Array<any>) =>{ app.logger.fatal(...args); process.exit(1) });

app.bootstrap();

export default function graceful_shutdown() {
    app.close()
}