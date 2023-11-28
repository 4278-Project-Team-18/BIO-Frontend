import * as yup from "yup";

const isLinkAccessible = async (link: string) => {
  console.log("isLinkAccessible");
  console.log("link", link);
  try {
    const response = await fetch(link);
    console.log("response", response);
    if (!response.ok) {
      throw new Error("Link is not accessible.");
    }
    return true;
  } catch (error) {
    throw new yup.ValidationError("Link is not accessible", link, "bookLink");
  }
};

export const bookSelectionSchema = yup.object().shape({
  bookLink: yup
    .string()
    .required("Required")
    .test("isLinkAccessible", "Link is not accessible", isLinkAccessible),
});
