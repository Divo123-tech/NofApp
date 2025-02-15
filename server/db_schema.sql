-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    -- profile_image TEXT,
    -- date_joined DATETIME DEFAULT CURRENT_TIMESTAMP,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 0,
    total_days_clean INTEGER DEFAULT 0,
    total_donated INTEGER DEFAULT 0,
    type TEXT CHECK(type IN ('seeking_help', 'helping', 'both')),
    accountability_partner_id INTEGER,
    FOREIGN KEY (accountability_partner_id) REFERENCES users(id) ON DELETE SET NULL
    -- notifications_enabled INTEGER DEFAULT 1,  -- Use 1 for TRUE, 0 for FALSE
    -- privacy_level TEXT CHECK(privacy_level IN ('public', 'private', 'friends-only')) DEFAULT 'public'
);


-- Mood logs
CREATE TABLE day_logs (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    date DATE DEFAULT (CURRENT_DATE),
    mood TEXT CHECK(mood IN ('great', 'good', 'neutral', 'bad', 'terrible')),
    energy_level INTEGER CHECK(energy_level BETWEEN 1 AND 5),
    notes TEXT CHECK(length(notes) <= 100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Donations
CREATE TABLE donations (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    charity TEXT NOT NULL,
    amount INTEGER NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- transaction_id TEXT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Create indexes for better query performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_day_logs_user_date ON day_logs(user_id, date);  -- Fixed table name and columns
CREATE INDEX idx_donations_user_id ON donations(user_id);  -- Fixed table name and column
