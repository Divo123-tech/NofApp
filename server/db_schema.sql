-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    profile_image TEXT,
    date_joined DATETIME DEFAULT CURRENT_TIMESTAMP,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 0,
    total_days_clean INTEGER DEFAULT 0,
    notifications_enabled INTEGER DEFAULT 1,  -- Use 1 for TRUE, 0 for FALSE
    privacy_level TEXT CHECK(privacy_level IN ('public', 'private', 'friends-only')) DEFAULT 'public'
);


-- Accountability partnerships
CREATE TABLE accountability_partnerships (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    partner_id INTEGER,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT CHECK(status IN ('active', 'inactive', 'pending')) DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (partner_id) REFERENCES users(id)
);

-- Custom timers
CREATE TABLE custom_timers (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    name TEXT NOT NULL,
    duration INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Streaks
CREATE TABLE streaks (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    coins_earned INTEGER DEFAULT 0,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Triggers (for streak entries)
CREATE TABLE triggers (
    id INTEGER PRIMARY KEY ,
    streak_id INTEGER,
    trigger_name TEXT NOT NULL,
    FOREIGN KEY (streak_id) REFERENCES streaks(id)
);

-- Mood logs
CREATE TABLE mood_logs (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    mood TEXT CHECK(mood IN ('great', 'good', 'neutral', 'bad', 'terrible')),
    energy_level INTEGER CHECK(energy_level BETWEEN 1 AND 5),
    anxiety_level INTEGER CHECK(anxiety_level BETWEEN 1 AND 5),
    motivation_level INTEGER CHECK(motivation_level BETWEEN 1 AND 5),
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Charities
CREATE TABLE charities (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    website TEXT,
    total_donations INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);


-- Donations
CREATE TABLE donations (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    charity_id INTEGER,
    amount INTEGER NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    transaction_id TEXT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (charity_id) REFERENCES charities(id)
);

-- Achievements
CREATE TABLE achievements (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    coin_reward INTEGER DEFAULT 0,
    criteria_type TEXT CHECK(criteria_type IN ('streak', 'donations', 'community')),
    criteria_value INTEGER
);

-- User achievements
CREATE TABLE user_achievements (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    achievement_id INTEGER,
    date_earned DATETIME DEFAULT CURRENT_TIMESTAMP,
    coins_awarded INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (achievement_id) REFERENCES achievements(id)
);



-- Create indexes for better query performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_streaks_user_date ON streaks(user_id, date);
CREATE INDEX idx_mood_logs_user_date ON mood_logs(user_id, date);
