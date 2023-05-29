import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: 'secret_roTdopDJhPvvbuWWIEIVEjM6wNFYz3ClnbmlNayM4Ti',
})

const databaseId = 'f44def12a62847aab003c0f113f3e36b'

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Data = {
  detail?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { pageId, propertyId } = req.query
    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({ detail: response, message: 'Success' })
  } catch {
    res.status(400).json({ message: 'Failed' })
  }
}
