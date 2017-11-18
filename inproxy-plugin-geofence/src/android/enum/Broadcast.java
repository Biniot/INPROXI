package com.gilson.alby.event;

/**
 * Created by esanquer on 16/08/2017.
 */

public enum Broadcast {
    NONE("NONE", 0),
    TWO_LIST("TWO_LIST", 1),
    DEVICE_SURVEY_LIST("DEVICE_SURVEY_LIST", 2),
    DEVICE_LIST("DEVICE_LIST", 3);

    private String stringValue;
    private int intValue;

    private Broadcast(String toString, int value) {
        stringValue = toString;
        intValue = value;
    }

    @Override
    public String toString() {
        return stringValue;
    }
}
