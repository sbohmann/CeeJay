package ceejay.json;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.Writer;

public class JsonWriter {
    public static void writeJson(Writer out, Object data) throws IOException {
        JsonGenerator jsonOut = new JsonFactory().createGenerator(out);
        jsonOut.setCodec(new ObjectMapper());
        jsonOut.writeObject(data);
        jsonOut.close();
    }
}
