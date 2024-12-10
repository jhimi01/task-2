import prisma from '@/lib/db'
import React from 'react'

export default async function Data() {

    const users = await prisma.user.findMany()

    console.log("users", users)


  return (
    <div>
      this is a page
    </div>
  )
}
