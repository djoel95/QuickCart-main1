import connectDB from '../../config/db';
import User from '../../models/User';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { userID } = getAuth(request);

        if (!userID) {
            return NextResponse.json({ success: false, message: 'User not authenticated' }, { status: 401 });
        }

        await connectDB();
        const user = await User.findById(userID);

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        // Removemos el password si existe en el esquema
        const safeUser = {
            ...user.toObject(),
            id: user._id,
            _id: undefined
        };

        return NextResponse.json({ success: true, user: safeUser });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message 
        }, { status: 500 });
    }
}