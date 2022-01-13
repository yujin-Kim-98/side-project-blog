package com.blog.api.server.common;

public enum Role {
    MASTER("MASTER"),
    SUB("SUB");

    private String role;

    public String getRole() {
        return role;
    }

    Role(String role) {
        this.role = role;
    }
}
