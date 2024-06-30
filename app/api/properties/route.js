import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';


// GET/api/properties
export const GET = async (request) => {
    try {
        await connectDB();

        const properties = await Property.find({});

        return new Response(
            JSON.stringify(properties),

            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong', { status: 500 });
    }
};

// our handler automatic, can keep API keys as its in the server, set cookies
//


export const POST = async (request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();
        
        // Handle the session if it is null otherwise you can pass over this.
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401});
        }

        const { userId } = sessionUser;

        const formData = await request.formData();

        // Access all values forom amenities and images
        const amenities = formData.getAll('amentities');
        const images = formData.getAll('images').filter((image) => image.name !== '');

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
                weekly: formData.get('')
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: sessionUser.userId,
            // images,
        };

        const newProperty = new Property(propertyData);
        await newProperty.save();

        // instead of returning 200 we want to redirect from the server to the property page were're creating
        // return new Response(JSON.stringify({message:'Success'}), { status: 200});

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);

    } catch (error) {
      console.log(error);
        return new Response(JSON.stringify({message:'Failed to add Property'}, { status: 500}));
    }
}