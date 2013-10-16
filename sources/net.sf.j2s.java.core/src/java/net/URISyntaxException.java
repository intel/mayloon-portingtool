package java.net;

public class URISyntaxException extends Exception {
    private String input;
    private int index = -1;

    public URISyntaxException(String input, String reason) {
        this(input, reason, -1);
    }

    public URISyntaxException(String input, String reason, int index) {
        super(reason);
        if ((input == null) || (reason == null))
            throw new NullPointerException();
        if (index < -1)
            throw new IllegalArgumentException();
        this.input = input;
        this.index = index;
    }

    public String getInput() {
        return input;
    }

    public int getIndex() {
        return index;
    }
}
