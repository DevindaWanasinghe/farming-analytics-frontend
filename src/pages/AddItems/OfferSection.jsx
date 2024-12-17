import React, { useState, useEffect } from "react";

function OfferSection({ price, hasOffer, setHasOffer, onDiscountChange }) {
  // const [hasOffer, setHasOffer] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  // Calculate Discount Price
  const calculateDiscountPrice = (price, discountPercentage) => {
    return  (price * discountPercentage) / 100;
  };

  // Update discount price whenever values change
  useEffect(() => {
    if (hasOffer && discountPercentage > 0) {
      const newDiscountPrice = calculateDiscountPrice(
        price,
        discountPercentage
      );
      setDiscountPrice(newDiscountPrice);
      onDiscountChange(discountPercentage, newDiscountPrice);
    } else {
      setDiscountPrice(0);
      onDiscountChange(0, 0);
    }
  }, [price, discountPercentage, hasOffer]);

  return (
    <div className="mt-4">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={hasOffer}
          onChange={(e) => setHasOffer(e.target.checked)}
        />
        Has Offer
      </label>

      {hasOffer && (
        <>
          <div className="mt-2">
            <label className="block text-gray-600">Discount Percentage:</label>
            <input
              type="number"
              value={discountPercentage}
              min="0"
              max="100"
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              placeholder="Enter discount percentage..."
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            />
          </div>

          {discountPrice > 0 && (
            <p className="mt-2 text-green-600">
              Discounted Price: <strong>Rs. {discountPrice.toFixed(2)}</strong> <p className="text-gray-500 text-[12px]">(Without Customized Food Items)</p>
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default OfferSection;
