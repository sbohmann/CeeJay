package ceejay;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.ResourceService;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.util.resource.Resource;

import java.io.File;
import java.io.IOException;

class CeeJay {
    public static void main(String[] args) throws Exception {
        new CeeJay().run();
    }

    private void run() throws Exception {
        createServer();
    }

    private void createServer() throws Exception {
        Server server = new Server(8080);
        server.setHandler(createServletHandler());
        server.start();
        server.join();
    }

    private Handler createServletHandler() throws IOException {
        ServletContextHandler result = new ServletContextHandler();
        result.setBaseResource(Resource.newResource(staticResourceDirectory()));
        addDefaultServlet(result);
        return result;
    }

    private File staticResourceDirectory() throws IOException {
        File result = new File("static");
        if (!result.isDirectory()) {
            throw new IOException("Not a directory: [" + result.getCanonicalPath() + "]");
        }
        return result;
    }

    private void addDefaultServlet(ServletContextHandler serlvetHandler) {
        serlvetHandler.addServlet(new ServletHolder(new DefaultServlet()), "/");
    }
}
