package ceejay;

import ceejay.json.JsonWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class BookListServlet extends HttpServlet {
    private static final ArrayList<Book> bookList;

    static {
        bookList = new ArrayList<>();
        bookList.add(new Book("Chia Charleston", 2000, images("apple", "pear")));
        bookList.add(new Book("Breanne Somma", 2003, images("coconut")));
        bookList.add(new Book("Leda Sautner", 2005, images("cow")));
        bookList.add(new Book("Exie Ahart", 2007, images("sun")));
        bookList.add(new Book("Cassondra Bibee", 2009, images("seeds", "straw")));
    }

    private static List<Image> images(String... names) {
        List<Image> result = new ArrayList<>();
        for (String name : names) {
            result.add(new Image("images/" + name + ".jpg"));
        }
        return result;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType(ContentTypes.Json.headerText);
        JsonWriter.writeJson(response.getWriter(), bookList);
    }
}
