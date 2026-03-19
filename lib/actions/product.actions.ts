'use server'

import { prisma } from '@/public/sample-data/db/prisma';
import { convertToPlainObject } from '../utils';

import { LATEST_PRODUCTS_LIMIT } from '../costants';
//Get
export async function getLatestProducts() {
    
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy:{createdAt:'asc'},
    })
    return convertToPlainObject(data);
}
//get single product

export async function getProductBySlug(slug:string) {
    return await prisma.product.findFirst({
        where:{slug:slug}
    })

}