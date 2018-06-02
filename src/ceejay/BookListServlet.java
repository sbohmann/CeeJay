package ceejay;

import ceejay.data.Author;
import ceejay.data.Book;
import ceejay.data.Image;
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
        bookList.add(new Book(1, "Different Fruit", new Author(1, "Chia Charleston"), 2000, images("apple", "pear")));
        bookList.add(new Book(2, "Tropical", new Author(2, "Breanne Somma"), 2003, images("coconut")));
        bookList.add(new Book(3, "The Beast", new Author(3, "Leda Sautner"), 2005, images("cow")));
        bookList.add(new Book(4, "Sizzling", new Author(4, "Exie Ahart"), 2007, images("sun")));
        bookList.add(new Book(5, "A Provincial Life", new Author(5, "Cassondra Bibee"), 2009, images("seeds", "straw")));
    }

    private static List<Image> images(String... names) {
        List<Image> result = new ArrayList<>();
        for (String name : names) {
            result.add(new Image("/images/" + name + ".jpg"));
        }
        return result;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType(ContentTypes.Json.headerText);
        JsonWriter.writeJson(response.getWriter(), bookList);
    }
}
