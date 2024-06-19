import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        }),
    ],

    callbacks:{
        // Invoked on successful Signing
        async signIn({ profile }) {
            // 1. Connect to the database
            // 2. Check if the user exist
            // 3. If not, then add the user to the database
            // 4. Return true to allow sign in

            
        },
        // Modifies the session object
        async session({ session }){
            // 1. Get user form databse
            // 2. Assign the user id to the session
            // 3. return session
        }
    }
};
