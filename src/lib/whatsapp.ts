import { renoxOneAddOns, renoxOneVariants } from "@/data/renoxOne";
import { formatPrice } from "@/lib/utils";

export type WhatsAppMessageProps = {
  variantId: string;
  color: string;
  addOns: string[];
  quantity: number;
  totalPrice: number;
};

export const generateWhatsAppMessage = ({ variantId, color, addOns, quantity, totalPrice }: WhatsAppMessageProps) => {
  const whatsappNumber = "923295129250";
  const variant = renoxOneVariants.find(v => v.id === variantId);
  if (!variant) return;

  const selectedAddOnsData = addOns.map(id => renoxOneAddOns.find(a => a.id === id)).filter(Boolean);
  const addonsTotal = selectedAddOnsData.reduce((sum, item) => sum + (item?.price || 0), 0);

  const selectedAddOnLines = selectedAddOnsData.length > 0
    ? selectedAddOnsData.map((item) => `[✓] ${item?.name} — ${formatPrice(item?.price || 0)}`).join("\n")
    : "No add-ons selected";

  const quantityLine = quantity > 1 ? `\nQuantity: ${quantity}` : "";

  const message = `Hello RENOX Team,

I would like to order a Renox One.

Order Summary
--------------------
Phone: Renox One
Colour: ${color}
Configuration: ${variant.name}
RAM & Storage: ${variant.ram} + ${variant.storage}${quantityLine}

Selected Add-ons:
${selectedAddOnLines}

Base Price: ${formatPrice(variant.basePrice)}
Add-ons Total: ${formatPrice(addonsTotal)}
Estimated Total: ${formatPrice(totalPrice)}

Please share availability, delivery details, and payment options.

Thank you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  try {
    const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      // Pop-up blocked, fallback to same window
      window.location.href = whatsappUrl;
    }
  } catch (e) {
    window.location.href = whatsappUrl;
  }
};
