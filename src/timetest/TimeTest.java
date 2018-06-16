package timetest;

import java.time.*;
import java.time.temporal.ChronoUnit;

public class TimeTest {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(-400, 2, 1);
        System.out.println(date.plusDays(28));

        date = LocalDate.of(1500, 1, 1);
        System.out.println(ChronoUnit.DAYS.between(date, date.plusMonths(1)));

        ZonedDateTime zoned = ZonedDateTime.of(date, LocalTime.of(0, 0), ZoneId.of("GMT"));
        System.out.println(zoned);
        System.out.println(ChronoUnit.DAYS.between(zoned, zoned.plusMonths(1)));
        System.out.println(ChronoUnit.DAYS.between(date, zoned.plusMonths(1)));
        System.out.println(ChronoUnit.DAYS.between(zoned, zoned.plusMonths(1)));

        ZonedDateTime west = ZonedDateTime.of(zoned.toLocalDateTime(), ZoneId.ofOffset("UT", ZoneOffset.ofHours(-18)));
        ZonedDateTime east = ZonedDateTime.of(zoned.toLocalDateTime(), ZoneId.ofOffset("UT", ZoneOffset.ofHours(+18)));
        System.out.println(ChronoUnit.DAYS.between(west, east));
    }
}
