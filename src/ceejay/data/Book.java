package ceejay.data;

import com.google.common.collect.ImmutableList;

import java.util.List;

public class Book {
    private final int id;
    private final String name;
    private final Author author;
    private final int year;
    private final List<Image> images;

    public Book(int id, String name, Author author, int year, List<Image> images) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.year = year;
        this.images = ImmutableList.copyOf(images);
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Author getAuthor() {
        return author;
    }

    public int getYear() {
        return year;
    }

    public List<Image> getImages() {
        return images;
    }
}
