package ceejay;

public enum ContentTypes {
    Json("application/json");

    public final String headerText;

    private static final String encodingSufix = "; charset=utf-8";

    ContentTypes(String name) {
        this.headerText = name + encodingSufix;
    }
}
