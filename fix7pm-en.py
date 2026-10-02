# -*- coding: utf-8 -*-
import io

def fix(path, pairs):
    s = io.open(path, encoding="utf-8").read()
    for a, b in pairs:
        n = s.count(a)
        if n == 0:
            print("MISS in %s: %s" % (path, a[:70]))
            continue
        s = s.replace(a, b)
        print("%s: %d× %s…" % (path.split("/")[-1], n, a[:40]))
    io.open(path, "w", encoding="utf-8").write(s)

# Countdown logic: 7:00 PM ET start, 7:28 PM end
fix("src/sections/EventsSection.tsx", [
    ("// Happy Hour runs Sun(0) · Mon(1) · Wed(3) · Fri(5) — lobby opens 1:15 PM, event 1:30–1:58 PM, all in America/New_York so DST is handled by the timezone itself.\nconst EVENT_DAYS = [0, 1, 3, 5];\nconst START_HOUR = 13;\nconst START_MINUTE = 30;\nconst END_HOUR = 13;\nconst END_MINUTE = 58;",
     "// Happy Hour runs Sun(0) · Mon(1) · Wed(3) · Fri(5) — lobby opens 6:45 PM, event 7:00–7:28 PM, all in America/New_York so DST is handled by the timezone itself.\nconst EVENT_DAYS = [0, 1, 3, 5];\nconst START_HOUR = 19;\nconst START_MINUTE = 0;\nconst END_HOUR = 19;\nconst END_MINUTE = 28;"),
])

# EN locale — time strings
fix("src/locales/en.json", [
    ("at\n        1:30 PM New York time. Lobby opens at 1:15 PM.", "at\n        7:00 PM New York time. Lobby opens at 6:45 PM."),  # placeholder guard
    ("Seven four-minute conversations. Sunday, Monday, Wednesday and Friday at 1:30 PM New York time. Lobby opens at 1:15 PM.",
     "Seven four-minute conversations. Sunday, Monday, Wednesday and Friday at 7:00 PM New York time. Lobby opens at 6:45 PM."),
    ("1:30 PM New York time. Lobby opens at 1:15 PM.", "7:00 PM New York time. Lobby opens at 6:45 PM."),
    ("Every Sunday, Monday, Wednesday & Friday — 1:30 PM ET", "Every Sunday, Monday, Wednesday & Friday — 7:00 PM ET"),
    ("The lobby opens 15 minutes before the event.", "The lobby opens 15 minutes before the event — 6:45 PM ET."),
    ("Lobby opens at 1:15 PM \u2014 arrive early", "Lobby opens at 6:45 PM \u2014 arrive early"),
    ("1:30 PM ET · always free", "7:00 PM ET · always free"),
    ("Sun · Mon · Wed · Fri · 1:30 PM ET", "Sun · Mon · Wed · Fri · 7:00 PM ET"),
    ("Ballroom admission always included (Sun/Mon/Wed/Fri 1:30 PM ET)", "Ballroom admission always included (Sun/Mon/Wed/Fri 7:00 PM ET)"),
    ("Next: {{day}} — lobby 1:15 PM ET", "Next: {{day}} — lobby 6:45 PM ET"),
    ("Today — lobby opens 1:15 PM ET", "Today — lobby opens 6:45 PM ET"),
])
