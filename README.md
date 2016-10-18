
       	    ___       ___       ___       ___
       	   /\__\     /\  \     /\  \     /\__\          Learning Notes:
       	  /:/ _/_   _\:\  \   /::\  \   /:/  /          ---------------
       	 |::L/\__\ /\/::\__\ /::\:\__\ /:/__/
       	 |::::/  / \::/\/__/ \:\:\/  / \:\  \           1. Inversify is suprisingly stable, despite lacking 
       	  L;;/__/   \:\__\    \:\/  /   \:\__\             the runtime information to do reflection "properly." 
       	             \/__/     \/__/     \/__/             In such a small project, it's hard to tell the 
       	    ___       ___       ___       ___              advantage programming to injecting interfaces 
       	   /\__\     /\  \     /\  \     /\  \             lover just creating thin hard coded abstraction over 
       	  /:/__/_   /::\  \   _\:\  \    \:\  \            things like db, cache, etc.
       	 /::\/\__\ /::\:\__\ /\/::\__\   /::\__\ 
                                                        2. Async await is *glorious* if you're going to program 
       	 \/\::/  / \:\:\/  / \::/\/__/  /:/\/__/           in this style in JavaScript. Organizing things in 
       	   /:/  /   \:\/  /   \:\__\    \/__/              easier to layer things logically as opposed to having logic
       	   \/__/     \/__/     \/__/                       tied up in the actual REST endpoint.
       	________________________________________
                                                        3. Static typing, even applying typings as "superset" of 
         A Restify server written in Typescript            JavaScript is super helpful. It's absurdly easy to write
         using Inversify to make things just a             quickly and refactor.
         bit over-engineered.
                                                        4. There's a lot of boilerplate in writing in this style. For
         Featuring:                                        example, creating a new concrete service requires, writing 
         -- Decorators for Restify route paths             the interface, adding its "constant" for Inversify, adding
         -- "IoC" using Inversify                          it to the application configuration, writing the concrete
         -- Redis / JWT auth flow                          class, importing the interface to everything that's going to
         -- Postgres persistence                           use it. 