const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

client.connect()
  .then(() => {
    console.log("✅ Neon is reachable.");
    return client.end();
  })
  .catch(err => {
    console.error("❌ Cannot connect to Neon:", err.message);
    console.error("📄 Full error:", err);  // Add this line
    process.exit(1);
  });
