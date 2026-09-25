import { SERVER_ORIGIN } from "../constants/config";

// Product photos come back from the API as a relative path like
// "uploads/171234.jpg". This turns that into a full, loadable URL.
// Falls back to a neutral placeholder if there's no photo at all.
export const getImageUrl = (photo) => {
  if (!photo) return "https://placehold.co/400x400?text=No+Image";
  if (photo.startsWith("http")) return photo;
  const cleanPath = photo.startsWith("/") ? photo.slice(1) : photo;
  return `${SERVER_ORIGIN}/${cleanPath}`;
};

export const formatPrice = (amount) => {
  const value = Number(amount) || 0;
  return `₹${value.toLocaleString("en-IN")}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatAddress = (address) => {
  if (!address) return "";
  const parts = [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.pincode,
  ].filter(Boolean);
  return parts.join(", ");
};
