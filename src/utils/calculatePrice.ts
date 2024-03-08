// Assuming this function is part of or imported by your ReceiptComponent or a similar component where pricing is relevant.

/**
 * Calculates the insurance policy price based on the hurricane category.
 * 
 * @param policyType The type of the insurance policy (basic or premium).
 * @param hurricaneCategory The hurricane category (1-5).
 * @returns The insurance policy price based on the category and policy type.
 */
export function calculatePolicyPrice(policyType: 'basic' | 'premium', hurricaneCategory: number): string {
  // Define the pricing structure as in your PricingTable component
  const prices = {
    basic: ['$25', '$50 - $100', '$150 - $350', '$450 - $800', '$1,000'],
    premium: ['$50', '$100 - $200', '$300 - $700', '$900 - $1,600', '$2,000'],
  };

  // Define the fixed insurance policy price/year based on policy type
  const insurancePolicyPrice = {
    basic: '$50',
    premium: '$100',
  };

  // Map the hurricane category to the index in your arrays (assuming category 1 maps to index 0)
  const priceIndex = hurricaneCategory - 1;

  // Access the relevant price range or fixed price based on the policy type and category
  const paymentRange = prices[policyType][priceIndex];
  const policyPrice = insurancePolicyPrice[policyType];

  // Assuming you return a string that combines the information relevant to your application's needs
  return `Policy Type: ${policyType}, Category: ${hurricaneCategory}, Payment Range: ${paymentRange}, Policy Price: ${policyPrice}`;
}
