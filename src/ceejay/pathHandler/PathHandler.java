package ceejay.pathHandler;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.AbstractHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PathHandler extends AbstractHandler {
    private static final Pattern rawBasePath = Pattern.compile("/?((?:\\w+)(?:/\\w+)*)/?");
    private Pattern basePath;
    Map<Pattern, Handler> subPathHandlers = new LinkedHashMap<>();

    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        Handler subPathHandler = new Resolver(
                basePath,
                request,
                response,
                subPathHandlers)
                .run());
        if (subPathHandler != null) {
            subPathHandler.handle(target, baseRequest, request, response);
        }
    }

    public void setBasePath(String basePath) {
        Matcher matcher = rawBasePath.matcher(basePath);
        if (matcher.matches()) {
            this.basePath = Pattern.compile("/" + basePath + "/(.*)");
        } else {
            throw new IllegalArgumentException("Illegal base path format: [" + basePath + "]");
        }
    }
}
