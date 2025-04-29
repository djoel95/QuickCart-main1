import { serve } from 'inngest/next';
import { inngest, syncsUserDeletion, syncUserCreation, syncUserUpdation, createUserOrder } from '@/config/inngest';

// Create an API que serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncsUserDeletion,
    createUserOrder
  ],
});