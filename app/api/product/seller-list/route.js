import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const { userId } = getAuth(request)

        const isSeller =  authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }
        const products = await Product.find({})
        return NextResponse.json({ success: true, products })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}