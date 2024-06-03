package com.example.blog;

import java.util.Random;

public class RandomNameGenerator {
    private static final String[] FIRST_NAMES = {
            "Andrei", "Mihai", "Alexandru", "Ion", "Vasile", "Elena", "Maria", "Ana", "Ioana", "Gabriela"
    };
    private static final String[] LAST_NAMES = {
            "Popescu", "Ionescu", "Georgescu", "Dumitrescu", "Stan", "Radu", "Marin", "Diaconescu", "Nicolae", "Dinu"
    };

    private static final Random RANDOM = new Random();

    public static String getRandomFirstName() {
        return FIRST_NAMES[RANDOM.nextInt(FIRST_NAMES.length)];
    }

    public static String getRandomLastName() {
        return LAST_NAMES[RANDOM.nextInt(LAST_NAMES.length)];
    }
}
