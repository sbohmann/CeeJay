package ceejay.pathHandler;

import org.eclipse.jetty.server.Handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class Resolver {
    private Pattern basePath;
    private final HttpServletRequest request;
    private final HttpServletResponse response;
    private Map<Pattern, Handler> subPathHandlers;

    Resolver(Pattern basePath, HttpServletRequest request, HttpServletResponse response, Map<Pattern, Handler> subPathHandlers) {
        this.basePath = basePath;
        this.request = request;
        this.response = response;
        this.subPathHandlers = subPathHandlers;
    }

    boolean run() {
        if (basePath != null) {
            return handleRequestWithBasePath();
        } else {
            hanldeRequestWithoutBasePath();
            return true;
        }
    }

    private boolean handleRequestWithBasePath() {
        Matcher matcher = basePath.matcher(request.getPathInfo());
        if (matcher.matches()) {
            handleRequest(matcher.group(1), response);
            return true;
        }
        return false;
    }

    private void hanldeRequestWithoutBasePath() {
        handleRequest(request.getPathInfo(), response);
    }

    private void handleRequest(String path, HttpServletResponse response) {

    }
}
