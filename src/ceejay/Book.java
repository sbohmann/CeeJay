package ceejay;

import com.google.common.collect.ImmutableList;

import java.util.List;

class Book {
    final String author;
    final int year;
    final List<Image> images;

    Book(String author, int year, List<Image> images) {
        this.author = author;
        this.year = year;
        this.images = ImmutableList.copyOf(images);
    }
}
