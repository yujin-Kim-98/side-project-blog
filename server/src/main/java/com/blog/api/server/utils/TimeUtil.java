package com.blog.api.server.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class TimeUtil {

    public static LocalDateTime getLocalDateTime(String zone) {
        ZonedDateTime dateTime = ZonedDateTime.of(LocalDateTime.now(), ZoneId.of(zone));

        return dateTime.toLocalDateTime();
    }
}
