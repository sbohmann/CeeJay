package ceejay.data;

public class Author {
    private final int id;
    private final String displayName;

    public Author(int id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    public int getId() {
        return id;
    }

    public String getDisplayName() {
        return displayName;
    }
}
