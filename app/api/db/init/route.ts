import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    // Create table
    await sql`
      CREATE TABLE IF NOT EXISTS roast_stats (
        id INTEGER PRIMARY KEY,
        count INTEGER NOT NULL DEFAULT 0
      )
    `

    // Initialize with current count of 99 (from local stats.json)
    await sql`
      INSERT INTO roast_stats (id, count)
      VALUES (1, 99)
      ON CONFLICT (id) DO NOTHING
    `

    // Get current count
    const result = await sql`SELECT count FROM roast_stats WHERE id = 1`
    const currentCount = result.rows[0]?.count || 0

    return NextResponse.json({
      success: true,
      message: 'Database initialized',
      currentCount
    })
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
