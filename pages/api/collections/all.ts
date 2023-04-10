// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from '@/mysql'
import type { NextApiRequest, NextApiResponse } from 'next'

export type collection = {
    id: number;
    name: string,
    description: string
    group: string,
    items: number,
    type: number,
    image?: string,
    date: string
    group_id: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Array<collection>>
) {
    const collections = await query("SELECT c.id, c.image, c.name, c.description, c.date, g.name AS 'group', g.id AS 'group_id', c.type, (SELECT COUNT(*) FROM content WHERE content.collection=c.id) AS items FROM collections AS c LEFT JOIN `groups` AS g ON c.group=g.id")
    res.status(200).json(collections)
}
