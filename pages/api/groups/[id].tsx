// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from '@/mysql'
import type { NextApiRequest, NextApiResponse } from 'next'

export type group = {
    id: number;
    name: string,
    description: string
    image: string
    items: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Array<group>>
) {
    const group = (await query("SELECT g.*, (SELECT COUNT(*) FROM collections WHERE collections.group=g.id) AS items FROM s1_archive.groups AS g WHERE g.id = ?;", [req.query.id]))[0]
    res.status(200).json(group)
}
