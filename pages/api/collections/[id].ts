// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from '@/mysql'
import type { NextApiRequest, NextApiResponse } from 'next'
import { collectionSummary } from './all'

export type content = {
    id: number
    name: string
    collection: string
    collection_id: number
    image: string
    path?: string
    group_name: string
}

export type collection = { collection: collectionSummary, items: Array<content> }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<collection>
) {
    const collection = (await query("SELECT c.id, c.image, g.image as 'group_image', c.name, c.description, c.date, g.name AS 'group', g.id AS 'group_id', c.type, (SELECT COUNT(*) FROM content WHERE content.collection=c.id) AS items FROM collections AS c LEFT JOIN `groups` AS g ON c.group=g.id WHERE c.id=?", [req.query.id]))[0]
    const items = await query("SELECT c.id, c.path, c.name, co.id AS 'collection_id', co.name AS collection, co.image, g.name AS group_name FROM content AS c INNER JOIN collections AS co ON c.collection = co.id INNER JOIN `groups` AS g ON co.group = g.id WHERE c.collection = ?;", [req.query.id])
    res.status(200).json({ collection, items })
}
