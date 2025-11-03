import { sql } from '@vercel/postgres'

export async function getRoastCount(): Promise<number> {
  try {
    const result = await sql`
      SELECT count FROM roast_stats WHERE id = 1
    `
    return result.rows[0]?.count || 0
  } catch (error) {
    console.error('Error getting roast count:', error)
    return 0
  }
}

export async function incrementRoastCount(): Promise<number> {
  try {
    const result = await sql`
      INSERT INTO roast_stats (id, count)
      VALUES (1, 1)
      ON CONFLICT (id)
      DO UPDATE SET count = roast_stats.count + 1
      RETURNING count
    `
    return result.rows[0]?.count || 0
  } catch (error) {
    console.error('Error incrementing roast count:', error)
    return 0
  }
}

export async function initializeDatabase() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS roast_stats (
        id INTEGER PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0
      )
    `

    // Initialize with count if empty
    await sql`
      INSERT INTO roast_stats (id, count)
      VALUES (1, 0)
      ON CONFLICT (id) DO NOTHING
    `

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}
