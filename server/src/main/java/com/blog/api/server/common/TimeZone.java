package com.blog.api.server.common;

public enum TimeZone {
    ASIA_SEOUL("Asia/Seoul");

    String zone;

    public String getZone() {
        return zone;
    }

    TimeZone(String zone) {
        this.zone = zone;
    }
}
