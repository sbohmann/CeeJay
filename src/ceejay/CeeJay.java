package ceejay;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.handler.ResourceHandler;

class CeeJay {
    public static void main(String[] args) throws Exception {
        new CeeJay().run();
    }

    private void run() throws Exception {
        createServer();
    }

    private void createServer() throws Exception {
        Server server = new Server(8080);
        server.setHandler(createHandlerCollection());
        server.start();
        server.join();
    }

    private HandlerCollection createHandlerCollection() {
        HandlerCollection result = new HandlerCollection();
        result.setHandlers(createHandlerArray());
        return result;
    }

    private Handler[] createHandlerArray() {
        return new Handler[]{
                new RequestHandler(),
                createResourceHandler()};
    }

    private Handler createResourceHandler() {
        ResourceHandler result = new ResourceHandler();
        result.setResourceBase("static");
        return result;
    }
}
