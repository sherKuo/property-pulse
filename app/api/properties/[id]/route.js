import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// GET/api/properties/:id
export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const property = await Property.findById(params.id);

        if (!property)
            return new Reponse('Property Not Found', { status: 404 });

        return new Response(
            JSON.stringify(property),

            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong', { status: 500 });
    }
};

// our handler automatic, can keep API keys as its in the server, set cookies

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
    try {

        const propertyId = params.id;
        const sessionUser = await getSessionUser();

        // Check for session
        if(!sessionUser || !sessionUser.userId) {
            return new Response('UserID is required', {status:404});
        }

        const {userId} = sessionUser;

        await connectDB();
        
        const property = await Property.findById(propertyId);

        // Verify Property
        if (!property) {
            return new Reponse('Property Not Found', { status: 404 });
        }

        // Verify ownership to property
        if(property.owner.toString() !== userId) {
            return new Response('Unauthorized', {status:401})
        }

        // Delete property and send 200 status
        await property.deleteOne();
        return new Response('Property Deleted', { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong', { status: 500 });
    }
};
