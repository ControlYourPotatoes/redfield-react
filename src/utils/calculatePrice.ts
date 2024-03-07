// src/utils/calculatePrice.ts

/**
 * Calculates the insurance policy price.
 * 
 * @param policyType The type of the insurance policy (basic or premium).
 * @param hurricaneCategory The Saffir-Simpson hurricane wind scale category (1-5).
 * @returns The calculated price of the policy.
 */
export function calculatePrice(policyType: 'basic' | 'premium', hurricaneCategory: number): number {
  const basePrice = policyType === 'basic' ? 100 : 200; // Base prices for basic and premium policies
  const categoryMultiplier = 1 + hurricaneCategory * 0.5; // Increase price by 50% per category level
  return basePrice * categoryMultiplier;
}
