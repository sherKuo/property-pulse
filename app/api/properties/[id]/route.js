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

// PUT /api/properties/:id
export const PUT = async (request, {params}) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();
        
        // Handle the session if it is null otherwise you can pass over this.
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401});
        }

        const { id }=params;
        const { userId } = sessionUser;

        const formData = await request.formData();

        // Access all values forom amenities 
        const amenities = formData.getAll('amenities');

        // Get property to update
        const existingProperty = await Property.findById(id);

        if(!existingProperty){
            return new Response('Property does not exist', {status: 404});
        }

        // Verify Ownership
        if (existingProperty.owner.toString() !== userId){
            return new Response('Unauthorized', {status: 401});
        }


        // Create propertyData object for database
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                nightly: formData.get('rates.nightly'),
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
              },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
        };

        // Update Proeprty in database
        const updatedProperty = await Property.findByIdAndUpdate(id,propertyData);

        // instead of returning 200 we want to redirect from the server to the property page were're creating
        return new Response(JSON.stringify(updatedProperty), { status: 200});


    } catch (error) {
    //   console.log(error);
      console.error("THIS is what we're looking for --> ", error);
        return new Response(JSON.stringify({message:'Failed to add Property'}, { status: 500}));
    }
}