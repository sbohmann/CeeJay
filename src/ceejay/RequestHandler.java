package ceejay;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.AbstractHandler;
import org.eclipse.jetty.server.handler.ResourceHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Pattern;

public class RequestHandler extends AbstractHandler {
    private static final Pattern apiPath = Pattern.compile("/api(?:/.*)?");

    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        if (isApiPath(request.getPathInfo())) {
            handleApiRequest(request, response);
            baseRequest.setHandled(true);
        }
    }

    private boolean isApiPath(String path) {
        return apiPath.matcher(path).matches();
    }

    private void handleApiRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/plain; charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println("Response content");
    }
}
