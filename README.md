# Farmy Prerender Server
Prerender is a node server that uses Headless Chrome to render HTML, screenshots, PDFs, and HAR files out of any web page. The Prerender server listens for an http request, takes the URL and loads it in Headless Chrome, waits for the page to finish loading by waiting for the network to be idle, and then returns your content.
## Use
* `yarn install` or `npm install`
It will install dependencies.
* `yarn start` or `npm start`
It will run chrome server.
## How Works
Farmy prerender only works with *farmy_prerender* gem that should be stay in *vendor/gems/farmy_prerender* configured in *config/initializers/prerender.rb*
When request, the gem check if is a robot or if parameter is passed, when result is true, it send http call chrome server. Chrome server check if a redis key exists and if exists it will be returned, if it does not exist, it will respond with a json that contains `prerendering: true` and will start asynchronously the rendering of the p
## Options
### Chrome Server
In *server.js* file you can specify serverals options.
### Rails Middleware
In *prerender.rb* you can setup:
* render_server (string): url where chrome server is running.
* host (string): url thats chrome server use to request page to render. It can be the same that farmy instance.
* default_render_robot (bool): If it is true the server will respond with a rendered page as long as it detects that it is a robot, on the other hand if it is false, it will only respond with a rendered view if the parameter _force_rendered_ is passed.
