# Backend Architecture Graph

```mermaid
graph TD
    %% ── Entry ──────────────────────────────────────────
    ENV[".env\nMONGO_URI\nJWT_SECRATE\nIMAGEKIT_PRIVATE_KEY"]
    SERVER["server.js\nport 3000"]
    APP["src/app.js\nexpress.json · cookie-parser"]
    DB["src/config/database.js\nmongoose.connect(MONGO_URI)"]

    SERVER --> APP
    SERVER --> DB
    ENV --> SERVER

    %% ── Routers ─────────────────────────────────────────
    APP --> R_AUTH["/api/auth\nauthRouter"]
    APP --> R_POST["/api/posts\npostRouter"]
    APP --> R_USER["/api/users\nuserRouter"]

    %% ── Middleware ───────────────────────────────────────
    MW["identifyUser middleware\nreads cookie token\njwt.verify → req.user {id,username}"]
    R_POST --> MW
    R_USER --> MW

    %% ── Auth Controllers ─────────────────────────────────
    R_AUTH --> C_REG["POST /register\nbcrypt.hash → create user\nsign JWT → set cookie"]
    R_AUTH --> C_LOG["POST /login\nbcrypt.compare\nsign JWT → set cookie"]

    %% ── Post Controllers ─────────────────────────────────
    MW --> C_CREATE["POST /posts\nMulter (memory)\n→ ImageKit upload\n→ create Post doc"]
    MW --> C_GET["GET /posts\nfetch own posts\n(post.user = req.user.id)"]
    MW --> C_DET["GET /posts/details/:postId\nowner-only gate\n(403 if not author)"]
    MW --> C_LIKE["POST /posts/like/:postId\ncreate Like doc\nunique index guard"]

    %% ── User Controllers ─────────────────────────────────
    MW --> C_FOLLOW["POST /users/follow/:username\nblock self-follow\ncheck duplicate\nsend follow request\n(status: pending)"]
    MW --> C_ACCEPT["POST /users/accept/:username\nfindOneAndUpdate\n(pending → accepted)"]
    MW --> C_REJECT["POST /users/reject/:username\nfindOneAndUpdate\n(pending → rejected)"]
    MW --> C_UNFOLLOW["POST /users/unfollow/:username\nfindByIdAndDelete"]

    %% ── Models ───────────────────────────────────────────
    M_USER[("users\n─────\nusername (unique)\nemail (unique)\npassword (hash)\nbio\nprofileImage")]
    M_POST[("posts\n─────\ncaption\nimgURL (ImageKit)\nuser → users._id")]
    M_FOLLOW[("follows\n─────\nfollower (username)\nfollowee (username)\nstatus: pending/accepted/rejected\nunique{follower,followee}")]
    M_LIKE[("likes\n─────\npost (postId string)\nuser (username)\nunique{post,user}")]

    %% ── Controller → Model connections ───────────────────
    C_REG --> M_USER
    C_LOG --> M_USER
    C_CREATE --> M_POST
    C_GET --> M_POST
    C_DET --> M_POST
    C_LIKE --> M_LIKE
    C_LIKE --> M_POST
    C_FOLLOW --> M_FOLLOW
    C_FOLLOW --> M_USER
    C_ACCEPT --> M_FOLLOW
    C_REJECT --> M_FOLLOW
    C_UNFOLLOW --> M_FOLLOW

    %% ── Styling ──────────────────────────────────────────
    style ENV fill:#f5f5f5,stroke:#999
    style SERVER fill:#dbeafe,stroke:#3b82f6
    style APP fill:#dbeafe,stroke:#3b82f6
    style DB fill:#dbeafe,stroke:#3b82f6
    style MW fill:#fef9c3,stroke:#eab308
    style M_USER fill:#dcfce7,stroke:#16a34a
    style M_POST fill:#dcfce7,stroke:#16a34a
    style M_FOLLOW fill:#dcfce7,stroke:#16a34a
    style M_LIKE fill:#dcfce7,stroke:#16a34a
    style C_REG fill:#fce7f3,stroke:#db2777
    style C_LOG fill:#fce7f3,stroke:#db2777
    style C_CREATE fill:#ede9fe,stroke:#7c3aed
    style C_GET fill:#ede9fe,stroke:#7c3aed
    style C_DET fill:#ede9fe,stroke:#7c3aed
    style C_LIKE fill:#ede9fe,stroke:#7c3aed
    style C_FOLLOW fill:#ffedd5,stroke:#ea580c
    style C_ACCEPT fill:#ffedd5,stroke:#ea580c
    style C_REJECT fill:#ffedd5,stroke:#ea580c
    style C_UNFOLLOW fill:#ffedd5,stroke:#ea580c
```

---

## Legend

| Color | Layer |
|---|---|
| 🔵 Blue | Infrastructure (server, app, db) |
| 🟡 Yellow | Middleware (auth guard) |
| 🩷 Pink | Auth controllers |
| 🟣 Purple | Post controllers |
| 🟠 Orange | User controllers |
| 🟢 Green | MongoDB models |
