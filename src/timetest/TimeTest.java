package timetest;

import java.time.LocalDate;

public class TimeTest {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(-400, 2, 1);
        System.out.println(date.plusDays(28));
        System.out.println(-400 % 100);
    }
}
