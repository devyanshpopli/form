create DATABASE registration;

create TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_branch VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_sec VARCHAR(255) NOT NULL,
    user_phone VARCHAR(255) NOT NULL,
    user_rollno VARCHAR(255) NOT NULL
);