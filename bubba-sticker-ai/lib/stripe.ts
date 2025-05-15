// lib/stripe.ts
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { functions } from './firebase';
import { httpsCallable } from 'firebase/functions';

/**
 * Creates a checkout session for a subscription
 */
export const createCheckoutSession = async (
  userId: string, 
  priceId: string
): Promise<{ sessionId: string; url: string }> => {
  try {
    const createCheckoutFunction = httpsCallable<
      { priceId: string },
      { sessionId: string; url: string }
    >(functions, 'ext-firestore-stripe-payments-createCheckoutSession');
    
    const result = await createCheckoutFunction({ priceId });
    return result.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

/**
 * Creates a portal session for managing subscription
 */
export const createPortalSession = async (
  returnUrl: string
): Promise<{ url: string }> => {
  try {
    const createPortalFunction = httpsCallable<
      { returnUrl: string },
      { url: string }
    >(functions, 'ext-firestore-stripe-payments-createPortalLink');
    
    const result = await createPortalFunction({ returnUrl });
    return result.data;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
};

/**
 * Get user subscription data
 */
export const getUserSubscription = async (userId: string) => {
  try {
    const userSubscriptionRef = doc(db, `customers/${userId}/subscriptions`);
    const subscriptionSnapshot = await getDoc(userSubscriptionRef);
    
    if (!subscriptionSnapshot.exists()) {
      return null;
    }
    
    const subscriptionData = subscriptionSnapshot.data();
    return {
      id: subscriptionSnapshot.id,
      status: subscriptionData.status,
      planId: subscriptionData.price.product,
      priceId: subscriptionData.price.id,
      currentPeriodEnd: subscriptionData.current_period_end.toDate(),
      cancelAtPeriodEnd: subscriptionData.cancel_at_period_end,
    };
  } catch (error) {
    console.error('Error getting user subscription:', error);
    throw error;
  }
};

/**
 * Map subscription product ID to plan details
 */
export const subscriptionPlans = {
  'prod_free': {
    name: 'Free',
    quota: 3,
    quotaPeriod: 'daily',
    quality: 'Low',
    maxResolution: '512x512'
  },
  'prod_plus': {
    name: 'Plus',
    quota: 30,
    quotaPeriod: 'monthly',
    quality: 'Medium',
    maxResolution: '1024x1024'
  },
  'prod_pro': {
    name: 'Pro',
    quota: 50,
    quotaPeriod: 'monthly',
    quality: 'High',
    maxResolution: '1536x1024'
  }
};