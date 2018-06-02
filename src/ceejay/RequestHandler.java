package ceejay;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.AbstractHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class RequestHandler extends AbstractHandler {
    private static final Pattern apiPath = Pattern.compile("/api(?:/(.*))?");
    private static final Pattern bookPath = Pattern.compile("book/(\\d+)");

    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException {
        Matcher matcher = apiPath.matcher(request.getPathInfo());
        if (matcher.matches()) {
            handleApiRequest(matcher, response);
            baseRequest.setHandled(true);
        }
    }

    private void handleApiRequest(Matcher matcher, HttpServletResponse response) throws IOException {
        if (matcher.group(1) != null) {
            if (handleSpecificPath(matcher.group(1), response) ) {
                return;
            }
        }
        writeDefaultResponse(response);
    }

    private boolean handleSpecificPath(String path, HttpServletResponse response) throws IOException {
        boolean handled = true;

        if (path.equals("book_list")) {
            writeBookList(response);
        } else if (path.startsWith("book/")) {
            writeBook(response);
        } else {
            handled = false;
        }
        return handled;
    }

    private void writeBookList(HttpServletResponse response) throws IOException {
        response.setContentType("text/plain; charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
        PrintWriter out = response.getWriter();
        out.println("Book 1");
        out.println("Book 2");
        out.println("Book 3");
    }

    private void writeBook(HttpServletResponse response) throws IOException {
        response.setContentType("text/plain; charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
        PrintWriter out = response.getWriter();
        out.println("Book 1");
        out.println("Book 2");
        out.println("Book 3");
    }

    private void writeDefaultResponse(HttpServletResponse response) throws IOException {
        response.setContentType("text/plain; charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println("Response content");
    }
}
